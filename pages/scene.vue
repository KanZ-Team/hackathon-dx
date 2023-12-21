<template>
  <Debug />
  <div class="scene">
    <ServerScene />
  </div>
</template>

<script>
import { mapStores } from "pinia";

// https://vuejs.org/guide/extras/render-function.html
export default defineComponent({
  name: "Index",
  computed: {
    ...mapStores(useGameStore),
  },
  mounted() {
    console.log("Index page mounted", this);
  },
});
</script>

<style>
.scene {
  background-color: #9fc2c4;
  background-image: url("/resources/rooms/scene-room.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 9rem;
  width: 9rem;
  position: relative;
  overflow: hidden;
}
</style>
