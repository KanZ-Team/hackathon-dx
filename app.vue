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
  font-size: 6vw;
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
}
</style>
