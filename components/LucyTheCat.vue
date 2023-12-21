<template>
  <div @click="petTheCat" class="cat cat-lucy" :class="{ debug }"></div>
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
    petTheCat() {
      console.log('petTheCat')
      this.gameStore
        .notify({
          actor: ActorType.Character,
          type: CharacterEvents.Move,
          payload: { x: 6, y: 5 }
        })
        // pet cat sound
        .then(() =>
          this.gameStore.notify({
            actor: ActorType.Character,
            type: CharacterEvents.Pet,
            payload: {}
          })
        )
      // pet cat sound

      // increase mood
    }
  }
})
</script>

<style lang="scss">
.cat.cat-lucy {
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  z-index: 99;
  border-radius: 0.2rem;
  width: 2.5rem;
  height: 1.9rem;
  right: 0.2rem;
  top: 7rem;
  margin-left: -1rem;
  transform: rotateY(63deg) rotateX(182deg);

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  &.debug {
    background: rgba(255, 0, 0, 0.6);
    border: 1px solid black;
  }
}
</style>
