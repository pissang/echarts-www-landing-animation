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

export function init(
  dom: HTMLElement,
  opts?: {
    initialPieLayout?: {
      left: number;
      top: number;
      width: number;
      height: number;
    };
  }
) {
  const i18n = createI18n({
    locale,
    messages: {},
  });

  const app = createApp(App);
  app.use(i18n);

  app.mount(dom);
}

export function pause() {}

export function resume() {}

export function dispose(dom: HTMLElement) {}
