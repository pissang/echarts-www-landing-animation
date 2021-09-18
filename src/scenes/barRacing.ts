import { EChartsOption } from 'echarts';
import { defaultFont } from './common/style';
import Scene from '../components/Scene';
import * as covidData from './data/covidData';

const barRaceOptions: EChartsOption[] = [];
const len = 10;
for (var n = 50; n < 50 + len; n++) {
  const res: (string | number)[][] = [];
  const isFirst = n === 50;
  for (var j = 0; j < covidData.rawData[n].length; j++) {
    res.push([covidData.country[j], covidData.rawData[n][j]]);
  }

  if (isFirst) {
    res.sort((a, b) => +b[1] - +a[1]);
  }

  barRaceOptions.push({
    grid: {
      left: 120,
      top: 10,
      bottom: 30,
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
    visualMap: {
      show: false,
      min: 0,
      max: 50,
      inRange: {
        colorAlpha: [0.5, 1],
      },
    },
    yAxis: [
      {
        inverse: true,
        type: 'category',
        max: n === 50 ? undefined : 15,
        nameTextStyle: {
          // color: '#fff',
        },
        animationDurationUpdate: 200,
        animationEasingUpdate: 'cubicOut',
        axisTick: {
          show: false,
        },
        axisLabel: {
          fontSize: 14,
          // color: '#fff',
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
          borderRadius: 2,
          // color: 'rgba(255, 255, 255, 0.6)',
        },
        realtimeSort: true,
        barWidth: '70%',
        animationDurationUpdate: 1000,
        animationEasingUpdate: isFirst ? 'cubicInOut' : 'linear',
        universalTransition: true,
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
  duration: [2000, 1000],
  title: 'Racing Bar Chart',
  // background: 'linear-gradient(to top, #f77062 0%, #fe5196 100%)',
  // dark: true,
  titleStyle: 'right: 30px; left:auto',
});
