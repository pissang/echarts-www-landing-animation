import { EChartsOption } from 'echarts';
import { defaultPalette } from './common/colorPalette';
import pieData from './data/pieData';
import Scene from '../Scene';

const bar: EChartsOption = {
  xAxis: {
    data: pieData.map((item) => item.name),
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      label: {
        show: false,
      },
      animationEasingUpdate: 'circularInOut',
      animationDurationUpdate: 1000,
      universalTransition: {
        enabled: true,
        seriesKey: 'first',
        delay: (idx, count) => {
          return count === 1 ? 0 : (1 - idx / count) * 2000;
        },
      },
      itemStyle: {},
      data: pieData.map((item, idx) => {
        return {
          value: item.value,
          groupId: item.name,
          itemStyle: {
            color: defaultPalette[idx % defaultPalette.length],
          },
        };
      }),
    },
  ],
};

export default new Scene({
  option: bar,
  title: 'Basic Bar Chart',
  duration: 3500,
});
