<template>
  <div>
    <UButton label="Open" @click="isOpen = true" />

    <UModal v-model="isOpen">
      <div class="p-4">
        <Placeholder class="h-48" />
      </div>
    </UModal>
  </div>
</template>

<script>
// https://vuejs.org/guide/extras/render-function.html
export default defineComponent({
  name: 'GameStore',
  data() {
    return {
      isOpen: false
    }
  }
})
</script>
