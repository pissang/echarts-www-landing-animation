import {
  DatasetComponentOption,
  LineSeriesOption,
  EChartsOption,
} from 'echarts';

import lineRacingData from './data/life-expectancy-table.json';
import Scene from '../Scene';

// var countries = ['Australia', 'Canada', 'China', 'Cuba', 'Finland', 'France', 'Germany', 'Iceland', 'India', 'Japan', 'North Korea', 'South Korea', 'New Zealand', 'Norway', 'Poland', 'Russia', 'Turkey', 'United Kingdom', 'United States'];
var countries = [
  'Finland',
  'France',
  'Germany',
  'Iceland',
  'Norway',
  'Poland',
  'Russia',
  'United Kingdom',
];
const datasetWithFilters: DatasetComponentOption[] = [];
const seriesList: LineSeriesOption[] = [];
countries.forEach(function (country) {
  var datasetId = 'dataset_' + country;
  datasetWithFilters.push({
    id: datasetId,
    fromDatasetId: 'dataset_raw',
    transform: {
      type: 'filter',
      config: {
        and: [
          { dimension: 'Year', gte: 1950 },
          { dimension: 'Country', '=': country },
        ],
      },
    },
  });
  seriesList.push({
    type: 'line',
    datasetId: datasetId,
    showSymbol: false,
    name: country,
    endLabel: {
      show: true,
      color: 'rgba(255, 255, 255, 0.6)',
      formatter: function (params) {
        return params.value[3] + ': ' + params.value[0];
      },
    },
    lineStyle: {
      color: 'rgba(255, 255, 255, 0.6)',
    },
    labelLayout: {
      moveOverlap: 'shiftY',
    },
    emphasis: {
      focus: 'series',
    },
    encode: {
      x: 'Year',
      y: 'Income',
      label: ['Country', 'Income'],
      itemName: 'Year',
      tooltip: ['Income'],
    },
  });
});

const option: EChartsOption = {
  animationDuration: 5000,
  dataset: [
    {
      id: 'dataset_raw',
      source: lineRacingData,
    } as DatasetComponentOption,
  ].concat(datasetWithFilters),
  xAxis: {
    type: 'category',
    nameLocation: 'middle',
    axisLine: {
      lineStyle: {
        color: '#eee',
      },
    },
  },
  yAxis: {
    name: 'Income',
    axisLine: {
      lineStyle: {
        color: '#eee',
      },
    },
    splitLine: {
      lineStyle: {
        opacity: 0.3,
      },
    },
  },
  grid: {
    right: 140,
  },
  series: seriesList,
};
export default new Scene({
  option,
  title: 'Racing Line Chart',
  background: 'orange',
  duration: 5000,
});
