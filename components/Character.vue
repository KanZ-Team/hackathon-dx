<template>
  <div class="character" :class="{ debug }" :style="styles"></div>
</template>

<script>
import { mapStores } from 'pinia'
export default defineComponent({
  props: {
    debug: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapStores(useGameStore),
    styles() {
      if (typeof document === 'undefined') return {}

      const nthChild =
        this.gameStore.character.y * 8 + this.gameStore.character.x + 1

      const tileBounds = document
        .querySelector('.tile:nth-child(' + nthChild + ')')
        ?.getBoundingClientRect()
      const gameAreaBounds = document
        .querySelector('.game-area')
        ?.getBoundingClientRect()

      if (!tileBounds || !gameAreaBounds) return {}
      const diff = {
        x: tileBounds.left - gameAreaBounds.left,
        y: tileBounds.top - gameAreaBounds.top
      }

      console.log('styles', nthChild)

      return {
        left: `${diff.x}px`,
        top: `calc(${diff.y}px - var(--character-height) + 0.4rem)`
      }
    }
  }
})
</script>

<style lang="scss">
.character {
  --character-height: 2.8rem;
  width: 1rem;
  height: var(--character-height);
  transition: top 0.2s ease-in-out, left 0.2s ease-in-out;
  position: absolute;
  bottom: 0;
  left: 0;
  /* click through */
  pointer-events: none;
  background-image: url('/resources/characters/player.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
}
</style>
