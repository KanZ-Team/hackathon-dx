import noise from "@/helpers/perlin.js";

export enum CharacterState {
  Idle = "idle",
  Walking = "walking",
}

export enum ActorType {
  Scene = "scene",
  Sound = "sound",
  Character = "character",
  Server = "server",
}

export enum CharacterEvents {
  Move = "move",
  Stop = "stop",
  Pet = "pet",
}

export enum SceneEvents {
  ChangeActiveSeen = "changeActiveScene",
}

export interface GameEvent {
  actor: ActorType;
  type: CharacterEvents | string;
  payload: any;
}

export enum ServerStatus {
  Damaged = "damaged",
  Burning = "burning",
  Online = "online",
  Offline = "offline",
}

const soundManager = {
  play: (sound: string) => {
    console.log("playing sound", sound);
    // play walk sound
    // add audio element to the dom
    if (typeof window === "undefined") return;
    const audio = document.createElement("audio");
    audio.volume = 1;
    audio.src = "/resources/sounds/" + sound;
    audio.play();
  },
};

const sceneManager = {
  changeActiveScene: (name: string) => {
    console.log("change scene", name);
  },
};

function shouldServerHeatUp({ load, servers }: any) {
  const maxServerLoad = 110;
  let percentageOfServersOnline =
    servers.filter((server: any) =>
      [ServerStatus.Online].includes(server.status)
    ).length / servers.length;
  return load / percentageOfServersOnline > maxServerLoad / 100;
}

function coolDownServers({ servers, howMuchCoolDown }: any) {
  // cool down to 25 degrees
  // cooling speed should be square root of current temp
  servers
    .filter((server: any) => server.temp > 25)
    .forEach((server: any) => {
      server.temp -= 0.05;
      if (server.temp < 25) {
        server.temp = 25;
      }
    });
}

function addServerHeatUp({ servers, heatGenerated }: any) {
  // check server temp
  servers
    .filter(
      (server: any) =>
        ![ServerStatus.Damaged, ServerStatus.Offline].includes(server.status)
    )
    .forEach((server: any) => {
      if (!server.temp) return;
      // added temp should be excessive to the load
      // the more servers are online the less temp should be added
      // the more load is the more temp should be added
      server.temp += heatGenerated;
      if (server.temp > 100) {
        server.status = ServerStatus.Burning;
        server.temp = null;
      }
    });
}

function getAverageTemp({ servers }: any) {
  const onlineServers = servers.filter(
    (server: any) => server.status === ServerStatus.Online
  );
  const avgTemp =
    onlineServers.reduce((acc: any, server: any) => {
      return acc + server.temp;
    }, 0) / onlineServers.length;
  return avgTemp;
}

const petTimeout = 2000;

//#region Mood
function increaseMood({ character }: any) {
  character.mood = Math.min(1, character.mood - 0.001);
}

function decreaseMood({ character }: any) {
  character.mood = Math.max(0, character.mood + 0.001);
}

function updateMood({ location, character }: any) {
  if (location === "server-room") {
    decreaseMood(character);
  }

  if (location === "campus") {
    increaseMood(character);
  }
}
//#endregion Mood

export const useGameStore = defineStore("game", {
  state: () => ({
    started: false,
    time: 0,
    heatUpTime: -1,
    averageTemp: 25,
    location: "server-room",
    character: {
      x: 3,
      y: 2,
      state: CharacterState.Idle,
      mood: 0,
      money: 0,
      petTimes: {},
    },
    servers: [
      {
        status: ServerStatus.Online,
        temp: 25,
      },
      {
        status: ServerStatus.Offline,
        temp: 25,
      },
      {
        status: ServerStatus.Offline,
        temp: 25,
      },
      {
        status: ServerStatus.Offline,
        temp: 25,
      },
    ],
    load: 0,
  }),
  actions: {
    start() {
      if (this.started) return;
      // start the game
      // run every 1 second with requestAnimationFrame
      let lastTime = 0;
      let globalTime = 0;
      const updateInterval = 1;
      const loop = (time: number) => {
        if (globalTime % updateInterval === 0) {
          const delta = time - lastTime;
          lastTime = time;
          this.update(delta);
        }
        globalTime++;
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    },
    update(delta: number) {
      // update the game state

      this.load =
        Math.abs(noise.perlin2(Math.floor(this.time / 100) / 10, 0.1) * 1.6) +
        0.1;
      this.time = this.time + 1;

      const { load, servers } = this;
      if (shouldServerHeatUp({ load, servers })) {
        if (this.heatUpTime === -1) {
          this.heatUpTime = this.time - 1;
        }
        const heatGenerated = 0.8 / Math.sqrt(this.time - this.heatUpTime);

        //console.log('heatGenerated', heatGenerated)
        addServerHeatUp({ servers, heatGenerated });
      } else {
        this.heatUpTime = -1;
        coolDownServers({ servers });
      }

      const avgTemp = getAverageTemp({ servers: this.servers });
      this.averageTemp = avgTemp;

      updateMood({ location: this.location, character: this.character });
    },
    changeLocation(location: string) {
      this.location = location;
    },
    async notify(event: GameEvent) {
      // handle events and coordinate actions
      if (
        event.actor === ActorType.Character &&
        event.type === CharacterEvents.Move
      ) {
        if (
          this.character.x === event.payload.x &&
          this.character.y === event.payload.y
        )
          return;
        soundManager.play("697182__znukem__single-footstep.mp3");
        this.character.x = event.payload.x;
        this.character.y = event.payload.y;
        this.character.state = CharacterState.Walking;
        // busy wait for 1 second
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      if (
        event.actor === ActorType.Character &&
        event.type === CharacterEvents.Stop
      ) {
        this.character.state = CharacterState.Idle;
      }
      if (
        event.actor === ActorType.Character &&
        event.type === CharacterEvents.Pet
      ) {
        if (
          !this.character.petTimes[event.payload.name] ||
          this.time - this.character.petTimes[event.payload.name] > petTimeout
        ) {
          console.log(this.time, this.character.petTimes[event.payload.name]);
          // check if lucy has been petted before
          this.character.petTimes[event.payload.name] = this.time;
          this.character.mood = Math.min(1, this.character.mood + 0.1);
          soundManager.play(event.payload.sound);
        }
      }
      if (event.actor === ActorType.Sound) {
        (soundManager as any)[event.type]?.(event.payload);
      }
      if (event.actor === ActorType.Scene) {
        (sceneManager as any)[event.type]?.(event.payload);
      }
    },
  },
});
