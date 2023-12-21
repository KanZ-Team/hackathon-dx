<template>
  <div @click="petTheDog" class="dog" :class="{ debug }"></div>
</template>

<script>
import { mapStores } from "pinia";
import { ActorType, CharacterEvents } from "@/stores/game";

export default defineComponent({
  computed: {
    ...mapStores(useGameStore),
  },
  props: {
    debug: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    petTheDog() {
      console.log("petTheDog");
      this.gameStore.notify({
        actor: ActorType.Character,
        type: CharacterEvents.Pet,
        payload: {},
      });
      // pet dog sound

      // increase mood
    },
  },
});
</script>

<style lang="scss">
.dog {
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  z-index: 99;
  border-radius: 0.2rem;
  width: 4rem;
  height: 3.4rem;
  right: 1rem;
  top: 5.8rem;
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
