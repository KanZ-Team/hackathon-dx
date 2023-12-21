<template>
  <div class="door" :class="{ debug }" @click="moveToCampus"></div>
</template>

<script>
import { chain } from "@/helpers";
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
    moveToCampus() {
      console.log("moveToCampus");
      chain([
        // player move to door
        this.gameStore.notify({
          actor: ActorType.Character,
          type: CharacterEvents.Move,
          payload: { x: 3, y: 0 },
        }),
        // play door sound
        this.gameStore.notify({
          actor: ActorType.Sound,
          type: "play",
          payload: { sound: "door" },
        }),
        // move to campus
        this.$router.push("/campus"),
      ]);
    },
  },
});
</script>

<style lang="scss">
.door {
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  width: 1.7rem;
  height: 2.66rem;
  position: absolute;
  top: 4.05rem;
  left: 50%;
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
