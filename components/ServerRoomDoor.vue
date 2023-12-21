<template>
  <div class="door" :class="{ debug }"></div>
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
    openDoor() {
      this.gameStore.notify({
        actor: ActorType.Character,
        type: CharacterEvents.Move,
        payload: { x, y },
      });
    },
  },
});
</script>

<style lang="scss">
.tiles {
  display: flex;
  flex-wrap: wrap;
  width: 9.4rem;
  height: 7.6rem;
  transform: perspective(46vw) rotateX(60deg);
  position: absolute;
  bottom: 0px;
  left: 50%;
  margin-left: -4.8rem;
  transform-origin: bottom center;

  &.debug {
    .tile {
      background: rgba(255, 0, 0, 0.6);
      border: 1px solid black;
    }
  }

  .tile {
    width: calc(100% / 8);
    height: calc(100% / 6);
    transition: 0.4s background;
    cursor: pointer;
    position: relative;
    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      border-radius: 50%;
    }
    &:hover:after {
      background: rgba(255, 255, 255, 0.2);
    }
  }
}
</style>
