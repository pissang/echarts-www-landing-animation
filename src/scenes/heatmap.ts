import { EChartsOption } from 'echarts';
import Scene from '../components/Scene';
import { seed, perlin2 } from './data/simplexNoise';

export const heatmapXData: number[] = [];
export const heatmapYData: number[] = [];
seed(Math.random());

function generateData() {
  const data = [];
  for (var i = 0; i <= 50; i++) {
    for (var j = 0; j <= 30; j++) {
      data.push([i, j, perlin2(i / 10, j / 5) + 0.5]);
    }
    heatmapXData.push(i);
  }
  for (var j = 0; j < 20; j++) {
    heatmapYData.push(j);
  }
  return data;
}
const data = generateData();

const dataList: number[][][] = [];

for (let n = 0; n < 10; n++) {
  const data = [];
  for (var i = 0; i <= 50; i++) {
    for (var j = 0; j <= 30; j++) {
      data.push([i, j, perlin2(i / 10 + n / 10, j / 5 - n / 10) + 0.5]);
    }
  }
  dataList.push(data);
}

export const heatmapNoiseData = dataList[dataList.length - 1];

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
        // opacity: [1, 0.5],
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
    },
    series: [
      {
        type: 'heatmap',
        data: data,
        animation: false,
        universalTransition: {
          seriesKey: 'second',
        },
        itemStyle: {
          color: '#fff',
        },
      },
    ],
  },

  ...dataList.map((data) => {
    return {
      series: {
        data,
      },
    };
  }),
];

export default new Scene({
  option,
  duration: 200,
  title: 'Heatmap',
  // dark: true,
  background: 'orange',
});
