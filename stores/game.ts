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
  Stop = 'stop',
  Pet = 'pet'
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
  Damaged = 'damaged',
  Burning = 'burning',
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

function shouldServerHeatUp({ load, servers }: any) {
  const maxServerLoad = 110
  let percentageOfServersOnline =
    servers.filter((server: any) =>
      [ServerStatus.Online].includes(server.status)
    ).length / servers.length
  return load / percentageOfServersOnline > maxServerLoad / 100
}

function coolDownServers({ servers, howMuchCoolDown }: any) {
  // cool down to 25 degrees
  // cooling speed should be square root of current temp
  servers
    .filter((server: any) => server.temp > 25)
    .forEach((server: any) => {
      server.temp -= 0.05
      if (server.temp < 25) {
        server.temp = 25
      }
    })
}

function addServerHeatUp({ servers, heatGenerated }: any) {
  // check server temp
  servers
    .filter(
      (server: any) =>
        ![ServerStatus.Damaged, ServerStatus.Offline].includes(server.status)
    )
    .forEach((server: any) => {
      if (!server.temp) return
      // added temp should be excessive to the load
      // the more servers are online the less temp should be added
      // the more load is the more temp should be added
      server.temp += heatGenerated
      if (server.temp > 100) {
        server.status = ServerStatus.Burning
        server.temp = null
      }
    })
}

export const useGameStore = defineStore('game', {
  state: () => ({
    time: 0,
    heatUpTime: -1,
    character: {
      x: 0,
      y: 0,
      state: CharacterState.Idle,
      mood: 0,
      money: 0
    },
    servers: [
      {
        status: ServerStatus.Online,
        temp: 25
      },
      {
        status: ServerStatus.Offline,
        temp: 25
      },
      {
        status: ServerStatus.Offline,
        temp: 25
      },
      {
        status: ServerStatus.Offline,
        temp: 25
      }
    ],
    load: 0
  }),
  actions: {
    start() {
      // start the game
      // run every 1 second with requestAnimationFrame
      let lastTime = 0
      let globalTime = 0
      const updateInterval = 1
      const loop = (time: number) => {
        if (globalTime % updateInterval === 0) {
          const delta = time - lastTime
          lastTime = time
          this.update(delta)
        }
        globalTime++
        requestAnimationFrame(loop)
      }
      requestAnimationFrame(loop)
    },
    update(delta: number) {
      // update the game state

      this.load =
        Math.abs(noise.perlin2(Math.floor(this.time / 100) / 10, 0.1) * 1.6) +
        0.1
      this.time = this.time + 1

      const { load, servers } = this
      if (shouldServerHeatUp({ load, servers })) {
        if (this.heatUpTime === -1) {
          this.heatUpTime = this.time - 1
        }
        const heatGenerated = 0.8 / Math.sqrt(this.time - this.heatUpTime)

        console.log('heatGenerated', heatGenerated)
        addServerHeatUp({ servers, heatGenerated })
      } else {
        this.heatUpTime = -1
        coolDownServers({ servers })
      }
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
