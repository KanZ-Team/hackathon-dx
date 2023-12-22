<template>
  <div class="back-button"></div>
</template>

<script>
import { mapStores } from 'pinia'
import {
  ActorType,
  CharacterEvents,
  ServerStatus,
  ServerEvents
} from '@/stores/game'

export default defineComponent({
  computed: {
    ...mapStores(useGameStore),
    isOnFire() {
      return this.gameStore.servers[this.index].status === ServerStatus.Burning
    },
    isOn() {
      return this.gameStore.servers[this.index].status === ServerStatus.Online
    }
  },
  props: {
    index: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggle() {
      this.gameStore.toggleServer(this.index)
    },
    onTap() {
      this.gameStore.notify({
        actor: ActorType.Server,
        type: ServerEvents.Extinguish,
        payload: { index: this.index }
      })
    }
  }
})
</script>

<style lang="scss">
.server-button {
  position: absolute;
  span {
    cursor: pointer;
    background: #ff5555;
    width: 0.7rem;
    height: 0.7rem;
    position: absolute;
    z-index: 99;
    top: 0;
    left: 0;
    border-radius: 99rem;
    transform: rotateX(45deg);
    filter: drop-shadow(0 0 0.1rem #ff5555);
    &.on {
      background: #1fde6b;
      filter: drop-shadow(0 0 0.1rem #1fde6b);
    }

    &.fire {
      width: 1.4rem;
      height: 2rem;
      margin-left: -0.35rem;
      margin-top: -0.9rem;
      border-radius: 0;
      filter: none;
      background: url('/resources/gifs/7960-fire.gif');
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
  h1 {
    top: 1.3rem;
    left: 1rem;
    position: absolute;
    font-size: 0.5rem;
    color: #fff;
    transform: rotateX(45deg);
  }
}
</style>
