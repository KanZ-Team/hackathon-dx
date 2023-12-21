<template>
  <Debug />
  <div class="campus">
    <ProgressBars />
    <CampusTiles />
    <ServerRoomDoorOutside />
    <Character />
    <MayaTheDog debug />
    <LucyTheCat debug />
    <LokiTheCat debug />
  </div>
</template>

<script>
import { mapStores } from "pinia";
import Character from "~/components/Character.vue";

// https://vuejs.org/guide/extras/render-function.html
export default defineComponent({
  name: "Index",
  computed: {
    ...mapStores(useGameStore),
  },
  mounted() {
    console.log("Index page mounted", this);
  },
  components: { Character },
});
</script>

<style lang="scss">
.campus {
  background-color: #9fc2c4;
  background-image: url("/resources/rooms/campus.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 9rem;
  width: 9rem;
  position: relative;
  overflow: hidden;
  .character {
    filter: drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 1px black)
      drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 1px black)
      drop-shadow(0px 0px 1px black);
  }
}
</style>
