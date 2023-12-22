<template>
  <div class="dog" :class="{ debug }" @mousedown="moveToDog">
    <PetPoints @pet="petTheDog">
      <div class="point starting active last"></div>
      <div class="point" style="margin-top: 0.2rem"></div>
      <div class="point" v-for="i in 22"></div>
      <div class="point ending"></div>
    </PetPoints>
  </div>
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
    moveToDog() {
      console.log('moveToDog')
      this.gameStore.notify({
        actor: ActorType.Character,
        type: CharacterEvents.Move,
        payload: { x: 3, y: 5 }
      })
    },
    petTheDog() {
      console.log('petTheDog')
      this.gameStore
        .notify({
          actor: ActorType.Character,
          type: CharacterEvents.Move,
          payload: { x: 3, y: 5 }
        })
        // pet cat sound
        .then(() =>
          this.gameStore.notify({
            actor: ActorType.Character,
            type: CharacterEvents.Pet,
            payload: {
              name: 'maya',
              sound: '420097__14gpanskazakopcanik_jonas__13-01-dog-_bark.mp3'
            }
          })
        )
      // pet dog sound

      // increase mood
    }
  }
})
</script>

<style lang="scss">
.dog {
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  z-index: 99;
  border-radius: 0.2rem;
  width: 1.2rem;
  height: 3.4rem;
  right: 2.6rem;
  top: 5.8rem;
  margin-left: -1rem;

  &:hover {
    .petPoints .point.starting {
      &:after {
        display: block;
      }
    }
  }

  .petPoints {
    margin-left: 0.3rem;
  }

  &.debug {
    background: rgba(255, 0, 0, 0.6);
    border: 1px solid black;
  }
}
</style>
