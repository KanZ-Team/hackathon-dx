<template>
  <div class="back-button" @click="goServerRoom"></div>
</template>

<script>
import { mapStores } from 'pinia'

export default defineComponent({
  props: {
    to: {
      type: String,
      default: '/server-room'
    }
  },
  methods: {
    goServerRoom() {
      this.$router.push(this.to)
    }
  }
})
</script>

<style lang="scss">
.back-button {
  cursor: pointer;
  position: absolute;
  top: 1.4rem;
  left: 0.3rem;
  width: 0.7rem;
  height: 0.7rem;
  background-image: url('/resources/icons/arrow.svg');
  background-size: 60%;
  background-repeat: no-repeat;
  background-position: center;
  transform: translateY(-50%) rotateZ(180deg);
  transform-origin: center;
  background-color: #140b38;
  border-radius: 99rem;
}
</style>
