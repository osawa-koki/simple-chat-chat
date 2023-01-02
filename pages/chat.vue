<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div>
  <main>
    <ChatSetting :screen="screen" @SetScreen="SetScreen" />
    <WelcomeComponent v-if="screen === 0" />
    <ChannelComponent v-if="screen === 2" :channel="channel" :channels="channels" @UseChannel="UseChannel" @MakeChannel="MakeChannel" @SetDialog="SetDialog" />
  </main>
  <div id="Dialog" role="alert" :class="`${DialogMessage !== null ? '' : 'hidden'} alert alert-${DialogType === 0 ? 'info' : 'danger'}`">
    <span>{{ DialogMessage }}</span>
    <button type="button" class="btn-close" aria-label="Close" @click="() => {DialogMessage = null}"></button>
  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore/lite';

import firebaseConfig from '~/firebaseConfig';

import { Message, Channel } from '~/src/interface';
import { template_channels } from "~/src/templates";

import pages from '~/pages';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default defineComponent({
  name: "ChatPage",
  data() {
    return {
      screen: 0,
      InsertError: null as string | null,
      DialogMessage: null as string | null,
      DialogType: 0 as number, // 0: Success, -1: Error
      sending: false,
      reading: false,
      deleting: false,
      pages,
      name: "osawa-koki",
      text: "Hello simple-chat-chat 💓",
      messages: [] as Message[],
      channel: template_channels[0] as Channel,
      channels: template_channels as Channel[],
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
  methods: {
    SetScreen(screen: number) {
      console.log("SetScreen", screen);
      this.screen = screen;
    },
    UseChannel(channel: Channel) {
      this.channel = channel;
    },
    MakeChannel(channel: Channel) {
      this.channels.push(channel);
      this.SetDialog("チャネルを作成しました。", 0);
    },
    SetDialog(error: string, type: number) {
      this.DialogMessage = error;
      this.DialogType = type;
      setTimeout(() => {
        this.DialogMessage = null;
      }, 3000);
    },
  },
})
</script>

<style lang="scss" scoped>
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
