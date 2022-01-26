import { EChartsType } from 'echarts/core';
import Scene, { GetOption } from '../components/Scene';
import logoSVG from './data/logo.svg';

export function getEndingFontSize(chart: Pick<EChartsType, 'getWidth'>) {
  return Math.round(chart.getWidth() / 15);
}

const option: GetOption[] = [
  (chart) => {
    const size = getEndingFontSize(chart) * 1.2;
    return {
      graphic: {
        elements: [
          {
            type: 'image',
            style: {
              image: logoSVG,
              x: -size / 2,
              y: -size / 2,
              width: size,
              height: size,
            },
            x: chart.getWidth() / 2 - getEndingFontSize(chart) * 5.5,
            y: chart.getHeight() / 2,
            enterAnimation: {
              easing: 'cubicOut',
              duration: 1000,
            },
            enterFrom: {
              x: chart.getWidth() / 2,
            },
          },
          {
            type: 'text',
            left: 'center',
            top: 'center',
            style: {
              text: 'Apache ECharts',
              fontSize: size,
              fontWeight: 'bold',
              lineDash: [0, 200],
              lineDashOffset: 0,
              fill: 'transparent',
              stroke: '#000',
              lineWidth: 1,
              fontFamily: `'Open Sans', 'Open Sans Condensed', sans-serif`,
            },
            keyframeAnimation: {
              duration: 2000,
              delay: 500,
              keyframes: [
                {
                  percent: 0.7,
                  style: {
                    fill: 'transparent',
                    lineDashOffset: 200,
                    lineDash: [200, 0],
                  },
                },
                {
                  // Stop for a while.
                  percent: 0.8,
                  style: {
                    fill: 'transparent',
                  },
                },
                {
                  percent: 1,
                  style: {
                    fill: 'black',
                  },
                },
              ],
            },
          },
        ],
      },
    };
  },
];
export default new Scene({
  option,
  duration: 5000,
  file: 'end',
  title: '',
  dark: false,
});
