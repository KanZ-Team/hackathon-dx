<template>
  <Debug />
  <div class="campus">
    <CampusTiles />
    <ServerRoomDoorOutside />
    <Character />
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

<style>
.server-room {
  background-color: #9fc2c4;
  background-image: url("/resources/rooms/server-room.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 9rem;
  width: 9rem;
  position: relative;
  overflow: hidden;
}
</style>
