<template>
  <div class="parent" :class="{ debug }">
    <div class="timer">
        {{ timeString }}
    </div>
  </div>
</template>

<script>
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
      time: 0,
      timeString: "",
      interval: null,
    };
  },
  methods: {
    startCountdown() {
      this.time = this.totalTime;
      this.interval = setInterval(() => {
        let minutes = parseInt(this.time / 60, 10);
        let seconds = parseInt(this.time % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        this.timeString = `${minutes}:${seconds}`;

        if (--this.time < 0) {
          clearInterval(this.interval);
          this.timeString = "Time's up!";
        }
      }, 1000);
    },
  },
  mounted() {
    this.startCountdown();
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
