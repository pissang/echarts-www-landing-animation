import { EChartsOption } from 'echarts';
import Scene from '../components/Scene';
import { defaultColorPalette2, defaultFont } from './common/style';
import data from './data/echarts-package-size.json';

const option: EChartsOption = {
  color: defaultColorPalette2,
  series: [
    {
      type: 'treemap',
      left: 10,
      top: 10,
      bottom: 10,
      right: 10,
      animationDurationUpdate: 1000,
      animationThreshold: 3000,
      roam: false,
      nodeClick: undefined,
      data: data.children,
      leafDepth: 2,
      label: {
        show: true,
        fontFamily: defaultFont,
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
  duration: 3000,
  background: 'purple',
});
