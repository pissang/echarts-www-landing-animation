import type { EChartsOption } from 'echarts';
import pieData from './data/pieData';
import Scene, { GetOption } from '../components/Scene';

const pieDataItemStyles = [
  { borderRadius: [5, 20] },
  { borderRadius: [5, 18] },
  { borderRadius: [5, 16] },
  { borderRadius: [5, 14] },
  { borderRadius: [5, 12] },
  { borderRadius: [5, 10] },
  { borderRadius: [5, 8] },
  { borderRadius: [5, 6] },
];

const entryPieOptions: GetOption[] = [
  (chart, opts) => {
    return {
      series: [
        {
          type: 'pie',
          radius: ['20%', '100%'],
          center: ['50%', '50%'],
          roseType: 'radius',
          emphasis: {
            disabled: true,
          },
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
          // animationDuration: opts.initialPieAnimation ? 500 : 0
          animationDuration: 0,
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
  file: 'pieEntry',
  duration: 200,
});
