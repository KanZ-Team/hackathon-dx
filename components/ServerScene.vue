<template>
  <div class="server-container" :class="{ debug }">
    <div class="server" v-for="server in serverList">
      <span class="status">{{ server.status }}</span>
      <span class="temperature">{{ server.temperature }}</span>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
export default defineComponent({
  props: {
    debug: {
      type: Boolean,
      default: false,
    },
    serverList: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      serverList: [
        {
          status: "on",
          temperature: 100,
        },
        {
          status: "off",
          temperature: 100,
        },
        {
          status: "off",
          temperature: 100,
        },
        {
          status: "off",
          temperature: 100,
        },
      ],
    };
  },
  computed: {},
});
</script>
// status temperature
<style lang="scss">
// .character {
//   --character-height: 2.8rem;
//   width: 1rem;
//   height: var(--character-height);
//   transition: top 0.2s ease-in-out, left 0.2s ease-in-out;
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   /* click through */
//   pointer-events: none;
//   background-image: url("/resources/characters/player.png");
//   background-size: cover;
//   background-position: center;
//   background-repeat: no-repeat;
//   z-index: 1;
// }
</style>
