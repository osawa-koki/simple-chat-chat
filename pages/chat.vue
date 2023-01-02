<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div>
    <main>
      <ChatSetting :screen="screen" @SetScreen="SetScreen" />
    </main>
    <div id="ErrorDialog" class="alert alert-danger" role="alert" :class="ErrorDialogMessage !== null ? '' : 'hidden'">
      <span>{{ ErrorDialogMessage }}</span>
      <button type="button" class="btn-close" aria-label="Close" @click="() => {ErrorDialogMessage = null}"></button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore/lite';

import firebaseConfig from '~/firebaseConfig';

import pages from '~/pages';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

type Message = {
  id: string;
  name: string;
  text: string;
  date: Date;
};

export default defineComponent({
  name: 'FirestorePage',
  data() {
    return {
      screen: 0,
      InsertError: null as string | null,
      ErrorDialogMessage: null as string | null,
      sending : false,
      reading : false,
      deleting : false,
      pages,
      name: 'osawa-koki',
      text: 'Hello simple-chat-chat 💓',
      messages: [] as Message[],
    }
  },
  computed: {
    Date2String() {
      return (date: Date) => {
        try {
          return date.toLocaleString();
        } catch (error) {
          return '????/??/?? ??:??:??';
        }
      }
    }
  },
  methods: {
    SetScreen(screen: number) {
      console.log('SetScreen', screen);

      this.screen = screen;
    },
    SetErrorDialog(error: string) {
      this.ErrorDialogMessage = error;
      setTimeout(() => {
        this.ErrorDialogMessage = null;
      }, 3000);
    },
  }
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
#ErrorDialog {
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
