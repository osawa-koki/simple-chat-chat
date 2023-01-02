<template>
  <div>
    <h1>✨✨✨ Chat Room ✨✨✨</h1>
    <select v-model="channel_selected" class="form-select" aria-label="Select Channel" @input="SelectedChange">
      <option v-for="_channel in channels" :key="_channel.id" :value="_channel.id">{{ _channel.name }}</option>
    </select>
    <div id="MessageDiv">
      <textarea v-model="text" class="form-control" rows="3"></textarea>
      <button type="button" class="btn btn-outline-primary" @click="SendMessage">Send <i class="bi bi-send-fill"></i></button>
    </div>
    <hr />
    <div id="ChatContent">
      <div v-for="message in messages" :key="message.id" class="MessageUnit alert alert-info">
        <p class="text">{{ message.text }}</p>
        <div class="username">{{ message.username }}</div>
        <div class="date">{{ message.date }}</div>
        <i v-if="message.user_id === user.id" class="bi bi-x delete-message" @dblclick="DeleteMessage(message.channel_id, message.id)"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { collection, query, where, getDocs, setDoc, doc, onSnapshot, Unsubscribe } from "firebase/firestore";
import db from "~/src/firebase";

import { Channel, Message, User } from "~/src/interface";
import guid from "~/src/guid";

export default defineComponent({
  name: 'ChatComponent',
  props: {
    user: {
      type: Object as () => User,
      required: true,
    },
    channel: {
      type: Object as () => Channel,
      required: true,
    },
    channels: {
      type: Array as () => Channel[],
      required: true,
    },
  },
  data: function () {
    return {
      unsub: null as Unsubscribe | null,
      channel_selected: '',
      text: '',
      messages: [] as Message[],
    }
  },
  watch: {
    channel_selected: function () {
      this.messages = [];
      this.ReadMessages();
    }
  },
  mounted() {
    this.channel_selected = this.channel.id;
    this.ReadMessages();
    this.Subscribe();
  },
  beforeUnmount() {
    this.Unsubscribe();
  },
  methods: {
    SelectedChange(event: Event) {
      this.Unsubscribe();
      this.$emit('UseChannel', (event?.target as HTMLSelectElement)?.value);
      this.Subscribe();
    },
    async ReadMessages() {
      try {
        const q = query(collection(db, "messages", this.channel_selected, "messages"), where("is_valid", "==", true));
        const querySnapshot = await getDocs(q);
        const messages = [] as Message[];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          messages.push(data as Message);
        });
        this.messages = messages.sort((a, b) => a.date > b.date ? -1 : 1);
      } catch (error) {
        this.$emit("メッセージの取得に失敗しました。");
      }
    },
    async SendMessage() {
      try {
        if (this.text === '') return;
        const id = guid();
        const message: Message = {
          id,
          text: this.text,
          user_id: this.user.id,
          username: this.user.name,
          channel_id: this.channel_selected,
          date: new Date(),
          is_valid: true,
        };
        // ドキュメントを取得
        const docRef = doc(db, "messages", this.channel_selected);
        // ドキュメントが存在しない場合は作成
        await setDoc(docRef, {
          id: this.channel_selected,
          name: this.channel_selected,
        }, { merge: true });
        // メッセージを追加
        await setDoc(doc(db, "messages", this.channel_selected, "messages", id), message);
        this.text = '';
      } catch (error) {
        this.$emit("メッセージの送信に失敗しました。");
      }
    },
    async DeleteMessage(channel_id: string, message_id: string) {
      try {
        const docRef = doc(db, "messages", channel_id, "messages", message_id);
        await setDoc(docRef, {
          is_valid: false,
        }, { merge: true });
        this.messages = this.messages.filter((message) => message.id !== message_id);
      } catch (error) {
        this.$emit("メッセージの削除に失敗しました。");
      }
    },
    Subscribe() {
      try {
        this.unsub = onSnapshot(collection(db, "messages", this.channel_selected, "messages"), (docs) => {
          const messages = [] as Message[];
          docs.forEach((doc) => {
            const data = doc.data();
            data.id = doc.id;
            messages.push(data as Message);
          });
          this.messages = messages.sort((a, b) => a.date > b.date ? -1 : 1);
        });
      } catch (error) {
        this.$emit("メッセージの監視に失敗しました。");
      }
    },
    Unsubscribe() {
      try {
        if (this.unsub) {
          this.unsub();
          this.unsub = null;
        }
      } catch (error) {
        this.$emit("メッセージの監視の解除に失敗しました。");
      }
    },
  }
})
</script>

<style lang="scss" scoped>
@import "../node_modules/bootstrap/scss/bootstrap";

#MessageDiv {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  button {
    margin-left: 1rem;
  }
}
#ChatContent {
  margin: 0.5rem 0;
  padding: 0.5rem;
  max-height: 600px;
  overflow: auto;
  border-top: 1px lightgray solid;
  border-bottom: 1px lightgray solid;
  &::-webkit-scrollbar {
    width: 0;
  }
  .MessageUnit {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 0.3rem 0;
    padding: 0.5rem;
    .text {
      grid-column: 1 / 3;
    }
    .username, .date {
      display: flex;
      align-items: flex-end;
      margin-top: 0.3rem;
    }
    .username {
      justify-content: left;
      font-size: 1.1rem;
      font-weight: bold;
      grid-column: 1 / 2;
      text-align: right;
    }
    .date {
      justify-content: right;
      grid-column: 2 / 3;
      text-align: right;
      font-size: 0.7rem;
    }
    .delete-message {
      position: absolute;
      top: 0;
      right: 0;
      font-size: 1.5rem;
      color: red;
      cursor: pointer;
    }
  }
}
</style>
