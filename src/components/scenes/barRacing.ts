import { EChartsOption } from 'echarts';
import {
  darkColorPalette,
  defaultColorPalette,
  defaultFont,
} from './common/style';
import Scene from '../Scene';
import * as covidData from './data/covidData';

const barRaceOptions: EChartsOption[] = [];

for (var n = 50; n < covidData.days.length; n++) {
  var res = [];
  for (var j = 0; j < covidData.rawData[n].length; j++) {
    res.push([covidData.country[j], covidData.rawData[n][j]]);
  }

  barRaceOptions.push({
    grid: {
      left: 100,
      top: 10,
    },
    textStyle: {
      fontFamily: defaultFont,
    },
    dataset: {
      source: res,
    },
    xAxis: {
      show: false,
    },
    yAxis: [
      {
        inverse: true,
        type: 'category',
        max: 15,
        nameTextStyle: {
          color: '#fff',
        },
        animationDurationUpdate: 200,
        animationEasingUpdate: 'cubicOut',
        axisTick: {
          show: false,
        },
        axisLabel: {
          fontSize: 14,
          color: '#fff',
          interval: 0,
        },
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
    ],
    series: [
      {
        type: 'bar',
        datasetIndex: 0,
        encode: {
          x: 1,
          y: 0,
        },
        itemStyle: {
          color: 'rgba(255, 255, 255, 0.6)',
        },
        realtimeSort: true,
        barWidth: '70%',
        animationDurationUpdate: 1000,
        animationEasingUpdate: 'linear',
        label: {
          valueAnimation: true,
          show: true,
          fontSize: 14,
          position: 'right',
          color: 'inherit',
          formatter: '{@[1]}',
        },
      },
    ],
  });
}

export default new Scene({
  option: barRaceOptions,
  duration: 1000,
  title: 'Racing Bar Chart',
  background: 'orange',
});
