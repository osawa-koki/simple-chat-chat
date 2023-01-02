<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div id="Setting" :class="isOpen ? 'on' : 'off'">
    <div id="Content">
      <div v-for="feature in features" id="Features">
        <button type="button" :class="`${screen === feature.id ? 'btn-primary' : ''} btn`" @click="Close(); $emit('SetScreen', feature.id)">{{ feature.name }}</button>
      </div>
    </div>
    <div id="Fixed">
      <button id="Closer" :class="`${isOpen ? 'on' : 'off'} btn-close btn-close-white`" type="button" @click="Close"></button>
      <i id="Opener" :class="`${isOpen ? 'off' : 'on'} bi-gear`" type="button" @click="Open"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import features from "~/src/features";

export default defineComponent({
  name: 'ChatSettingPage',
  props: {
    screen: {
      type: Number,
      default: 0,
      // 0 -> デフォルト
      // 1 -> チャット
      // 2 -> チャネル
      // 3 -> プロフィール
    },
  },
  data() {
    return {
      isOpen: false,
      features,
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
  z-index: 99;
  @include media-breakpoint-down(md) {
    height: 0;
    &.on {
      width: 100%;
      height: 100%;
    }
    &.off {
      height: 0;
      #Content {
      display: none;
    }
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
  #Content {
    padding: 1rem;
    #Features {
      display: flex;
      flex-direction: column;
      button {
        color: whitesmoke;
        margin-top: 0.5rem;
        text-align: left;
      }
    }
  }
  i {
    font-size: 1.5rem;
  }
}
</style>
