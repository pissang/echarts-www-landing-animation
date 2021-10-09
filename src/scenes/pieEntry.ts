import type { EChartsOption } from 'echarts';
import pieData from './data/pieData';
import Scene, { GetOption } from '../components/Scene';

const pieDataItemStyles = [
  { borderRadius: [0, 20] },
  { borderRadius: [0, 18] },
  { borderRadius: [0, 16] },
  { borderRadius: [0, 14] },
  { borderRadius: [0, 12] },
  { borderRadius: [0, 10] },
  { borderRadius: [0, 8] },
  { borderRadius: [0, 6] },
];

const entryPieOptions: GetOption[] = [
  (chart, opts) => {
    console.log(opts);
    return {
      series: [
        {
          type: 'pie',
          radius: ['10%', '100%'],
          center: ['50%', '50%'],
          roseType: 'radius',
          ...opts?.initialPieLayout,
          label: {
            show: false,
          },
          itemStyle: {
            borderColor: 'white',
            borderWidth: 4,
          },
          labelLine: {
            show: false,
          },
          animationType: 'scale',
          animationDuration: 500,
          animationEasing: 'cubicOut',
          animationDelay(idx) {
            return (1 - idx / 8) * 500;
          },
          universalTransition: {
            enabled: true,
            seriesKey: 'point',
          },
          data: pieData.map((dataItem, idx) => {
            return {
              ...dataItem,
              itemStyle: pieDataItemStyles[idx],
            };
          }),
        },
      ],
    };
  },
];

export default new Scene({
  option: entryPieOptions,
  duration: 1500,
});
