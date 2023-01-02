<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div>
  <main>
    <ChatSetting :screen="screen" @SetScreen="SetScreen" />
    <WelcomeComponent v-if="screen === 0" />
    <ChatComponent v-if="screen === 1" :channel="channel" :channels="channels" :user="user" @UseChannel="UseChannel" @SetDialog="SetDialog" />
    <ChannelComponent v-if="screen === 2" :channel="channel" :channels="channels" @UseChannel="UseChannel" @MakeChannel="MakeChannel" @DeleteChannel="DeleteChannel" @ImportChannel="ImportChannel" @SetDialog="SetDialog" />
    <ProfileComponent v-if="screen === 3" :user="user" @SetProfile="SetProfile" @SetDialog="SetDialog" />
  </main>
  <div id="Dialog" role="alert" :class="`${DialogMessage !== null ? '' : 'hidden'} alert alert-${DialogType === 0 ? 'info' : 'danger'}`">
    <span>{{ DialogMessage }}</span>
    <button type="button" class="btn-close" aria-label="Close" @click="() => {DialogMessage = null}"></button>
  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getDoc, doc, setDoc, deleteDoc } from 'firebase/firestore/lite';

import { Message, Channel, User, MyContext } from '~/src/interface';
import { template_channels, template_user } from "~/src/templates";
import const_name from "~/src/const_name";

import db from "~/src/firebase";

let timeout: NodeJS.Timeout | null = null;

export default defineComponent({
  name: "ChatPage",
  data() {
    return {
      screen: 0,
      InsertError: null as string | null,
      DialogMessage: null as string | null,
      DialogType: 0 as number, // 0: Success, -1: Error
      user: {} as User,
      messages: [] as Message[],
      channel: template_channels[0] as Channel,
      channels: [...template_channels] as Channel[],
    };
  },
  computed: {
    Date2String() {
      return (date: Date) => {
        try {
          return date.toLocaleString();
        }
        catch (error) {
          return "????/??/?? ??:??:??";
        }
      };
    }
  },
  async mounted() {

    // ローカルストレージからユーザー情報を取得
    const user_context_raw = localStorage.getItem(const_name.local_storage_name);
    if (user_context_raw) {
      const user_context = JSON.parse(user_context_raw) as MyContext;
      await getDoc(doc(db, "users", user_context.user_id)).then((docSnap) => {
        if (docSnap.exists()) {
          this.user = docSnap.data() as User;
        } else {
          this.user = template_user;
        }
      });
      user_context.channel_ids.forEach(async (channel_id) => {
        await getDoc(doc(db, "channels", channel_id)).then((docSnap) => {
          if (docSnap.exists()) {
            this.channels.push(docSnap.data() as Channel);
          }
        });
      });
    } else {
      this.user = template_user;
    }
  },
  methods: {
    SetScreen(screen: number) {
      this.screen = screen;
    },
    UseChannel(channel_id: string) {
      this.channel = this.channels.find((c) => c.id === channel_id) as Channel;
    },
    async MakeChannel(channel: Channel) {
      try {
        if (this.channels.find((c) => c.id === channel.id)) {
          this.SetDialog("既に存在するチャネルです。", -1);
          return;
        }
        this.channels.push(channel);
        await setDoc(doc(db, "channels", channel.id), channel);
        this.Save();
        this.SetDialog("チャネルを作成しました。", 0);
      } catch (error) {
        this.SetDialog("チャネルの作成に失敗しました。", -1);
      }
    },
    async ImportChannel(id: string) {
      try {
        const docRef = doc(db, "channels", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const channel = docSnap.data() as Channel;
          this.channels.push(channel);
          this.Save();
          this.SetDialog("チャネルをインポートしました。", 0);
        } else {
          this.SetDialog("チャネルが見つかりませんでした。", -1);
        }
      } catch (error) {
        this.SetDialog("チャネルのインポートに失敗しました。", -1);
      }
    },
    DeleteChannel(channel_id: string) {
      // テンプレチャネルは削除できない
      if (template_channels.find((c) => c.id === channel_id)) {
        this.SetDialog("テンプレートチャネルは削除できません。", -1);
        return;
      }
      try {
        deleteDoc(doc(db, "channels", channel_id));
        this.channels = this.channels.filter((c) => c.id !== channel_id);
        this.SetDialog("チャネルを削除しました。", 0);
      } catch (error) {
        this.SetDialog("チャネルの削除に失敗しました。", -1);
      }
    },
    SetProfile(user: User) {
      this.user = {
        id: this.user.id,
        name: user.name,
        comment: user.comment,
      };
      setDoc(doc(db, "users", this.user.id), this.user);
      this.Save();
      this.SetDialog("プロフィールを更新しました。", 0);
    },
    SetDialog(error: string, type: number) {
      this.DialogMessage = error;
      this.DialogType = type;
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        this.DialogMessage = null;
      }, 3000);
    },
    Save() {
      const user_context: MyContext = {
        user_id: this.user.id,
        channel_ids: this.channels.map((c) => c.id),
      };
      localStorage.setItem(const_name.local_storage_name, JSON.stringify(user_context));
    },
  },
})
</script>

<style lang="scss" scoped>
@import "../node_modules/bootstrap/scss/bootstrap";

main {
  margin: 1rem 0;
  padding: 0.5rem;
  @include media-breakpoint-up(md) {
    margin-left: 200px;
  }
  @include media-breakpoint-up(xl) {
    margin-left: auto;
    margin-right: auto;
  }
}
#Messages {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: 2fr 5fr 2fr 1fr;
  gap: 0.5rem;
  * {
  border: 1px solid rgb(245, 245, 245);
  padding: 0.5rem;
  margin: 0;
  }
  .date {
  font-size: 0.5rem;
  display: flex;
  align-items: center;
  }
}
#Dialog {
  $height: 100px;
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  width: 300px;
  height: $height;
  z-index: 100;
  margin: 0;
  transition: all 1s;
  button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  padding: 0;
  margin: 0;
  }
  &.hidden {
  bottom: -#{$height};
  }
}
</style>
