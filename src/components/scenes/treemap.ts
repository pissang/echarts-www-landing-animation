import { EChartsOption } from 'echarts';
import Scene from '../Scene';
import { defaultColorPalette2, defaultFont } from './common/style';
import data from './data/obama-budget.json';

const option: EChartsOption = {
  color: defaultColorPalette2,
  series: [
    {
      name: 'option',
      type: 'treemap',
      left: 10,
      top: 10,
      bottom: 10,
      right: 10,
      animationDurationUpdate: 1000,
      roam: false,
      nodeClick: undefined,
      data: data,
      label: {
        show: true,
        fontFamily: defaultFont,
      },
      itemStyle: {
        borderWidth: 0.3,
        borderColor: 'rgba(255,255,255,0.5)',
      },
      universalTransition: {
        enabled: true,
        seriesKey: 'hierarchy',
      },
      breadcrumb: {
        show: false,
      },
    },
  ],
};

export default new Scene({
  title: 'Treemap',
  option,
  duration: 2000,
  background: 'purple',
});
