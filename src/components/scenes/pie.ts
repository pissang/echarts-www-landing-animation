import { EChartsOption } from 'echarts';
import pieData from './data/pieData';
import Scene from './Scene';

const pieOption: EChartsOption[] = [
  {
    series: [
      {
        type: 'pie',
        center: ['50%', '50%'],
        radius: ['30%', '80%'],
        label: {
          show: false,
        },
        itemStyle: {
          borderRadius: 0,
        },
        universalTransition: {
          enabled: true,
          seriesKey: 'first',
        },
        animationDurationUpdate: 1000,
        data: pieData,
      },
    ],
  },
];

export default new Scene({
  option: pieOption,
  title: 'Basic Pie Chart',
  duration: 1500,
});
