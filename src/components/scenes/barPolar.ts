import { EChartsOption } from 'echarts';
import { darkPalette, defaultPalette } from './common/colorPalette';
import pieData from './common/pieData';
import Scene from './Scene';

const barPolar: EChartsOption = {
  angleAxis: {
    axisLine: {
      lineStyle: {
        color: '#333'
      }
    },
    data: pieData.map(item => item.name)
  },
  radiusAxis: {
    show: false
  },
  polar: {
    radius: ['20%', '70%']
  },
  series: [
    {
      type: 'bar',
      coordinateSystem: 'polar',
      id: 'new',
      label: {
        show: false
      },
      animationDurationUpdate: 1000,
      universalTransition: {
        enabled: true,
        seriesKey: 'first'
      },
      itemStyle: {},
      data: pieData.map((item, idx) => {
        return {
          value: item.value,
          groupId: item.name,
          itemStyle: {
            color: defaultPalette[idx % defaultPalette.length]
          }
        };
      })
    }
  ]
};

export default new Scene({
  option: barPolar,
  duration: 1500,
  title: 'Polar Bar Chart',
  background: 'orange'
});
