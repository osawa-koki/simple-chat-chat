<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div>
    <div id="Central">
      <h1>👼 Profile 👼</h1>
      <p>プロフィールの設定を行うことができます。</p>
      <h2>🦈 Your Profile</h2>
      <h3>🐔 Your name</h3>
      <div class="alert alert-primary" role="alert">{{ username }}</div>
      <h3>🐔 Your comment</h3>
      <div class="alert alert-info" role="alert">{{ comment }}</div>
      <hr />
      <div class="box">
        <label for="username" class="form-label">Your name</label>
        <input id="username" type="text" class="form-control" />
      </div>
      <div class="box">
        <label for="comment" class="form-label">One Comment</label>
        <textarea id="comment" class="form-control" rows="3"></textarea>
      </div>
      <div class="center box">
        <button type="button" class="btn btn-outline-success">Set 🐠</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { Channel } from '~/src/interface';

export default defineComponent({
  name: 'ChannelComponent',
  props: {
    username: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      name: "",
      comment: "",
    }
  },
  mounted() {
  },
  methods: {
  },
});
</script>

<style lang="scss" scoped>
@import "../node_modules/bootstrap/scss/bootstrap";


</style>
