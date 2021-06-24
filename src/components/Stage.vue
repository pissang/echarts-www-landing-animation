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

// if (import.meta.hot) {
//   import.meta.hot.accept('./scenes/index', newScenes => {
//     scenes.value = newScenes.default;
//   });
// }

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
  scenes.value[playIndex.value].play(chart.value!);
  setIndexToHash();
}

onMounted(() => {
  // Init chart
  chart.value = echarts.init(containerRef.value!);
  window.onresize = function() {
    chart.value!.resize();
  };
  window.onhashchange = function() {
    getIndexFromHash();
  };

  // getIndexFromHash();
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
  width: 10px;
  height: 10px;
  background-color: black;
  opacity: 0.5;

  @apply rounded-full w-3 h-3 ml-2 mr-2;
  @apply cursor-pointer;
}

#timeline .checkpoint.current {
  @apply scale-150;
}
</style>
