<template>
  <div class="switch" :class="{ debug }" @click="switchTheLights"></div>
</template>

<script>
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
    switchTheLights() {
      console.log('switch the lights')
      this.gameStore
        .notify({
          actor: ActorType.Character,
          type: CharacterEvents.Move,
          payload: { x: 3, y: 0 }
        })
        // play switch lights sound
        .then(() => {
          // document background to black
          if (typeof document !== 'undefined') {
            if (document.body.style.backgroundColor === 'black')
              document.body.style.backgroundColor = 'white'
            else document.body.style.backgroundColor = 'black'
          }
        })
    }
  }
})
</script>

<style lang="scss">
.switch {
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  width: 0.3rem;
  height: 0.5rem;
  position: absolute;
  top: 5.25rem;
  left: 3.35rem;
  margin-left: -1rem;
  transform-origin: top center;
  z-index: 99; // 99 is overlay click through
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
