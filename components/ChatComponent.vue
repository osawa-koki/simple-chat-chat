<template>
  <div>
    <h1>✨✨✨ Chat Room ✨✨✨</h1>
    <select v-model="channel_selected" class="form-select" aria-label="Select Channel" @input="$emit('UseChannel', $event?.target?.value)">
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
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "~/src/firebase";

import { Channel, Message, User } from "~/src/interface";

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
  },
  methods: {
    async ReadMessages() {
      const q = query(collection(db, "messages"), where("channel_id", "==", this.channel_selected));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // this.messages.push(doc.data() as Message);
        this.messages.push({
          id: doc.id,
          text: doc.data().text,
          username: doc.data().username,
          date: doc.data().date.toDate().toLocaleString(),
        } as Message);
      });
    }
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
  .MessageUnit {
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
  }
}
</style>
