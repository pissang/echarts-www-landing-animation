import 'echarts-liquidfill';
import Scene, { GetOption } from '../components/Scene';
import { getEndingFontSize } from './end';
import logoSVG from './data/logo.svg';

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
    const size = getEndingFontSize(chart) * 1.2;
    return {
      graphic: {
        animationDurationUpdate: 1000,
        elements: [
          {
            $action: 'remove',
          },

          {
            type: 'image',
            style: {
              image: logoSVG,
              x: -size / 2,
              y: -size / 2,
              width: size,
              height: size,
            },
            x: chart.getWidth() / 2,
            y: chart.getHeight() / 2,
            enterAnimation: {
              // easing: 'sinusoidalOut',
              duration: 1000,
            },
            enterFrom: {
              scaleX: 0,
              scaleY: 0,
              style: {
                opacity: 0,
              },
            },
          },
        ],
      },
      series: [
        {
          id: 'liquidFill',
          type: 'liquidFill',
          universalTransition: true,
          animationDurationUpdate: 1000,
          animationEasingUpdate: 'linear',
          data: wavesData.map((item) => ({
            value: 0,
          })),
        },
      ],
    };
  },
];

export default new Scene({
  option,
  duration: [3000, 3000, 1000],
  file: 'liquidFill',
  title: 'Liquid Fill Extension',
  dark: false,
});
