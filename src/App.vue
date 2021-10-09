<template>
  <div id="app-main">
    <Stage v-bind="props" ref="stage"></Stage>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Stage from './components/Stage.vue';

const stage = ref<any>(null);
// TODO defineProps only support literal type
const props = defineProps<{
  updateURLHash?: boolean;
  initialPieAnimation?: boolean;
  initialPieLayout?: {
    left: number | string;
    top: number | string;
    width: number | string;
    height: number | string;
  };
}>();

defineExpose({
  pause() {
    stage.value?.pause();
  },
  resume() {
    stage.value?.resume();
  },
});
</script>

<style scoped>
#app-main {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
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
