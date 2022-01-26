import type { EChartsOption } from 'echarts';
import { registerMap, use } from 'echarts/core';
import Scene from '../components/Scene';
import worldGeoJSON from './data/world.json';
import windsData from './data/windsData';
// @ts-ignore
import { FlowGLChart } from 'echarts-gl/charts';
use([FlowGLChart]);

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
    type: 'flowGL',
    coordinateSystem: 'geo',
    data: windsData.data,
    supersampling: 2,
    particleType: 'line',
    particleDensity: 256,
    particleSpeed: 1,
    // TODO Better guess?
    gridWidth: windsData.nx,
    itemStyle: {
      opacity: 0.7,
    },
  } as any,
};

export default new Scene({
  file: 'flow',
  title: 'And Flow It',
  option,
  duration: 8000,
  dark: true,
  background: '#001122',
});
