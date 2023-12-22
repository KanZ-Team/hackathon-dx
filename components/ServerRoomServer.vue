<template>
  <div @click="openServerScreen" class="server-left" :class="{ debug }"></div>
  <div @click="openServerScreen" class="server-right" :class="{ debug }"></div>
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
    openServerScreen() {
      this.gameStore
        .notify({
          actor: ActorType.Scene,
          type: SceneEvents.ChangeActiveSeen,
          payload: {}
        })
        // play scene sound
        // open scene view
        .then(() => this.$router.push('/servers'))
    }
  }
})
</script>

<style lang="scss">
.server-left {
  width: 4.4rem;
  height: 4.2rem;
  top: 3.2rem;
  margin-left: -1.2rem;
  transform: perspective(66vw) rotateY(68deg) rotateX(180deg);
}

.server-right {
  right: 0;
  width: 4.96rem;
  height: 5rem;
  top: 2.77em;
  margin-left: 2rem;
  transform: perspective(66vw) rotateY(301deg) rotateX(180deg);
  transform-origin: center right;
}
.server-left,
.server-right {
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  z-index: 41; // 41 is overlay click through
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
