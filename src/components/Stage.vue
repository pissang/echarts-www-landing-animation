<template>
  <div id="stage-viewport"></div>
</template>

<script lang="ts" setup>
import { ref, defineProps, onMounted, shallowRef } from 'vue';

import * as echarts from 'echarts';
import _scenes from './scenes/index';
import Scene from './scenes/Scene';
import type { ECharts } from 'echarts';

let scenes: Scene[] = _scenes;
const playIndex = ref(0);
const chart = shallowRef<ECharts | null | undefined>(null);

if (import.meta.hot) {
  import.meta.hot.accept('./scenes/index', newScenes => {
    scenes = newScenes;
    playCurrentScene();
  });
}

function setIndexToHash() {
  window.location.hash = 'scene_' + playIndex;
}
function getIndexFromHash() {
  let newIndex = +window.location.hash.substr(1).replace('scene_', '') || 0;
  if (newIndex !== playIndex.value) {
    playIndex.value = newIndex;
    playCurrentScene();
  }
}
function prevScene() {
  playIndex.value -= 1;
  if (playIndex.value === 0) {
    playIndex.value = scenes.length - 1;
  }
  playCurrentScene();
}
function nextScene() {
  playIndex.value = (playIndex.value + 1) % scenes.length;
  playCurrentScene();
}

function playCurrentScene() {
  scenes[playIndex.value].play(chart.value!);
  setIndexToHash();
}

onMounted(() => {
  // Init chart
  const main = document.querySelector<HTMLDivElement>('#stage-viewport')!;
  chart.value = echarts.init(main);
  window.onresize = function() {
    chart.value!.resize();
  };
  window.onhashchange = function() {
    getIndexFromHash();
  };

  getIndexFromHash();
  playCurrentScene();
});
</script>

<style scoped>
#stage-viewport {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
