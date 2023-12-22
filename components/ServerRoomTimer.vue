<template>
  <div class="parent" :class="{ debug }">
    <div class="timer">
        {{ updateCountdownTimer }}
    </div>
  </div>
</template>

<script lang="ts">
import { useGameStore } from '@/stores/game';
import { mapStores } from 'pinia';
export default defineComponent({
  props: {
    debug: {
      type: Boolean,
      default: false,
    },
    totalTime: {
      type: Number,
      default: 240, // Default total time in seconds
    },
  },
  data() {
    return {
      timeString: "",
      interval: null,
    };
  },
  methods: {

  },
  mounted() {
  },
  computed: {
    ...mapStores(useGameStore),
    updateCountdownTimer(): string {
      console.log(this.gameStore.countDownTimer)
      let minutes = parseInt(this.gameStore.countDownTimer / 60, 10);
        let seconds = parseInt(this.gameStore.countDownTimer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        this.timeString = `${minutes}:${seconds}`;
        if (this.gameStore.countDownTimer < 0) {
          this.timeString = "Time's up!";
        }
        return this.timeString
    }
  },
});
</script>

<style scoped lang="scss">
.parent {
  display: flex;
  .timer {
    font-size: 48px;
    text-align: center;
    top: 2.5rem;
    color: #000;
    position: absolute;
    width: 100%;
    filter: drop-shadow(1px 4px 3px #eee) drop-shadow(1px 4px 3px #eee)
      drop-shadow(1px 4px 3px #eee);
  }
  &.debug {
    background: rgba(255, 0, 0, 0.6);
    border: 1px solid black;
  }
}
</style>
