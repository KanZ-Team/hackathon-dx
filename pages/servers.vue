<template>
  <div class="servers game-area">
    <BackButton />
    <ProgressBars />
    <ServerButton :index="0" style="top: 2.05rem; left: 1.85rem" />
    <ServerButton :index="1" style="top: 1.05rem; left: 4.35rem" />
    <ServerButton :index="2" style="top: 2.95rem; left: 4.45rem" />
    <ServerButton :index="3" style="top: 2.05rem; left: 6.9rem" />
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
    this.$refs.chirping.volume = 0.04
    this.gameStore.notify({
      actor: ActorType.Character,
      type: CharacterEvents.Move,
      payload: { x: 3, y: 5 }
    })
    this.gameStore.changeLocation('server-room')
    this.gameStore.start()
  },
  components: { Character }
})
</script>

<style>
.servers {
  background-color: #9fc2c4;
  background-image: url('/resources/rooms/servers.jpg');
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
