import { createI18n } from 'vue-i18n';

import App from './App.vue';
import { createApp } from 'vue';
import { use, registerMap } from 'echarts/core';
import {
  BarChart,
  CustomChart,
  EffectScatterChart,
  GaugeChart,
  HeatmapChart,
  LineChart,
  MapChart,
  PieChart,
  ScatterChart,
  SunburstChart,
  TreemapChart,
} from 'echarts/charts';

import {
  CalendarComponent,
  DatasetComponent,
  GridComponent,
  LegendComponent,
  PolarComponent,
  TitleComponent,
  TransformComponent,
  VisualMapComponent,
  GraphicComponent,
} from 'echarts/components';

import { CanvasRenderer } from 'echarts/renderers';

import { UniversalTransition } from 'echarts/features';
import { APIOpts, defaultApiOpts } from './apiOpts';

import usaJson from './scenes/data/usa.json';

use([
  BarChart,
  LineChart,
  CustomChart,
  PieChart,
  ScatterChart,
  EffectScatterChart,
  GaugeChart,
  TreemapChart,
  SunburstChart,
  MapChart,
  HeatmapChart,

  DatasetComponent,
  TransformComponent,
  PolarComponent,
  CalendarComponent,
  GridComponent,
  VisualMapComponent,
  TitleComponent,
  LegendComponent,
  GraphicComponent,

  CanvasRenderer,
  UniversalTransition,
]);

registerMap('usa', usaJson as any, {
  Alaska: {
    // 把阿拉斯加移到美国主大陆左下方
    left: -131,
    top: 25,
    width: 15,
  },
  Hawaii: {
    left: -110, // 夏威夷
    top: 28,
    width: 5,
  },
  'Puerto Rico': {
    // 波多黎各
    left: -76,
    top: 26,
    width: 2,
  },
});

// @ts-ignore
const locale: string = window.ECHARTS_WEBSITE_LANGUAGE;

if (typeof locale === 'undefined') {
  // console.error("Can't find environment variable ECHARTS_WEBSITE_LANGUAGE");
}

let appVm: any;
export function init(dom: HTMLElement, opts?: APIOpts) {
  const i18n = createI18n({
    locale,
    messages: {},
  });

  const newOpts: APIOpts = {};
  Object.assign(newOpts, defaultApiOpts, opts);

  const app = createApp(App, newOpts as any);
  app.use(i18n);
  appVm = app.mount(dom);
}

export function pause() {
  appVm && appVm.pause();
}

export function resume() {
  appVm && appVm.resume();
}

export function dispose(dom: HTMLElement) {}
