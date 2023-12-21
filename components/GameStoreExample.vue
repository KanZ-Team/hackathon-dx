<template>
  <h1>Game store, {{ gameStore.serverLoad }}</h1>
  <h1>Game store, {{ gameStore.temperature }}</h1>
  <h1>Game store, {{ gameStore.mood }}</h1>
  <h1>Game store, {{ gameStore.money }}</h1>

</template>

<script>
import { mapStores } from 'pinia'

// https://vuejs.org/guide/extras/render-function.html
export default defineComponent({
  name: 'GameStore',
  computed: {
    ...mapStores(useGameStore, useTestStore)
  },
  mounted() {
    console.log('GameStoreComponent', this)
    this.gameStore.fetchInitialState()
    }
})
</script>
