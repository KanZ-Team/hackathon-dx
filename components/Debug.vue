<template>
  <div class="debug-component">
    <pre
      >{{
        {
          time: gameStore.time,
          load: gameStore.load,
          character: gameStore.character,
          servers: gameStore.servers
        }
      }}
    </pre>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
export default defineComponent({
  computed: {
    ...mapStores(useGameStore)
  }
})
</script>

<style lang="scss">
.debug-component {
  background: blue;
  width: 4rem;
  height: 6rem;
  color: white;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 42;
  font-size: 30%;
}
</style>
