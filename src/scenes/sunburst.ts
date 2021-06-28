import { EChartsOption } from 'echarts';
import Scene from '../components/Scene';
import { defaultColorPalette2, defaultFont } from './common/style';
// import data from './data/obama-budget.json';
import data from './data/echarts-package-size.json';

const option: EChartsOption = {
  title: {
    text: 'ECHARTS',
    left: 'center',
    top: 'center',
    textStyle: {
      fontSize: 25,
      fontFamily: defaultFont,
    },
  },
  color: defaultColorPalette2,
  series: [
    {
      type: 'sunburst',
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
        borderColor: 'rgba(255,255,255,.5)',
      },
      levels: [
        {},
        {
          itemStyle: {
            borderRadius: [5, 0],
          },
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
};

export default new Scene({
  title: 'Sunburst',
  option,
  duration: 3000,
});
