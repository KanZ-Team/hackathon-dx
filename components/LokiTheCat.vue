<template>
  <div @click="petTheCat" class="cat cat-loki" :class="{ debug }"></div>
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
          payload: { x: 2, y: 5 }
        })
        // pet cat sound
        .then(() =>
          this.gameStore.notify({
            actor: ActorType.Character,
            type: CharacterEvents.Pet,
            payload: {
              name: 'loki',
              sound: '690620__rareguy27__cat-purr.mp3'
            }
          })
        )
      // increase mood
    }
  }
})
</script>

<style lang="scss">
.cat.cat-loki {
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  z-index: 41;
  border-radius: 0.2rem;
  width: 3.8rem;
  height: 1.9rem;
  left: 0.6rem;
  top: 6.9rem;
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
