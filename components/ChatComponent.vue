<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div>
    <h1>✨✨✨ Chat Room ✨✨✨</h1>
    <select v-model="channel_selected" class="form-select" aria-label="Select Channel" @input="$emit('UseChannel', $event?.target?.value)">
      <option v-for="_channel in channels" :key="_channel.id" :value="_channel.id">{{ _channel.name }}</option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Channel, User } from "~/src/interface";

export default defineComponent({
  name: 'ChatSettingPage',
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
    }
  },
  mounted() {
    this.channel_selected = this.channel.id;
  },
})
</script>

<style lang="scss" scoped>
@import "../node_modules/bootstrap/scss/bootstrap";

</style>
