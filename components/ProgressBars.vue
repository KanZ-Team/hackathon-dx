<template>
  <div id="bars">
    <UModal
      v-model="isOpenServerLoad"
      :ui="{ width: 'max-w-24 sm:max-w-24', inner: 'text-[32px]' }"
    >
      <div class="p-4">
        <h1>Sunucu Yükü</h1>
        <p>
          Mevcut trafiği temsil eder. Daha yüksek bir değer, sunucunun daha
          fazla işlem yaptığını gösterir. Sunucu yükü çok yüksekse, sunucular
          ısınır.
        </p>
      </div>
    </UModal>
    <div class="side" @click="isOpenServerLoad = true">
      <div id="server-load">
        <img src="/resources/icons/server-load.svg" />
      </div>
      <div id="progress-container">
        <div
          id="progress-bar-server-capacity"
          :style="{
            width: gameStore?.capacity * 100 + '%'
          }"
        ></div>
        <div
          id="progress-bar-server-load"
          :style="{
            width: gameStore?.load * 100 + '%'
          }"
        ></div>
      </div>
    </div>
    <UModal
      v-model="isOpenTemperature"
      :ui="{ width: 'max-w-24 sm:max-w-24', inner: 'text-[32px]' }"
    >
      <div class="p-4">
        <h1>Sunucu Sıcaklığı</h1>
        <p>
          Sunucusunun anlık sıcaklık durumunu gösterir. Artan sıcaklık,
          sunucunun aşırı ısındığını ve soğutma önlemlerinin alınması
          gerektiğini gösterir. Tüm sunucular yanarsa oyun biter.
        </p>
      </div>
    </UModal>
    <div class="side" @click="isOpenTemperature = true">
      <div id="temperature">
        <img
          :src="
            gameStore?.averageTemp > 90
              ? '/resources/icons/fire.svg'
              : '/resources/icons/temperature.svg'
          "
        />
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
    <UModal
      v-model="isOpenMood"
      :ui="{ width: 'max-w-24 sm:max-w-24', inner: 'text-[32px]' }"
    >
      <div class="p-4">
        <h1>Mod</h1>
        <p>Oyuncunun ruh halini temsil eder. Sıfıra düşerse oyun biter.</p>
      </div>
    </UModal>
    <div class="side" @click="isOpenMood = true">
      <div id="mood">
        <img src="/resources/icons/mood.svg" />
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
    <div class="side" @click="isOpenMoney = true">
      <div id="money">
        <img src="/resources/icons/money.svg" />
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
    <UModal
      v-model="isOpenMoney"
      :ui="{ width: 'max-w-24 sm:max-w-24', inner: 'text-[32px]' }"
    >
      <div class="p-4">
        <h1>Yeşil Enerji</h1>
        <p>
          Şirketin ne kadar yeşil enerji kullandığını gösterir. Daha yüksek bir
          değer, gelecek için daha iyi bir dünya anlamına gelir. Sıfıra düşerse
          oyun biter.
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
      isOpenServerLoad: false
    }
  },
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
  align-items: flex-end;
}
#temperature {
  width: 0.25rem;
  margin-left: 0.5rem;
  position: absolute;
  z-index: 1;
  filter: contrast(0) brightness(0) drop-shadow(0 0 0.75rem #000);
  margin-top: -0.04rem;
  padding-bottom: 0.16rem;
}
#money {
  width: 0.25rem;
  margin-left: 0.5rem;
  position: absolute;
  z-index: 1;
  filter: contrast(0) brightness(0) drop-shadow(0 0 0.75rem #000);
  padding-bottom: 0.16rem;
}
#mood {
  width: 0.25rem;
  margin-left: 0.5rem;
  position: absolute;
  z-index: 1;
  filter: contrast(0) brightness(0) drop-shadow(0 0 0.75rem #000);
  margin-top: -0.04rem;
  padding-bottom: 0.16rem;
}
#server-load {
  width: 0.25rem;
  margin-left: 0.5rem;
  position: absolute;
  z-index: 1;
  filter: contrast(0) brightness(0) drop-shadow(0 0 0.75rem #000);
  margin-top: -0.04rem;
  padding-bottom: 0.16rem;
}
#progress-container {
  width: 1.87rem;
  height: 0.5rem;
  border-radius: 0.1rem;
  margin-top: 0.4rem;
  margin-left: 0.3rem;
  background-color: #ffffff14;
  overflow: hidden;
  backdrop-filter: blur(1rem);
  border: 0.001rem solid #ffffff4f;
}
#progress-bar-server-capacity {
  position: absolute;
  height: 100%;
  border-right: 2px dashed #0b7535;
  width: 200%; /* Genişliği iki katına çıkar */
  transition: width 0.7s ease-in-out;
  z-index: 2;
  transform: translateX(2px);
}
#progress-bar-server-load {
  top: 0;
  left: 0;
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
