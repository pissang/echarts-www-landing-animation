import type { EChartsOption } from 'echarts';
import { defaultColorPalette, defaultFont } from './common/style';
import pieData from './data/pieData';
import Scene from '../components/Scene';

const bar: EChartsOption = {
  xAxis: {
    data: pieData.map((item) => item.name),
  },
  yAxis: {},
  textStyle: {
    fontFamily: defaultFont,
  },
  series: [
    {
      type: 'bar',
      label: {
        show: false,
      },
      animationEasingUpdate: 'circularInOut',
      animationDurationUpdate: 800,
      universalTransition: {
        enabled: true,
        seriesKey: 'point',
        delay: (idx, count) => {
          // return count === 1 ? 0 : (1 - idx / count) * 1000;
          return Math.random() * 1000;
        },
      },
      itemStyle: {},
      data: pieData.map((item, idx) => {
        return {
          value: item.value,
          groupId: item.name,
          itemStyle: {
            color: defaultColorPalette[idx % defaultColorPalette.length],
          },
        };
      }),
    },
  ],
};

export default new Scene({
  option: bar,
  file: 'bar',
  title: 'Basic Bar Chart',
  // titleStyle: 'right:10px;top:20px;left:auto;bottom:auto;',
  duration: 2500,
});
