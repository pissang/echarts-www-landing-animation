<template>
  <div id="app-main">
    <Stage></Stage>
  </div>
</template>

<script lang="ts" setup>
import Stage from './components/Stage.vue';
</script>

<style scoped>
#app-main {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
