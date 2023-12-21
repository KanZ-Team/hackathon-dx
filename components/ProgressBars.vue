<template>
<div id="app">
    <div class="side">
        <div id="server-load">
            <img src="@/assets/icons/server-load.svg" alt="Your Icon" />
        </div>
        <div  id="progress-container">
            <div id="progress-bar-server-load"></div>
        </div>
    </div>
    <div class="side">
        <div id="temperature">
            <img src="@/assets/icons/temperature.svg" alt="Your Icon" />
        </div>
        <div  id="progress-container">
            <div id="progress-bar-temperature"></div>
        </div>
    </div>

    <div class="side">
        <div id="mood">
            <img src="@/assets/icons/mood.svg" alt="Your Icon" />
        </div>
        <div id="progress-container">
            <div id="progress-bar-mood"></div>
        </div>
    </div>
    <div class="side">
        <div id="money">
            <img src="@/assets/icons/money.svg" alt="Your Icon" />
        </div>
        <div id="progress-container">
            <div id="progress-bar-money"></div>
        </div>
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
.side {
  display: flex;
}
#temperature {
    width: 0.25rem;
  margin-left: 0.3rem;
}
#money {
    width: 0.25rem;
  margin-left: 0.3rem;
}
#mood {
    width: 0.25rem;
  margin-left: 0.3rem;
}
#server-load {
    width: 0.25rem;
  margin-left: 0.3rem;
}
#progress-container {
  width: 1.90rem; /* 1.8rem * 2 */
  height: 0.250rem; /* 0.1875rem * 2 */
  border-radius: 0.09375rem; /* 0.9375rem / 10 */
  margin-top: 0.4rem;
  margin-left: 0.3rem;
  background-color: #ddd;
  overflow: hidden;
}

#progress-bar-server-load {
  height: 100%;
  background-color: #28a745;
  transition: width 1s ease-in-out;
  width: 200%; /* Genişliği iki katına çıkar */
}
#progress-bar-temperature {
  height: 100%;
  background-color: #801f0d;
  transition: width 1s ease-in-out;
  width: 200%; /* Genişliği iki katına çıkar */
}
#progress-bar-mood {
  height: 100%;
  background-color: #3498db;
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