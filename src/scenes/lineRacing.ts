import type {
  DatasetComponentOption,
  LineSeriesOption,
  EChartsOption,
} from 'echarts';

import lineRacingData from './data/life-expectancy-table.json';
import Scene from '../components/Scene';
import { darkColorPalette, defaultFont } from './common/style';

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
      color: '#000',
      padding: 3,
      backgroundColor: 'rgba(255,255,255,0.8)',
      borderRadius: 3,
      formatter: function (params) {
        return (
          (params.value as unknown[])[3] + ': ' + (params.value as unknown[])[0]
        );
      },
    },
    // lineStyle: {
    //   color: 'rgba(255, 255, 255, 0.6)',
    // },
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
  color: darkColorPalette,
  dataset: [
    {
      id: 'dataset_raw',
      source: lineRacingData,
    } as DatasetComponentOption,
  ].concat(datasetWithFilters),
  textStyle: {
    fontFamily: defaultFont,
  },
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
  file: 'lineRacing',
  title: 'Racing Line Chart',
  // background: 'linear-gradient(to top, #f77062 0%, #fe5196 100%)',
  background: '#001122',
  titleStyle: 'right: 20px; top: 10px; left: auto;',
  dark: true,
  duration: 5000,
});
