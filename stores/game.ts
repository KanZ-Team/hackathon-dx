import noise from '@/helpers/perlin.js'

export enum CharacterState {
  Idle = 'idle',
  Walking = 'walking'
}

export enum ActorType {
  Scene = 'scene',
  Sound = 'sound',
  Character = 'character',
  Server = 'server'
}

export enum CharacterEvents {
  Move = 'move',
  Stop = 'stop'
}

export enum SceneEvents {
  ChangeActiveSeen = 'changeActiveScene'
}

export interface GameEvent {
  actor: ActorType
  type: CharacterEvents | string
  payload: any
}

export enum ServerStatus {
  Online = 'online',
  Offline = 'offline'
}

const soundManager = {
  play: (sound: string) => {
    console.log('playing sound', sound)
  }
}

const sceneManager = {
  changeActiveScene: (name: string) => {
    console.log('change scene', name)
  }
}

export const useGameStore = defineStore('game', {
  state: () => ({
    time: 0,
    character: {
      x: 0,
      y: 0,
      state: CharacterState.Idle,
      mood: 0,
      money: 0
    },
    servers: [
      {
        status: ServerStatus.Offline,
        temp: 0
      }
    ],
    load: 0
  }),
  actions: {
    start() {
      // start the game
      // run every 1 second with requestAnimationFrame
      let lastTime = 0
      const loop = (time: number) => {
        const delta = time - lastTime
        lastTime = time
        this.update(delta)
        requestAnimationFrame(loop)
      }
      requestAnimationFrame(loop)
    },
    update(delta: number) {
      // update the game state
      this.load = Math.abs(noise.perlin2(this.time / 100, 0.1))
      this.time = this.time + 1
    },
    async notify(event: GameEvent) {
      // handle events and coordinate actions
      if (
        event.actor === ActorType.Character &&
        event.type === CharacterEvents.Move
      ) {
        this.character.x = event.payload.x
        this.character.y = event.payload.y
        this.character.state = CharacterState.Walking
        // busy wait for 1 second
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
      if (
        event.actor === ActorType.Character &&
        event.type === CharacterEvents.Stop
      ) {
        this.character.state = CharacterState.Idle
      }
      if (event.actor === ActorType.Sound) {
        ;(soundManager as any)[event.type]?.(event.payload)
      }
      if (event.actor === ActorType.Scene) {
        ;(sceneManager as any)[event.type]?.(event.payload)
      }
    }
  }
})
