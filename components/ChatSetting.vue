<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div id="Setting" :class="isOpen ? 'on' : 'off'">
    <div id="Content"></div>
    <div id="Fixed">
      <button id="Closer" :class="`${isOpen ? 'on' : 'off'} btn-close btn-close-white`" type="button" @click="Close"></button>
      <i id="Opener" :class="`${isOpen ? 'off' : 'on'} bi-gear`" type="button" @click="Open"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: 'ChatSettingPage',
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    Open() {

      this.isOpen = true;
    },
    Close() {

      this.isOpen = false;
    },
  },
})
</script>

<style lang="scss" scoped>
@import "../node_modules/bootstrap/scss/bootstrap";

#Setting {
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  background-color: RGBA(33, 37, 41, var(--bs-bg-opacity, 1));
  @include media-breakpoint-down(md) {
    height: 0;
    &.on {
      width: 100%;
      height: 100%;
    }
    &.off {
      height: 0;
    }
    #Fixed {
      #Opener {
        position: fixed;
        top: 0.5rem;
        left: 0.5rem;
        color: gray;
        &.on {
        }
        &.off {
          display: none;
        }
      }
      #Closer {
        position: fixed;
        top: 0.5rem;
        right: 0.5rem;
        &.on {
        }
        &.off {
          display: none;
        }
      }
    }
  }
  @include media-breakpoint-up(md) {
    width: 200px;
    height: 100%;
    margin: 0;
    padding: 0;
    #Fixed {
      display: none;
      button {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
      }
    }
  }
  i {
    font-size: 1.5rem;
  }
}
</style>
