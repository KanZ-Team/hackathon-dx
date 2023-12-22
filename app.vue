<template>
  <NuxtLayout name="default">
    <NuxtPage class="root" />
  </NuxtLayout>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  /* magic number to make it fit to the screen */
  font-size: 5vmax;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'VT323', monospace;
  width: 16rem;
  height: 9rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

h1 + button {
  margin-top: 0.5rem;
}

.game-area {
  border-radius: 0.5rem;
  border: 0.03rem solid white;
}
</style>
