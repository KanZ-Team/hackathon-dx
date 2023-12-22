<template>
  <Debug />
  <div class="server-room game-area">
    <ServerRoomTiles />
    <ServerRoomSwitch />
    <ServerRoomDoor />
    <ServerRoomServer />
    <ServerRoomTimer :totalTime=320 />
    <Character />
    <PetPoints />
    <ProgressBars />
    <audio autoplay loop ref="chirping">
      <source
        src="/resources/sounds/637377__kyles__computer-workstation-fans-server-room.mp3"
        type="audio/mp3"
      />
    </audio>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import Character from '~/components/Character.vue'

// https://vuejs.org/guide/extras/render-function.html
export default defineComponent({
  name: 'Index',
  computed: {
    ...mapStores(useGameStore)
  },
  mounted() {
    this.$refs.chirping.volume = 0.02
    this.gameStore.notify({
      actor: ActorType.Character,
      type: CharacterEvents.Move,
      payload: { x: 3, y: 0 }
    })
    this.gameStore.changeLocation('server-room')
    this.gameStore.start()
  },
  components: { Character }
})
</script>

<style>
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.server-room {
  background-color: #9fc2c4;
  background-image: url('/resources/rooms/server-room.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 9rem;
  width: 9rem;
  position: relative;
  overflow: hidden;
  opacity: 0;
  animation: fade-in 1s ease-in-out 0.5s forwards;
}
</style>
