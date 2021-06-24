import { EChartsOption } from 'echarts';
import pieData from './common/pieData';
import Scene from './Scene';

const entryPieOptions: EChartsOption[] = [
  {
    series: [
      {
        name: '访问来源',
        type: 'pie',
        center: ['70%', '50%'],
        radius: ['10%', '70%'],
        roseType: 'radius',
        label: {
          show: false
        },
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 5
        },
        universalTransition: {
          enabled: true,
          seriesKey: 'first'
        },
        animationDurationUpdate: 1000,
        data: pieData
      }
    ]
  },

  {
    series: {
      roseType: undefined,
      radius: ['30%', '90%'],
      center: ['50%', '50%'],
      animationDurationUpdate: 500,
      itemStyle: {
        borderRadius: 0,
        borderWidth: 0
      }
    }
  }
];

export default new Scene({
  option: entryPieOptions,
  duration: [1500, 700]
});
