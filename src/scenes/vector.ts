import type { EChartsOption } from 'echarts';
import { registerMap } from 'echarts/core';
import Scene from '../components/Scene';
import worldGeoJSON from './data/world.json';
import windsData from './data/windsData';

registerMap('world', worldGeoJSON as any);

const option: EChartsOption = {
  visualMap: {
    show: false,
    left: 'center',
    top: 0,
    min: windsData.min,
    max: windsData.max,
    dimension: 4,
    inRange: {
      color: [
        '#313695',
        '#4575b4',
        '#74add1',
        '#abd9e9',
        '#e0f3f8',
        '#ffffbf',
        '#fee090',
        '#fdae61',
        '#f46d43',
        '#d73027',
        '#a50026',
      ],
    },
    textStyle: {
      color: '#fff',
    },
    orient: 'horizontal',
  },
  geo: {
    map: 'world',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    silent: true,
    itemStyle: {
      areaColor: 'rgba(0,0,0,0.1)',
      borderColor: 'rgba(0,0,0,0.2)',
    },
  },
  series: {
    type: 'custom',
    coordinateSystem: 'geo',
    data: windsData.data,
    encode: {
      x: 0,
      y: 0,
    },
    silent: true,
    renderItem: function (params, api) {
      const x = api.value(0) as number;
      const y = api.value(1) as number;
      const dx = api.value(2) as number;
      const dy = api.value(3) as number;
      var start = api.coord([
        Math.max(x - dx / 5, -180),
        Math.max(y - dy / 5, -90),
      ]);
      var end = api.coord([
        Math.min(x + dx / 5, 180),
        Math.min(y + dy / 5, 90),
      ]);
      return {
        type: 'line',
        shape: {
          x1: start[0],
          y1: start[1],
          x2: end[0],
          y2: end[1],
          percent: 1,
        },
        style: {
          lineWidth: 0.5,
          stroke: api.visual('color'),
        },
      };
    },
    progressive: 2000,
  },
};

export default new Scene({
  file: 'vector',
  title: 'Visualize Vector Data',
  option,
  duration: 2000,
  dark: true,
  background: '#001122',
});
