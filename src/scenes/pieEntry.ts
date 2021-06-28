import { EChartsOption } from 'echarts';
import pieData from './data/pieData';
import Scene from '../components/Scene';

const entryPieOptions: EChartsOption[] = [
  {
    series: [
      {
        type: 'pie',
        center: ['70%', '50%'],
        radius: ['10%', '70%'],
        roseType: 'radius',
        label: {
          show: false,
        },
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 5,
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
  option: entryPieOptions,
  duration: 1500,
});
