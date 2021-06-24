import { EChartsOption } from 'echarts';
import Scene from './Scene';

const entryPie: EChartsOption = {
  legend: {
    top: '5%',
    left: 'center',
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: ['30%', '70%'],
      roseType: 'radius',
      itemStyle: {
        borderRadius: 10,
        borderColor: '#000',
        borderWidth: 5,
      },
      label: {
        show: false,
      },
      universalTransition: {
        enabled: true,
        seriesKey: 'pie',
      },
      data: [
        { value: 1000, name: 'First' },
        { value: 735, name: 'Second' },
        { value: 580, name: 'Third' },
        { value: 484, name: 'Fourth' },
        { value: 300, name: 'Fifth' },
      ],
    },
  ],
};

export default new Scene({ option: entryPie, duration: 1000 });
