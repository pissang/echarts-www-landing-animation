<template>
  <div id="stage-viewport" ref="containerRef"></div>
  <div id="timeline">
    <div id="checkpoints">
      <div
        v-for="idx in sceneIndices"
        :class="['checkpoint', idx === playIndex ? 'current' : '']"
        @click="playIndex = idx"
      ></div>
    </div>
    <div id="stage-title">
      {{ (currentScene && currentScene.getTitle()) || '' }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, shallowRef, watch } from 'vue';

import * as echarts from 'echarts';
import definedScenes from './scenes/index';
import Scene from './scenes/Scene';
import type { ECharts } from 'echarts';

const scenes = shallowRef<Scene[]>(definedScenes);
const sceneIndices = ref(scenes.value.map((scene, idx) => idx));

const playIndex = ref(0);
const chart = shallowRef<ECharts | null | undefined>(null);
const containerRef = ref<HTMLElement | null | undefined>(null);

const currentScene = ref<Scene | null>(null);

function setIndexToHash() {
  window.location.hash = 'scene_' + playIndex.value;
}
function getIndexFromHash() {
  let newIndex = +window.location.hash.substr(1).replace('scene_', '') || 0;
  if (newIndex !== playIndex.value) {
    playIndex.value = newIndex;
  }
}
function prevScene() {
  playIndex.value -= 1;
  if (playIndex.value === 0) {
    playIndex.value = scenes.value.length - 1;
  }
}
function nextScene() {
  playIndex.value = (playIndex.value + 1) % scenes.value.length;
}

watch([scenes, playIndex], () => {
  playCurrentScene();
});

function playCurrentScene() {
  if (currentScene.value) {
    currentScene.value.stop();
  }
  currentScene.value = scenes.value[playIndex.value];
  currentScene.value.play(chart.value!, containerRef.value!);
  setIndexToHash();
}

onMounted(() => {
  // Init chart
  chart.value = echarts.init(containerRef.value!);
  window.onresize = function () {
    chart.value!.resize();
  };
  window.onhashchange = function () {
    getIndexFromHash();
  };

  getIndexFromHash();
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Oswald&display=swap');

#stage-viewport {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  transition: linear 200ms background;
}

#stage-title {
  position: absolute;
  left: 20px;
  bottom: 30px;
  font-size: 30px;

  transition: linear 200ms color;

  z-index: 1000;
  font-family: 'Oswald', sans-serif;
}

#timeline {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30px;
}

#checkpoints {
  @apply flex justify-center;
  width: 100%;
  height: 100%;
}
#timeline .checkpoint {
  background-color: black;
  opacity: 0.5;

  @apply rounded-full w-2 h-2 ml-2 mr-2;
  @apply cursor-pointer;
  @apply transition-transform;
}

#timeline .checkpoint.current,
#timeline .checkpoint.current:hover {
  transform: scale(1.5);
}
#timeline .checkpoint:hover {
  transform: scale(1.2);
}
</style>
