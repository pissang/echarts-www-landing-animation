import { EChartsOption } from 'echarts';
import { darkColorPalette, defaultColorPalette } from './common/style';
import pieData from './data/pieData';
import Scene from '../components/Scene';

const barPolar: EChartsOption = {
  angleAxis: {
    axisLine: {
      lineStyle: {
        color: '#333',
      },
    },
    data: pieData.map((item) => item.name),
  },
  radiusAxis: {
    show: false,
  },
  polar: {
    radius: ['20%', '70%'],
  },
  series: [
    {
      type: 'bar',
      coordinateSystem: 'polar',
      id: 'new',
      label: {
        show: false,
      },
      animationDurationUpdate: 1000,
      universalTransition: {
        enabled: true,
        seriesKey: 'point',
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
  option: barPolar,
  duration: 1500,
  title: 'Polar Bar Chart',
  background: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
});
