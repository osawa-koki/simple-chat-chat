<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div>
    <div id="Central">
      <h1>๐ฆ Channel ๐ฆ</h1>
      <p>ใใฃใใซใฎ่จญๅฎใ่กใใใจใใงใใพใใ</p>
      <h2>๐ฆ Current Channel</h2>
      <div>
        <label>You are now on...</label>
        <div class="alert alert-info" role="alert">
          <i class="bi bi-broadcast-pin"></i>&nbsp;{{ channel.name }}
        </div>
        <button type="button" class="btn btn-outline-secondary" @click="Copy">
          <i class="bi bi-link"></i>&nbsp;Copy Channel ID
        </button>
      </div>
      <hr />
      <h2>๐ Add New Channel</h2>
      <div>
        <label for="add_channel_name" class="form-label">Enter Channel Name</label>
        <input id="add_channel_name" v-model="name" type="text" class="form-control" />
        <div v-if="chanell_name_error" class="alert alert-danger" role="alert">{{ chanell_name_error }}</div>
        <div class="mb-3">
          <label for="add_channel_description">What is this channel for???</label>
          <textarea id="add_channel_description" v-model="description" class="form-control" rows="3"></textarea>
          <div v-if="chanell_description_error" class="alert alert-danger" role="alert">{{ chanell_description_error }}</div>
          <div class="center box"><button type="button" class="btn btn-outline-primary" @click="MakeChannel">Make ๐ถ</button></div>
        </div>
      </div>
      <hr />
      <h2>๐ฝ Import Channel</h2>
      <div>
        <label for="import_channel_id" class="form-label">Enter Channel ID</label>
        <input id="import_channel_id" v-model="id" type="text" class="form-control" />
        <div class="center box">
          <button type="button" class="btn btn-info" @click="$emit('ImportChannel', id)">Import ๐ฅบ</button>
        </div>
      </div>
      <hr />
      <h2>๐ช Channel List</h2>
      <div id="MyChannels">
        <template v-for="_channel in channels">
          <div class="name">{{ _channel.name }}</div>
          <div class="description">{{ _channel.description }}</div>
          <div v-if="_channel.id === channel?.id" class="select">๐? Now! ๐?</div>
          <div v-else class="select"><button type="button" class="btn btn-outline-info btn-sm" @click="$emit('UseChannel', _channel.id)">Use ๐ฌ</button></div>
          <div class="delete"><button type="button" class="btn btn-outline-danger btn-sm" @click="$emit('DeleteChannel', _channel.id)">Delete ๐ฃ</button></div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { Channel } from '~/src/interface';
import guid from "~/src/guid";

export default defineComponent({
  name: 'ChannelComponent',
  props: {
    channel: {
      type: Object as () => Channel,
      required: true,
    },
    channels: {
      type: Array as () => Channel[],
      required: true,
    },
  },
  data() {
    return {
      name: "",
      description: "",
      id: "",
      chanell_name_error: null as string | null,
      chanell_description_error: null as string | null,
    }
  },
  mounted() {
  },
  methods: {
    MakeChannel() {
      this.chanell_name_error = null;
      this.chanell_description_error = null;
      if (this.name.length < 3) {
        this.chanell_name_error = "ใใฃใใซๅใฏ3ๆๅญไปฅไธใงๅฅๅใใฆใใ?ใใใ";
      }
      if (this.name.length > 20) {
        this.chanell_name_error = "ใใฃใใซๅใฏ20ๆๅญไปฅๅใงๅฅๅใใฆใใ?ใใใ";
      }
      if (this.description === "") {
        this.chanell_description_error = "ใใฃใใซใฎ่ชฌๆใๅฅๅใใฆใใ?ใใใ";
      }
      if (this.chanell_name_error !== null || this.chanell_description_error !== null) {
        return;
      }
      const new_channel = {
        id: guid(),
        name: this.name,
        description: this.description,
      } as Channel;
      this.$emit("MakeChannel", new_channel);
      this.$emit("SetDialog", `ๆฐ่ฆใใฃใใซ(${new_channel.name})ใไฝๆใใพใใใ`, 0);
      this.name = "";
      this.description = "";
    },
    Copy() {
      navigator.clipboard.writeText(this.channel.id);
      this.$emit("SetDialog", `ใใฃใใซID(${this.channel.name}...)ใใณใใผใใพใใใ`, 0);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../node_modules/bootstrap/scss/bootstrap";

#Central {

  #MyChannels {
    display: grid;
    @include media-breakpoint-down(md) {
      grid-template-columns: repeat(2, 1fr);
      .select, .delete {
        padding-bottom: 1rem;
        border-bottom: 1px lightskyblue solid;
      }
    }
    @include media-breakpoint-up(md) {
      grid-template-columns: minmax(5rem, 15rem) minmax(10rem, 30rem) minmax(5rem, 7rem) minmax(5rem, 7rem);
      div {
        padding-bottom: 1rem;
        border-bottom: 1px lightskyblue solid;
      }
    }
  }
}
</style>
