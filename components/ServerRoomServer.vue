<template>
  <div @click="openServerScreen" class="server-left" :class="{ debug }"></div>
  <div @click="openServerScreen" class="server-right" :class="{ debug }"></div>
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
    openServerScreen() {
      this.gameStore
        .notify({
          actor: ActorType.Scene,
          type: SceneEvents.ChangeActiveSeen,
          payload: {},
        })
        // play scene sound
        // open scene view
        .then(() => this.$router.push("/servers"));
    },
  },
});
</script>

<style lang="scss">
.server-left {
  width: 4.3rem;
  height: 4.2rem;
  top: 3.2rem;
  margin-left: -1rem;
  transform: perspective(46vw) rotateY(69deg) rotateX(182deg);
}

.server-right {
  right: 0;
  width: 3.9rem;
  height: 3.5rem;
  top: 3.6rem;
  margin-left: 2rem;
  transform: perspective(46vw) rotateY(285deg) rotateX(181deg)
    translateX(1.8rem);
}
.server-left,
.server-right {
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  position: absolute;
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
