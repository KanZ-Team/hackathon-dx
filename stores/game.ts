export const useGameStore = defineStore('game', {
  state: () => ({
    serverLoad: 0,
    temperature: 25,
    mood: 0,
    money: 0,
  }),
  actions: {
    async fetchInitialState() {
      // Initialize states
      this.serverLoad = 0
      this.temperature = 25
      this.mood = 0
      this.money = 0
    }
  }
})
