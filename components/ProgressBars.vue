<template>
  <div id="bars">
    <div class="side">
      <div id="server-load">
        <img src="@/assets/icons/server-load.svg" alt="Your Icon" />
      </div>
      <div id="progress-container">
        <div
          id="progress-bar-server-load"
          :style="{
            width: gameStore?.load * 100 + '%'
          }"
        ></div>
      </div>
    </div>
    <div class="side">
      <div id="temperature">
        <img src="@/assets/icons/temperature.svg" alt="Your Icon" />
      </div>
      <div id="progress-container">
        <div
          id="progress-bar-temperature"
          :style="{
            width: gameStore?.averageTemp + '%'
          }"
        ></div>
      </div>
    </div>

    <div class="side">
      <div id="mood">
        <img src="@/assets/icons/mood.svg" alt="Your Icon" />
      </div>
      <div id="progress-container">
        <div
          id="progress-bar-mood"
          :style="{
            width: gameStore?.character.mood * 100 + '%'
          }"
        ></div>
      </div>
    </div>
    <!-- <div class="side">
      <div id="money">
        <img src="@/assets/icons/money.svg" alt="Your Icon" />
      </div>
      <div id="progress-container">
        <div id="progress-bar-money"></div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapStores } from 'pinia'

// https://vuejs.org/guide/extras/render-function.html
export default defineComponent({
  name: 'ProgressBars',
  computed: {
    ...mapStores(useGameStore)
  }
})
</script>
<style scoped>
#bars {
  display: flex;
}

.side {
  display: flex;
}
#temperature {
  width: 0.25rem;
  margin-left: 0.5rem;
  position: absolute;
  z-index: 1;
  filter: contrast(0) brightness(0) drop-shadow(0 0 0.75rem #000);
  margin-top: -0.04rem;
}
#money {
  width: 0.25rem;
  margin-left: 0.5rem;
  position: absolute;
  z-index: 1;
  filter: contrast(0) brightness(0) drop-shadow(0 0 0.75rem #000);
}
#mood {
  width: 0.25rem;
  margin-left: 0.5rem;
  position: absolute;
  z-index: 1;
  filter: contrast(0) brightness(0) drop-shadow(0 0 0.75rem #000);
  margin-top: -0.04rem;
}
#server-load {
  width: 0.25rem;
  margin-left: 0.5rem;
  position: absolute;
  z-index: 1;
  filter: contrast(0) brightness(0) drop-shadow(0 0 0.75rem #000);
  margin-top: -0.04rem;
}
#progress-container {
  width: 1.9rem;
  height: 0.5rem;
  border-radius: 0.1rem;
  margin-top: 0.4rem;
  margin-left: 0.3rem;
  background-color: #ffffff14;
  overflow: hidden;
  backdrop-filter: blur(15px);
  border: 1px solid #ffffff4f;
}

#progress-bar-server-load {
  height: 100%;
  background-color: #1fde6bb8;
  width: 200%; /* Genişliği iki katına çıkar */
  transition: width 0.7s linear;
}
#progress-bar-temperature {
  height: 100%;
  background-color: #ff000096;
  width: 200%; /* Genişliği iki katına çıkar */
}
#progress-bar-mood {
  height: 100%;
  background-color: #3bdbe6ba;
  transition: width 1s ease-in-out;
  width: 200%; /* Genişliği iki katına çıkar */
}
#progress-bar-money {
  height: 100%;
  background-color: #031803;
  width: 200%; /* Genişliği iki katına çıkar */
}
</style>
