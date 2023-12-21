export enum CharacterState {
  Idle = 'idle',
  Walking = 'walking'
}

export enum ActorType {
  Character = 'character',
  Server = 'server'
}

export enum CharacterEvents {
  Move = 'move',
  Stop = 'stop'
}

export interface GameEvent {
  actor: ActorType
  type: CharacterEvents | string
  payload: any
}

export const useGameStore = defineStore('game', {
  state: () => ({
    character: {
      x: 0,
      y: 0,
      state: CharacterState.Idle
    },
    serverLoad: 0,
    temperature: 25,
    mood: 0,
    money: 0
  }),
  actions: {
    notify(event: GameEvent) {
      // handle events and coordinate actions
      if (
        event.actor === ActorType.Character &&
        event.type === CharacterEvents.Move
      ) {
        this.character.x = event.payload.x
        this.character.y = event.payload.y
        this.character.state = CharacterState.Walking
      }
      if (
        event.actor === ActorType.Character &&
        event.type === CharacterEvents.Stop
      ) {
        this.character.state = CharacterState.Idle
      }
    },
    async fetchInitialState() {
      // Initialize states
      this.serverLoad = 0
      this.temperature = 25
      this.mood = 0
      this.money = 0
    }
  }
})
