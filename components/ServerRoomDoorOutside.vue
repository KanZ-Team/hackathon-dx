<template>
  <div class="outside-door" :class="{ debug }" @click="moveToServerRoom"></div>
</template>

<script>
import { chain } from '@/helpers'
import { mapStores } from 'pinia'
import { ActorType, CharacterEvents } from '@/stores/game'

export default defineComponent({
  computed: {
    ...mapStores(useGameStore)
  },
  props: {
    debug: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    moveToServerRoom() {
      console.log('moveToCampus')
      this.gameStore
        .notify({
          actor: ActorType.Character,
          type: CharacterEvents.Move,
          payload: { x: 3, y: 0 }
        })
        // play door sound
        .then(() =>
          this.gameStore.notify({
            actor: ActorType.Sound,
            type: 'play',
            payload: { sound: 'door' }
          })
        )
        // // move to campus
        .then(() => this.$router.push('/server-room'))
    }
  }
})
</script>

<style lang="scss">
.outside-door {
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  width: 0.8rem;
  height: 1rem;
  position: absolute;
  top: 2.35rem;
  left: 56%;
  margin-left: -1rem;
  transform-origin: top center;
  z-index: 99;
  border-radius: 0.2rem;
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  &.debug {
    background: rgba(255, 0, 0, 0.6);
    border: 1px solid black;
  }
}
</style>
