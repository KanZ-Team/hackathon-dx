<template>
  <h1>Another component, same store {{ testStore.description }}</h1>
</template>

<script>
import { mapStores } from 'pinia'

// https://vuejs.org/guide/extras/render-function.html
export default defineComponent({
  name: 'StoreExample',
  computed: {
    ...mapStores(useTestStore)
  },
  mounted() {
    console.log('Index page mounted', this)
  }
})
</script>
