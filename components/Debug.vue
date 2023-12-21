<template>
  <div class="debug-component">
    {{ gameStore.character }}
  </div>
</template>

<script>
import { mapStores } from "pinia";
export default defineComponent({
  computed: {
    ...mapStores(useGameStore),
  },
});
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
  z-index: 100;
  font-size: 50%;
}
</style>
