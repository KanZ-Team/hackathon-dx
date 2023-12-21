export const useTestStore = defineStore('test', {
  state: () => ({
    name: '',
    description: ''
  }),
  actions: {
    async fetch() {
      this.name = 'hey'
      this.description = Math.random().toString()
    }
  }
})
