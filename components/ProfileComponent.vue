<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div>
    <div id="Central">
      <h1>๐ผ Profile ๐ผ</h1>
      <p>ใใญใใฃใผใซใฎ่จญๅฎใ่กใใใจใใงใใพใใ</p>
      <h2>๐ฆ Your Profile</h2>
      <hr />
      <h3>๐ Your name</h3>
      <div class="alert alert-primary" role="alert">{{ user.name }}</div>
      <h3>๐ Your comment</h3>
      <div class="alert alert-info comment" role="alert">{{ user.comment }}</div>
      <hr />
      <div class="box">
        <label for="username" class="form-label">Your name</label>
        <input id="username" v-model="name" type="text" class="form-control" />
      </div>
      <div class="box">
        <label for="comment" class="form-label">One Comment</label>
        <textarea id="comment" v-model="comment" class="form-control" rows="7"></textarea>
      </div>
      <div class="center box">
        <button type="button" class="btn btn-outline-success" @click="SetProfile">Set ๐ </button>
      </div>
      <hr />
      <button type="button" class="btn btn-secondary" @click="DeleteStorageInfo">ใใฉใฆใถใซไฟๅญใใใฆใใๆๅ ฑใๅจใฆๅ้คใใ ๐ฌ๐ฌ๐ฌ</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import const_name from "~/src/const_name";

import { User } from '~/src/interface';

export default defineComponent({
  name: 'ChannelComponent',
  props: {
    user: {
      type: Object as () => User,
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
    this.name = this.user.name;
    this.comment = this.user.comment;
  },
  methods: {
    SetProfile() {
      this.$emit('SetProfile', {
        name: this.name,
        comment: this.comment,
      } as User);
    },
    DeleteStorageInfo() {
      try {
        if (confirm("ใใฉใฆใถใซไฟๅญใใใฆใใๆๅ ฑใๅจใฆๅ้คใใพใใใใใใใงใใ๏ผ") === false) return;
        localStorage.removeItem(const_name.local_storage_name);
        this.$emit('SetDialog', "ใใฉใฆใถใซไฟๅญใใใฆใใๆๅ ฑใๅ้คใใพใใใ", 0);
      } catch (e) {
        this.$emit('SetDialog', {
          message: "ใใฉใฆใถใซไฟๅญใใใฆใใๆๅ ฑใๅ้คใงใใพใใใงใใใ",
          type: 1,
        });
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../node_modules/bootstrap/scss/bootstrap";

#Central {
  .comment {
    white-space: pre;
  }
}
</style>
