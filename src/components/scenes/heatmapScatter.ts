import { EChartsOption } from 'echarts';
import Scene from '../Scene';
import { heatmapXData, heatmapYData, heatmapNoiseData } from './heatmap';

const option: EChartsOption[] = [
  {
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    xAxis: {
      show: false,
      type: 'category',
      data: heatmapXData,
    },
    yAxis: {
      show: false,
      type: 'category',
      data: heatmapYData,
    },
    visualMap: {
      show: false,
      min: 0,
      max: 1,
      inRange: {
        symbolSize: [5, 20],
      },
    },
    series: [
      {
        type: 'scatter',
        data: heatmapNoiseData,
        symbol: 'roundRect',
        universalTransition: {
          enabled: true,
          seriesKey: 'second',
        },
        itemStyle: {
          color: 'orange',
          opacity: 0.9,
        },
      },
    ],
  },

  {
    series: [
      {
        type: 'scatter',
        symbol: 'circle',
      },
    ],
  },

  {
    series: [
      {
        type: 'scatter',
        symbol: 'diamond',
      },
    ],
  },
];

export default new Scene({
  option,
  duration: 800,
  title: 'Scatter Shapes',
  dark: true,
  background: 'purple',
});
