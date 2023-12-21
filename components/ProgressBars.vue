<template>
<div id="app">
    <div id="progress-container">
        <div id="progress-bar-server-load"></div>
    </div>
    <div id="progress-container">
        <div id="progress-bar-temperature"></div>
    </div>
    <div id="progress-container">
        <div id="progress-bar-mood"></div>
    </div>
    <div id="progress-container">
        <div id="progress-bar-money"></div>
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
        occupancyRateServerLoad: 90,
        occupancyRateTemperature: 30,
        occupancyRateMood: 50,
        occupancyRateMoney: 10,
    };
},
  mounted() {
    console.log('Index page mounted', this)
    this.testStore.fetch()
    this.updateServerLoadProgressBar()
    this.updateTemperatureProgressBar()
    this.updateMoodProgressBar()
    this.updateMoneyProgressBar()
  },
  methods: {
    updateServerLoadProgressBar() {
      var progressBar = this.$el.querySelector("#progress-bar-server-load");
      progressBar.style.width = this.occupancyRateServerLoad + "%";
    },
    updateTemperatureProgressBar() {
      var progressBar = this.$el.querySelector("#progress-bar-temperature");
      progressBar.style.width = this.occupancyRateTemperature + "%";
    },
    updateMoodProgressBar() {
      var progressBar = this.$el.querySelector("#progress-bar-mood");
      progressBar.style.width = this.occupancyRateMood + "%";
    },
    updateMoneyProgressBar() {
      var progressBar = this.$el.querySelector("#progress-bar-money");
      progressBar.style.width = this.occupancyRateMoney + "%";
    }
  
  },
})
</script>
<style scoped>
#progress-container {
  width: 2.0rem; /* 1.8rem * 2 */
  height: 0.250rem; /* 0.1875rem * 2 */
  border-radius: 0.09375rem; /* 0.9375rem / 10 */
  margin-top: 0.2rem;
  margin-left: 0.3rem;
  background-color: #ddd;
  overflow: hidden;
}

#progress-bar-server-load {
  height: 100%;
  background-color: blue;
  transition: width 1s ease-in-out;
  width: 200%; /* Genişliği iki katına çıkar */
}
#progress-bar-temperature {
  height: 100%;
  background-color: red;
  transition: width 1s ease-in-out;
  width: 200%; /* Genişliği iki katına çıkar */
}
#progress-bar-mood {
  height: 100%;
  background-color: purple;
  transition: width 1s ease-in-out;
  width: 200%; /* Genişliği iki katına çıkar */
}
#progress-bar-money {
  height: 100%;
  background-color: #031803;
  transition: width 1s ease-in-out;
  width: 200%; /* Genişliği iki katına çıkar */
}

</style>