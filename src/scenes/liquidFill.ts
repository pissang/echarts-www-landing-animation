import 'echarts-liquidfill';
import Scene, { GetOption } from '../components/Scene';
import { getEndingFontSize } from './end';

const waves = [
  {
    value: 0.44,
    valueSine: 0.1,
    period: 5000,
    amplitude: 120,
    amplitudeSine: 100,
    waveLength: '80%',
  },
  {
    value: 0.42,
    valueSine: 0.05,
    period: 4000,
    amplitude: 100,
    amplitudeSine: 10,
    waveLength: '40%',
  },
  {
    value: 0.4,
    valueSine: 0.05,
    period: 1500,
    amplitude: 50,
    amplitudeSine: 10,
    waveLength: '20%',
  },
  {
    value: 0.4,
    valueSine: 0.05,
    period: 3000,
    amplitude: 70,
    amplitudeSine: 10,
    waveLength: '60%',
  },
  {
    value: 0.35,
    valueSine: 0.05,
    period: 2000,
    amplitude: 60,
    amplitudeSine: 10,
    waveLength: '40%',
  },
  // {
  //   value: 0.3,
  //   valueSine: 0.05,
  //   period: 4000,
  //   amplitude: 15,
  //   amplitudeSine: 10,
  //   waveLength: '20%',
  // },
  // {
  //   value: 0.3,
  //   valueSine: 0.05,
  //   period: 1500,
  //   amplitude: 60,
  //   amplitudeSine: 10,
  //   waveLength: '30%',
  // },
];

const wavesData: any[] = [];
const phases = [0, 0.6, 0.8];
const values = [1, 0.9, 0.85];
for (let w = 0; w < waves.length; ++w) {
  for (let i = 0; i < 3; ++i) {
    wavesData.push({
      value: waves[w].value * values[i],
      amplitude: waves[w].amplitude,
      phase: phases[i] + w,
      period: waves[w].period,
      waveLength: waves[w].waveLength,
    });
  }
}

const option: GetOption[] = [
  (chart) => ({
    series: [
      {
        id: 'liquidFill',
        type: 'liquidFill',
        data: [0.7, 0.6],
        radius: '70%',
        itemStyle: {
          shadowColor: 'rgba(0, 0, 0, 0.2)',
        },
        animationEasing: 'cubicOut',
        silent: true,
      } as any,
    ],
  }),

  (chart) => {
    function makeBackgroundGradient(
      color0: string,
      color1?: string,
      color2?: string
    ) {
      return {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: color0,
          },
          {
            offset: 0.4,
            color: color1 || color0,
          },
          {
            offset: 1,
            color: color2 || color1 || color0,
          },
        ],
      };
    }
    return {
      graphic: {
        elements: [
          {
            type: 'rect',
            shape: {
              x: 0,
              y: 0,
              width: chart.getWidth(),
              height: chart.getHeight(),
            },
            transition: 'all',
            enterFrom: {
              style: {
                fill: makeBackgroundGradient('#fff'),
              },
            },
            leaveTo: {
              style: {
                fill: makeBackgroundGradient('#fff'),
              },
            },
            style: {
              fill: makeBackgroundGradient('#faf2cd', '#d2b083', '#a38d66'),
            },
          },
        ],
      },
      series: [
        {
          id: 'liquidFill',
          radius: '250%',
          color: ['#fdeec7', '#799fa2', '#282536'],
          type: 'liquidFill',
          data: wavesData,
          animationDurationUpdate: 1000,
          animationEasingUpdate: 'cubicOut',
          backgroundStyle: {
            color: 'transparent',
          },
          itemStyle: {
            // shadowBlur: 5,
            shadowColor: 'rgba(0, 0, 0, 0.2)',
          },
          outline: {
            show: false,
          },
          universalTransition: true,
          label: {
            show: false,
            color: '#282536',
            fontSize: 72,
            formatter: function () {
              return 'Ukiyoe'.toUpperCase();
            },
          },
        },
      ],
    };
  },

  (chart) => {
    return {
      graphic: {
        animationDurationUpdate: 2000,
        elements: [
          {
            $action: 'remove',
          },
        ],
      },
      series: [
        {
          id: 'liquidFill',
          type: 'liquidFill',
          universalTransition: true,
          animationDurationUpdate: 2000,
          animationEasingUpdate: 'linear',
          data: wavesData.map((item) => ({
            value: 0,
          })),
        },

        // TODO graphic not support custom path yet.
        {
          type: 'custom',
          coordinateSystem: 'none',
          data: [0],
          renderItem() {
            const size = getEndingFontSize(chart) * 1.2;
            return {
              type: 'path',
              shape: {
                d: 'M82.280 32.951 C 101.810 42.338,109.598 65.303,100.120 85.557 C 98.052 89.977,97.215 93.008,97.618 94.615 C 98.392 97.697,102.562 101.000,105.680 101.000 C 109.030 101.000,113.000 96.759,113.000 93.180 C 113.000 89.940,109.635 85.000,107.427 85.000 C 105.505 85.000,105.611 83.363,107.582 82.607 C 113.965 80.158,121.081 85.056,120.122 91.238 C 120.059 91.644,121.545 92.619,123.423 93.404 C 125.302 94.188,127.325 95.739,127.920 96.850 C 129.684 100.147,129.223 105.488,127.000 107.500 C 125.063 109.253,125.000 109.247,125.000 107.290 C 125.000 106.179,124.067 104.084,122.927 102.635 C 119.727 98.567,115.239 99.033,109.461 104.034 C 99.531 112.628,88.027 116.507,74.719 115.748 C 66.862 115.300,64.863 114.764,57.543 111.136 C 39.369 102.131,29.093 84.791,30.163 64.932 C 30.995 49.496,40.505 37.056,55.844 31.337 C 61.600 29.191,76.328 30.090,82.280 32.951 Z',
                x: -size / 2,
                y: -size / 2,
                width: size,
                height: size,
              },
              style: {
                fill: '#e43a61',
                stroke: '#000',
                strokeFirst: true,
                lineWidth: 5,
                lineJoin: 'round',
              },
              keyframeAnimation: [
                {
                  duration: 1500,
                  easing: 'quadraticOut',
                  keyframes: [
                    {
                      percent: 0,
                      x: chart.getWidth() / 2 + getEndingFontSize(chart) * 2,
                      rotation: 0.5,
                    },
                    {
                      percent: 1,
                      x: chart.getWidth() / 2,
                      rotation: 0,
                    },
                  ],
                },
                {
                  duration: 1500,
                  easing: 'sinusoidalOut',
                  keyframes: [
                    {
                      percent: 0,
                      y: chart.getHeight(),
                    },
                    {
                      percent: 1,
                      y: chart.getHeight() / 2,
                    },
                  ],
                },
                {
                  duration: 1500,
                  keyframes: [
                    {
                      percent: 0,
                      style: {
                        opacity: 0,
                      },
                    },
                    {
                      percent: 1,
                      style: {
                        opacity: 1,
                      },
                    },
                  ],
                },
              ],
            };
          },
        },
      ],
    };
  },
];

export default new Scene({
  option,
  duration: [3000, 3000, 1500],
  title: 'Liquid Fill Extension',
  dark: false,
});
