<template>
  <div class="layout">
    <UModal v-model="gameStore.gameOver">
      <div class="p-4">
        <h1>
          Şirket zarar edip kapandı. Maaşını da maya yedi. Puanın:
          {{ gameStore?.points }}
        </h1>
      </div>
    </UModal>
    <slot />
  </div>
</template>

<script>
import { mapStores } from 'pinia'

export default defineComponent({
  name: 'DefaultLayout',
  computed: {
    ...mapStores(useGameStore)
  }
})
</script>

<style lang="scss">
.layout {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
