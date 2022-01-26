import type { ECharts, EChartsOption } from 'echarts';
import Scene, { GetOption } from '../components/Scene';
import { defaultColorPalette2, defaultFont } from './common/style';
// import data from './data/obama-budget.json';
import data from './data/echarts-package-size.json';

const option: (EChartsOption | GetOption)[] = [
  {
    // tooltip: {},
    title: {
      text: 'ECHARTS',
      left: 'center',
      top: 'center',
      textStyle: {
        fontSize: 25,
        fontFamily: defaultFont,
        color: '#fff',
      },
    },
    color: defaultColorPalette2,
    series: [
      {
        type: 'sunburst',
        name: 'echarts',
        radius: ['20%', '90%'],
        animationDurationUpdate: 1000,
        animationThreshold: 3000,
        // nodeClick: undefined,
        data: data.children,
        minAngle: 1,
        label: {
          show: false,
          fontFamily: defaultFont,
        },
        universalTransition: {
          enabled: true,
          seriesKey: 'hierarchy',
        },
        itemStyle: {
          borderWidth: 0.5,
          borderColor: 'rgba(0,0,0,.5)',
        },
        levels: [
          {},
          {
            // itemStyle: {
            //   borderRadius: [5, 0],
            // },
            label: {
              show: true,
              minAngle: 10,
            },
            emphasis: {
              label: {
                show: true,
              },
            },
          },
        ],
      },
    ],
  },
  (chart: ECharts) => {
    chart.setOption({
      title: {
        text: 'ZRENDER',
      },
    });
    chart.dispatchAction({
      type: 'sunburstRootToNode',
      targetNode: 'zrender',
    });
  },
  // (chart: ECharts) => {
  //   chart.dispatchAction({
  //     type: 'sunburstRootToNode',
  //     targetNode: 'graphic',
  //   });
  // },
  (chart: ECharts) => {
    chart.setOption({
      title: {
        text: 'ECHARTS',
      },
    });
    chart.dispatchAction({
      type: 'sunburstRootToNode',
      targetNode: 'echarts',
      direction: 'rollUp',
    });
  },
];

export default new Scene({
  file: 'sunburst',
  title: 'Sunburst',
  option,
  dark: true,
  duration: [3000, 2000, 2000],
  background: '#001122',
});
