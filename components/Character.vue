<template>
  <div class="character" :class="{ debug }">
    <div class="character__head"></div>
    <div class="character__body"></div>
    <div class="character__legs"></div>
  </div>
</template>

<script>
export default defineComponent({
  props: {
    debug: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    moveToTile(x, y) {
      console.log("moveToTile", x, y);
      // this.$store.dispatch('moveToTile', i)
    },
  },
});
</script>

<style lang="scss">
.character {
  background: blue;
  width: 4rem;
  height: 6rem;
}
</style>
