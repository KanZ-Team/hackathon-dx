<template>
  <div class="campus game-area">
    <ProgressBars />
    <ServerRoomTiles />
    <ServerRoomDoorOutside />
    <Character />
    <MayaTheDog />
    <LucyTheCat />
    <LokiTheCat />
    <audio autoplay loop ref="chirping">
      <source
        src="/resources/sounds/620380__much_username__budgie_chirp2.mp3"
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
    this.$refs.chirping.volume = 0.1
  },
  mounted() {
    this.gameStore.notify({
      actor: ActorType.Character,
      type: CharacterEvents.Move,
      payload: { x: 2, y: 0 }
    })
    this.gameStore.changeLocation('campus')
    this.gameStore.start()
  },
  components: { Character }
})
</script>

<style lang="scss">
.campus {
  background-color: #9fc2c4;
  background-image: url('/resources/rooms/campus.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 9rem;
  width: 9rem;
  position: relative;
  overflow: hidden;
  opacity: 0;
  animation: fade-in 1s ease-in-out 0.5s forwards;

  .character {
    filter: drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 1px black)
      drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 1px black)
      drop-shadow(0px 0px 1px black);
  }

  .tiles {
    width: 11.4rem;
  }
}
</style>
