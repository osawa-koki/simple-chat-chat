<template>
  <div>
    <div id="Central">
      <h1>🐙 WELCOME 🐙</h1>
      <img :src="$router.options.base + 'favicon.ico'" alt="tako" />
      <div id="tako-tako">
        <!-- eslint-disable-next-line vue/require-v-for-key -->
        <div v-for="random in randoms" class="tako">
          <!-- eslint-disable-next-line vue/no-lone-template -->
          <div
            :class="`
              ${(random + seed) % 5 === 0 ? 'dance' : ''}
              ${(random + seed) % 7 === 0 ? 'big' : ''}
              ${(random + seed) % 9 === 0 ? 'blue' : ''}
            `"
          >{{ (random + seed) % 23 !== 0 ? '🐙' : (random + seed) % 11 ? '🦑' : (random + seed) % 7 ? '🦀' : '🐋' }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

let interval: NodeJS.Timer;
const randoms = Array.from({ length: 390 }, () => Math.floor(Math.random() * 100));

export default defineComponent({
  name: 'WelcomeComponent',
  data() {
    return {
      seed: Math.floor(Math.random() * 100),
      randoms,
    }
  },
  mounted() {
    interval = setInterval(() => {
      this.seed = Math.floor(Math.random() * 100);
    }, 3000);
  },
  beforeUnmount() {
    clearInterval(interval);
  },
})
</script>

<style lang="scss" scoped>
#Central {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  h1 {
    margin-top: 1rem;
  }
  img {
    margin-top: 1rem;
    border-radius: 50%;
    border: 1px lightgray solid;
  }
  #tako-tako {
    margin-top: 1rem;
    padding: 1rem;
    width: 100%;
    max-height: 300px;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: flex-start;
    .tako {
      margin: 0;
      padding: 0.2rem;
      width: 1.5rem;
      height: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      div {
        margin: 0;
        &.dance {
          animation: dance 3s infinite;
          font-size: 1.15rem;
          @keyframes dance {
            0% {
              transform: rotate(0deg);
            }
            33% {
              transform: rotate(-20deg);
            }
            66% {
              transform: rotate(20deg);
            }
            100% {
              transform: rotate(0deg);
            }
          }
        }
        &.big {
          font-size: 1.1rem;
        }
        &.blue {
          color: #0E6DFE;
        }
      }
    }
  }
}
</style>
