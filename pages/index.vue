<template>
  <h1>Hoş geldin bebek! {{ testStore.description }}</h1>
  <StoreExample />
  <GameStoreExample />
</template>

<script>
import { mapStores } from 'pinia'

// https://vuejs.org/guide/extras/render-function.html
export default defineComponent({
  name: 'Index',
  computed: {
    ...mapStores(useTestStore, useGameStore)
  },
  mounted() {
    console.log('Index page mounted', this)
    this.testStore.fetch()
  }
})
</script>
