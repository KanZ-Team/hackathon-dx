<template>
  <div id="bars">
    <UModal v-model="isOpenServerLoad"
    :ui="{ width: 'max-w-px sm:max-w-44', inner: 'text-[32px]' }"
    >
    <div class="p-4">
        <h1>Sunucu Yükü</h1>
        <Placeholder class="h-48" />
        <p>
          Mevcut iş yükünü temsil eder. Daha yüksek bir değer, 
          sunucunun daha fazla işlem yaptığını gösterebilir.
        </p>
    </div>
    </UModal>
    <div class="side">
      <div id="server-load">
        <img src="@/assets/icons/server-load.svg" @click="isOpenServerLoad = true" alt="Your Icon" />
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
    <UModal v-model="isOpenTemperature"
    :ui="{ width: 'max-w-px sm:max-w-44', inner: 'text-[32px]' }"
    >
    <div class="p-4">
        <h1>Sunucu Sıcaklığı</h1>
        <Placeholder class="h-48" />
        <p>
          Sunucusunun anlık sıcaklık durumunu gösterir. 
          Artan sıcaklık, sunucunun aşırı ısındığını ve soğutma önlemlerinin alınması gerektiğini gösterebilir.
        </p>
    </div>
    </UModal>
    <div class="side">
      <div id="temperature">
        <img src="@/assets/icons/temperature.svg" @click="isOpenTemperature = true" alt="Your Icon" />
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
    <UModal v-model="isOpenMood"
    :ui="{ width: 'max-w-px sm:max-w-44', inner: 'text-[32px]' }"
    >
    <div class="p-4">
        <h1>Mod</h1>
        <Placeholder class="h-48" />
        <p>
          Oyuncunun ruh halini temsil eder.
        </p>
    </div>
    </UModal>
    <div class="side">
      <div id="mood">
        <img src="@/assets/icons/mood.svg" @click="isOpenMood = true" alt="Your Icon" />
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
    <div class="side">
      <div id="money">
        <img src="@/assets/icons/money.svg" @click="isOpenMoney = true" alt="Your Icon" />
      </div>
      <div id="progress-container">
        <div
          id="progress-bar-money"
          :style="{
            width: gameStore?.character.money / 1000 + '%'
          }"
        ></div>
      </div>
    </div>
    <UModal v-model="isOpenMoney"
    :ui="{ width: 'max-w-px sm:max-w-44', inner: 'text-[32px]' }"
    >
    <div class="p-4">
        <h1>Para</h1>
        <Placeholder class="h-48" />
        <p>
          Oyuncunun sahip olduğu sanal para birimini gösterir. Bu para, oyun içindeki alışverişlerde ve geliştirmelerde kullanılabilir.
        </p>
    </div>
    </UModal>
  </div>
</template>

<script>
import { mapStores } from 'pinia'

// https://vuejs.org/guide/extras/render-function.html
export default defineComponent({
  data() {
    return {
      isOpenMoney: false,
      isOpenMood: false,
      isOpenTemperature: false,
      isOpenServerLoad:false,
    }
  },
  name: 'ProgressBars',
  computed: {
    ...mapStores(useGameStore)
  },
})
</script>
<style scoped>
#bars {
  display: flex;
}

.side {
  display: flex;
  align-items: flex-end;
}
#temperature {
  width: 0.25rem;
  margin-left: 0.5rem;
  position: absolute;
  z-index: 1;
  filter: contrast(0) brightness(0) drop-shadow(0 0 0.75rem #000);
  margin-top: -0.04rem;
  padding-bottom: 0.12rem;
}
#money {
  width: 0.25rem;
  margin-left: 0.5rem;
  position: absolute;
  z-index: 1;
  filter: contrast(0) brightness(0) drop-shadow(0 0 0.75rem #000);
  padding-bottom: 0.12rem;
}
#mood {
  width: 0.25rem;
  margin-left: 0.5rem;
  position: absolute;
  z-index: 1;
  filter: contrast(0) brightness(0) drop-shadow(0 0 0.75rem #000);
  margin-top: -0.04rem;
  padding-bottom: 0.12rem;
}
#server-load {
  width: 0.25rem;
  margin-left: 0.5rem;
  position: absolute;
  z-index: 1;
  filter: contrast(0) brightness(0) drop-shadow(0 0 0.75rem #000);
  margin-top: -0.04rem;
  padding-bottom: 0.12rem;
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
  width: 200%; /* Genişliği iki katına çıkar */
}
#progress-bar-money {
  height: 100%;
  background-color: #ede842c2;
  width: 200%; /* Genişliği iki katına çıkar */
}
</style>
