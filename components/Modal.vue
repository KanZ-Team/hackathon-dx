<template>
  <div>
    <UButton label="Open" @click="isOpen = true" />

    <UModal
      v-model="isOpen"
      :ui="{ width: 'max-w-24 sm:max-w-24', inner: 'text-[32px]' }"
    >
      <div class="p-4">
        <h1>Game Store</h1>
        <Placeholder class="h-48" />
        <p>
          Game Store is a modal component that can be used to display a modal.
        </p>
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
