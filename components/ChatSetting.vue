<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div id="Setting">
    <div id="Content"></div>
    <div id="Fixed">
      <button type="button" class="btn-close btn-close-white" aria-label="Close"></button>
      <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <i class="bi bi-chevron-double-right"></i><i class="bi bi-chevron-double-right"></i><i class="bi bi-chevron-double-right"></i><i class="bi-gear"></i><i class="bi-gear"></i><i class="bi-gear"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: 'ChatSettingPage',
  data() {
    return {
      channel_id: 'test',
    }
  },
})
</script>

<style lang="scss" scoped>
@import "../node_modules/bootstrap/scss/bootstrap";

#Setting {
  position: fixed;
  top: 0;
  left: 0;
  background-color: RGBA( 33, 37, 41, var(--bs-bg-opacity, 1));
  @include media-breakpoint-down(md) {
    height: 0;
    #Fixed {
      button {
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }
  @include media-breakpoint-up(lg) {
    width: 250px;
    height: 100%;
    margin: 0;
    padding: 0;
    #Fixed {
      button {
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }
}
</style>
