<template>
  <div class="points" :class="{ debug }">
    {{ gameStore?.time }}
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
  }
})
</script>

<style lang="scss">
.points {
  text-align: center;
  top: 2.5rem;
  position: absolute;
  width: 100%;
  filter: drop-shadow(1px 4px 3px #50acd5) drop-shadow(1px 4px 3px #50acd5)
    drop-shadow(1px 4px 3px #50acd5);
}
</style>
