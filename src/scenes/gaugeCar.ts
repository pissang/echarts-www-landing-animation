import type { EChartsOption } from 'echarts';
import Scene, { GetOption } from '../components/Scene';
import { defaultFont } from './common/style';

const option: (EChartsOption | GetOption)[] = [
  (chart) => ({
    textStyle: {
      fontFamily: defaultFont,
    },
    series: [
      {
        name: 'Pressure',
        type: 'gauge',
        animationDuration: 5000,
        animationEasing: 'quadraticOut',
        radius: '80%',
        max: 300,
        silent: true,
        axisLine: {
          lineStyle: {
            width: 2,
            color: [
              [0.8, '#fff'],
              [1, 'red'],
            ],
          },
        },
        axisTick: {
          lineStyle: {
            color: '#fff',
          },
        },
        progress: {
          show: true,
          width: 200,
          itemStyle: {
            color: {
              type: 'radial',
              global: true,
              x: chart.getWidth() / 2,
              y: chart.getHeight() / 2,
              r: (Math.min(chart.getWidth(), chart.getHeight()) / 2) * 0.8,
              colorStops: [
                {
                  offset: 0,
                  color: 'transparent',
                },
                {
                  offset: 0.7,
                  color: 'transparent',
                },
                {
                  offset: 0.95,
                  color: 'rgba(150, 200, 255, 0.5)',
                },
                {
                  offset: 0.98,
                  color: 'rgba(230, 250, 255, 0.9)',
                },
                {
                  offset: 1,
                  color: 'rgba(255,255,255,1)',
                },
              ],
            },
          },
        },
        anchor: {
          show: true,
          size: (Math.min(chart.getWidth(), chart.getHeight()) / 2) * 0.2,
          showAbove: true,
          itemStyle: {
            color: '#001122',
            opacity: 0.9,
            borderColor: 'rgba(255,255,255,0.8)',
            borderWidth: 1,
            shadowBlur: 30,
            shadowColor: 'rgba(255, 255, 255, 0.5)',
          },
        },
        pointer: {
          offsetCenter: [0, '20%'],
          icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
          length: '110%',
          itemStyle: {
            color: 'rgba(255,255,255,0.9)',
          },
        },
        axisLabel: {
          color: '#fff',
          fontSize: 20,
        },
        title: {
          show: false,
          color: '#fff',
          // offsetCenter: [0, 0],
        },
        detail: {
          valueAnimation: true,
          formatter: '{value}\n{unit|km / h}',
          offsetCenter: [0, '50%'],
          rich: {
            unit: {
              lineHeight: 80,
              color: '#fff',
              fontSize: 30,
            },
          },
          fontSize: 50,
          color: '#fff',
        },
        data: [
          {
            value: 288,
            name: 'SPEED',
          },
        ],
      },
    ],
  }),
];

export default new Scene({
  option,
  duration: 5000,
  file: 'gaugeCar',
  title: 'Gauge',
  dark: true,
  background: '#001122',
});
