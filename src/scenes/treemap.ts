import type { ECharts, EChartsOption } from 'echarts';
import Scene, { GetOption } from '../components/Scene';
import { defaultColorPalette2, defaultFont } from './common/style';
import data from './data/echarts-package-size.json';

const option: (EChartsOption | GetOption)[] = [
  {
    color: defaultColorPalette2,
    series: [
      {
        type: 'treemap',
        name: 'echarts',
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
  },
  (chart: ECharts) => {
    chart.dispatchAction({
      type: 'treemapZoomToNode',
      targetNode: 'component/parallel.ts',
    });
  },
  (chart: ECharts) => {
    chart.dispatchAction({
      type: 'treemapZoomToNode',
      targetNode: 'echarts',
    });
  },
];

export default new Scene({
  file: 'treemap',
  title: 'Treemap',
  option,
  duration: [2000, 2000, 2000],
  background: '#001122',
});
