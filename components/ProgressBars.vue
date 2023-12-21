<template>
<div id="app">
    <div id="progress-container">
        <div id="progress-bar"></div>
    </div>
</div>
</template>

<script>
import { mapStores } from 'pinia'

// https://vuejs.org/guide/extras/render-function.html
export default defineComponent({
  name: 'ProgressBars',
  computed: {
    ...mapStores(useTestStore)
  },
  data() {
    return {
      dolulukOrani: 90
    };
},
  mounted() {
    console.log('Index page mounted', this)
    this.testStore.fetch()
    this.updateProgressBar()
  },
  methods: {
    updateProgressBar() {
      var progressBar = this.$el.querySelector("#progress-bar");
      progressBar.style.width = this.dolulukOrani + "%";
    }
  
  },
})
</script>
<style scoped>
#progress-container {
  width: 300px;
  height: 30px;
  border-radius: 15px;
  background-color: #ddd;
  overflow: hidden;
}

#progress-bar {
  height: 100%;
  background-color: #4CAF50;
  transition: width 1s ease-in-out;
}
</style>