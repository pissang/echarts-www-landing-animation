import type { EChartsOption } from 'echarts';
import pieData from './data/pieData';
import Scene from '../components/Scene';

const pieOption: EChartsOption[] = [
  {
    series: [
      {
        type: 'pie',
        center: ['50%', '50%'],
        radius: ['30%', '80%'],
        emphasis: {
          disabled: true,
        },
        label: {
          show: false,
        },
        itemStyle: {
          borderRadius: [0, 0],
          borderWidth: 0,
        },
        universalTransition: {
          enabled: true,
          seriesKey: 'point',
        },
        animationDurationUpdate: 1000,
        data: pieData,
      },
    ],
  },
];

export default new Scene({
  option: pieOption,
  file: 'pie',
  title: 'From a Basic Pie Chart',
  duration: 1500,
});
