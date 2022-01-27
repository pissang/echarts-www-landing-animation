<template>
  <div
    id="stage-main"
    :class="currentScene?.isDark() ? 'dark' : ''"
    :style="{
      background: (currentScene && currentScene.getBackground()) || 'none',
    }"
  >
    <div id="stage-viewport" ref="containerRef"></div>
    <div id="timeline">
      <div id="checkpoints">
        <div
          v-for="idx in sceneIndices"
          :class="['checkpoint', idx === playIndex ? 'current' : '']"
          :key="idx"
          @click="playIndex = idx"
        ></div>
      </div>
    </div>
    <div id="auto-play-control" @click="paused = !paused">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
        v-if="paused"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
          clip-rule="evenodd"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
        v-else
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
    <div id="stage-title" :style="currentScene?.getTitleStyle() || ''">
      {{ currentScene?.getTitle() || '' }}
      <a
        class="code"
        title="Go to source code"
        :href="`https://stackblitz.com/github/pissang/echarts-www-landing-animation?file=src/scenes/${currentScene?.getFile()}.ts`"
        target="_blank"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, shallowRef, watch, onUnmounted } from 'vue';
import { useUrlSearchParams } from '@vueuse/core';

import { init } from 'echarts/core';
import definedScenes from '../scenes/index';
import Scene from './Scene';
import type { ECharts } from 'echarts';
import { pause } from '../main';
import { addListener, removeListener } from 'resize-detector';

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

const scenes = shallowRef<Scene[]>(definedScenes);
const sceneIndices = ref(scenes.value.map((scene, idx) => idx));

const playIndex = ref(-1);
const chart = shallowRef<ECharts | null | undefined>(null);
const containerRef = ref<HTMLElement | null | undefined>(null);
const paused = ref(false);
const havingResizeDuringPause = ref(false);

const currentScene = ref<Scene | null>(null);

const urlParams =
  useUrlSearchParams<{ scene: string; autoplay: string }>('history');

function setIndexToHash() {
  urlParams.scene = playIndex.value + '';
}
function getIndexFromHash() {
  let newIndex = +(urlParams.scene || 0);
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
  currentScene.value = scenes.value[playIndex.value];
});

watch(currentScene, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    oldVal?.stop(chart.value!);
  }
  playCurrentScene(true);
});

function playCurrentScene(reset: boolean) {
  if (!chart.value) {
    return;
  }
  if (!currentScene.value) {
    return;
  }

  if (reset) {
    currentScene.value.reset();
  }

  currentScene.value.play(
    chart.value!,
    {
      initialPieLayout: props.initialPieLayout,
      initialPieAnimation: props.initialPieAnimation,
    },
    () => {
      // Only disable autoplay when it's set false
      if (urlParams.autoplay !== 'false') {
        nextScene();
      }
    }
  );

  if (props.updateURLHash) {
    setIndexToHash();
  }
}

watch(paused, (val) => {
  if (!chart.value) {
    return;
  }
  val
    ? chart.value.getZr().animation.pause()
    : chart.value.getZr().animation.resume();

  if (!val && havingResizeDuringPause.value) {
    havingResizeDuringPause.value = false;
    doResize();
  }
});

function doResize() {
  chart.value?.resize();
  // Replay current scene.
  chart.value?.clear();
  playCurrentScene(true);
}

function onContainerResize() {
  if (paused.value) {
    havingResizeDuringPause.value = true;
  } else {
    doResize();
  }
}

onMounted(() => {
  // Init chart
  chart.value = init(containerRef.value as any, undefined, {
    useDirtyRect: true,
  }) as any;

  // TODO
  // containerRef.value may have 0 height sometimes on the gh-pages. Not know why yet.
  addListener(containerRef.value!, onContainerResize);

  watch(urlParams, () => {
    getIndexFromHash();
  });

  getIndexFromHash();
});

onUnmounted(() => {
  currentScene.value?.stop(chart.value!);
  chart.value?.dispose();

  removeListener(containerRef.value!, onContainerResize);
});

defineExpose({
  pause() {
    paused.value = true;
  },
  resume() {
    paused.value = false;
  },
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@700&display=swap');

#stage-main {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  transition: linear 200ms background;
  user-select: none;

  color: #111;
}

#stage-viewport {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
}

#stage-title {
  position: absolute;
  left: 20px;
  bottom: 30px;
  font-size: 30px;

  transition: linear 200ms color;

  z-index: 1;
  font-family: 'Open Sans Condensed', sans-serif;
}

#stage-title .code {
  display: inline-block;
  width: 30px;
  height: 35px;
  vertical-align: middle;
  border-radius: 5px;
  color: #5470c6;
  transition: 0.2s linear all;
}

#stage-title .code:hover {
  background: #5470c6;
  color: #fff;
}

#stage-main.dark #stage-title {
  color: #fff;
}

#stage-main.dark #stage-title .code {
  color: #4992ff;
}

#stage-main.dark #stage-title .code:hover {
  background-color: #4992ff;
  color: #fff;
}

#timeline {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30px;
}

#checkpoints {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}
#timeline .checkpoint {
  background-color: black;
  opacity: 0.5;

  width: 8px;
  height: 8px;
  border-radius: 100%;
  margin-left: 4px;
  margin-right: 4px;
  cursor: pointer;
  transition: 100ms linear transform;
}
#stage-main.dark #timeline .checkpoint {
  background-color: #fff;
}

#timeline .checkpoint.current,
#timeline .checkpoint.current:hover {
  transform: scale(1.5);
}
#timeline .checkpoint:hover {
  transform: scale(1.2);
}

#auto-play-control {
  position: absolute;
  cursor: pointer;
  z-index: 1000;
  right: 20px;
  bottom: 15px;
  width: 35px;
  height: 35px;
}

#stage-main.dark #auto-play-control {
  color: #fff;
}
</style>
