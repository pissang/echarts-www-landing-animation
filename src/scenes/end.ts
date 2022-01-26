import { EChartsType } from 'echarts/core';
import Scene, { GetOption } from '../components/Scene';

export function getEndingFontSize(chart: Pick<EChartsType, 'getWidth'>) {
  return Math.round(chart.getWidth() / 15);
}

const option: GetOption[] = [
  (chart) => ({
    graphic: {
      elements: [
        {
          type: 'text',
          left: 'center',
          top: 'center',
          style: {
            text: 'Apache ECharts',
            fontSize: getEndingFontSize(chart),
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
    // TODO graphic not support custom path yet.
    series: [
      {
        type: 'custom',
        coordinateSystem: 'none',
        data: [0],
        // @ts-ignore
        renderItem() {
          const size = getEndingFontSize(chart) * 1.2;
          return {
            type: 'path',
            x: chart.getWidth() / 2 - getEndingFontSize(chart) * 4.8,
            y: chart.getHeight() / 2,
            enterAnimation: {
              easing: 'sinusoidalOut',
              duration: 1000,
            },
            enterFrom: {
              x: chart.getWidth() / 2,
            },
            shape: {
              d: 'M82.280 32.951 C 101.810 42.338,109.598 65.303,100.120 85.557 C 98.052 89.977,97.215 93.008,97.618 94.615 C 98.392 97.697,102.562 101.000,105.680 101.000 C 109.030 101.000,113.000 96.759,113.000 93.180 C 113.000 89.940,109.635 85.000,107.427 85.000 C 105.505 85.000,105.611 83.363,107.582 82.607 C 113.965 80.158,121.081 85.056,120.122 91.238 C 120.059 91.644,121.545 92.619,123.423 93.404 C 125.302 94.188,127.325 95.739,127.920 96.850 C 129.684 100.147,129.223 105.488,127.000 107.500 C 125.063 109.253,125.000 109.247,125.000 107.290 C 125.000 106.179,124.067 104.084,122.927 102.635 C 119.727 98.567,115.239 99.033,109.461 104.034 C 99.531 112.628,88.027 116.507,74.719 115.748 C 66.862 115.300,64.863 114.764,57.543 111.136 C 39.369 102.131,29.093 84.791,30.163 64.932 C 30.995 49.496,40.505 37.056,55.844 31.337 C 61.600 29.191,76.328 30.090,82.280 32.951 Z',
              x: -size / 2,
              y: -size / 2,
              width: size,
              height: size,
            },
            style: {
              fill: '#e43a61',
              strokeFirst: true,
              shadowBlur: 10,
              shadowColor: 'rgba(228, 58, 97, 0.5)',
              // stroke: '#000',
              // lineWidth: 5,
              lineJoin: 'round',
            },
          };
        },
      },
    ],
  }),
];
export default new Scene({
  option,
  duration: 3000,
  file: 'end',
  title: '',
  dark: false,
});
