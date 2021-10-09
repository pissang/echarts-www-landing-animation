import { createI18n } from 'vue-i18n';

import App from './App.vue';
import { createApp } from 'vue';
import { use } from 'echarts/core';
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
} from 'echarts/components';

import { CanvasRenderer } from 'echarts/renderers';

import { UniversalTransition } from 'echarts/features';
import { APIOpts, defaultApiOpts } from './apiOpts';

// @ts-ignore
const locale: string = window.ECHARTS_WEBSITE_LANGUAGE;

if (typeof locale === 'undefined') {
  // console.error("Can't find environment variable ECHARTS_WEBSITE_LANGUAGE");
}

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

  CanvasRenderer,
  UniversalTransition,
]);

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
