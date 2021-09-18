import * as echarts from 'echarts';
import 'echarts-liquidfill';
import Scene, { GetOption } from '../components/Scene';

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

    const data = [];
    const phases = [0, 0.6, 0.8];
    const values = [1, 0.9, 0.85];
    for (let w = 0; w < waves.length; ++w) {
      for (let i = 0; i < 3; ++i) {
        data.push({
          value: waves[w].value * values[i],
          amplitude: waves[w].amplitude,
          phase: phases[i] + w,
          period: waves[w].period,
          waveLength: waves[w].waveLength,
        });
      }
    }

    return {
      backgroundColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: '#faf2cd',
        },
        {
          offset: 0.4,
          color: '#d2b083',
        },
        {
          offset: 1,
          color: '#a38d66',
        },
      ]),
      series: [
        {
          id: 'liquidFill',
          radius: '250%',
          color: ['#fdeec7', '#799fa2', '#282536'],
          type: 'liquidFill',
          data: data,
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
];

export default new Scene({
  option,
  duration: 3000,
  title: 'Liquid Fill Extension',
  dark: false,
});
