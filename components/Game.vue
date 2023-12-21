<template>
  <div>
    <h2>{{ character.name }}</h2>
    <p>Health: {{ character.health }}</p>
    <button @click="attack">Attack</button>
  </div>
  <GameController />
  <button @click="character.state.handle()">Idle</button>
  <button @click="character.state.handle()">Walk</button>
  <h1>Another component, same store {{ testStore.description }}</h1>
</template>

<script>
import { mapStores } from "pinia";
import { IdleState } from "~/states/IdleState";
import { GameController } from "~/mediator/GameMediator";

// https://vuejs.org/guide/extras/render-function.html
export default defineComponent({
  computed: {
    ...mapStores(useGameStore),
  },
  mounted() {
    console.log("Index page mounted", this);
  },
});
</script>
