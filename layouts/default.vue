<template>
  <div class="layout">
    <UModal
      v-model="gameStore.gameOver"
      :ui="{ width: 'max-w-24 sm:max-w-24', inner: 'text-[32px]' }"
    >
      <div class="p-4">
        <h1>
          <span v-if="gameStore?.character.mood <= 0">
            Canın çok sıkıldı. Bu şirketin sana katabileceği hiçbir şey yok.
          </span>
          <span v-else-if="gameStore?.character.money <= 0">
            Şirketinin geleceği, yaktığı kömürden daha kara. Burada daha fazla
            duramazsın.
          </span>
          <span v-else> Şirket zarar edip kapandı. Maaşını da maya yedi. </span>
          <p>
            Puanın: <strong>{{ gameStore?.points }}</strong>
          </p>
        </h1>
        <UButton
          label="Yeniden Başla"
          @click="restart"
          size="text-[32px]"
          padding="lg"
        />
      </div>
    </UModal>
    <slot />
    <BackButton
      style="top: 1rem; left: 1rem; background-color: #ffffff29"
      to="/"
    />
  </div>
</template>

<script>
import { mapStores } from 'pinia'

export default defineComponent({
  name: 'DefaultLayout',
  computed: {
    ...mapStores(useGameStore)
  },
  methods: {
    restart() {
      // hard refresh page to /server-room
      window.location.href = '/server-room'
    }
  }
})
</script>

<style lang="scss">
.layout {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  a {
    font-size: 1rem;
    cursor: pointer;
  }
}
button span {
  padding: 10px 20px !important;
}
</style>
