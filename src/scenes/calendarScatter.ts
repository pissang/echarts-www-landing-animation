import type { EChartsOption } from 'echarts';
import Scene, { GetOption } from '../components/Scene';
import { defaultFont } from './common/style';
import ghContributions from './data/gh-contributions-2020.json';

const highlightedData = ghContributions
  .slice()
  .sort((a, b) => +b[1] - +a[1])
  .slice(0, 10);

const option: (EChartsOption | GetOption)[] = [
  (chart) => ({
    textStyle: {
      fontFamily: defaultFont,
    },
    visualMap: {
      show: false,
      min: 0,
      max: 3,
      inRange: {
        color: ['#0e4429', '#006d32', '#26a641', '#39d353'],
      },
      outOfRange: {
        color: '#001122',
      },
    },
    calendar: {
      range: '2020',
      top: 'center',
      right: 10,
      left: 60,
      yearLabel: {
        fontFamily: defaultFont,
      },
      monthLabel: {
        color: '#fff',
      },
      dayLabel: {
        color: '#fff',
      },
      itemStyle: {
        color: '#001122',
        borderColor: '#000',
      },
    },
    series: {
      type: 'scatter',
      coordinateSystem: 'calendar',
      symbol: 'roundRect',
      symbolSize: Math.min((chart.getWidth() - 70) / 80, 16),
      data: ghContributions,
      itemStyle: {},
      universalTransition: {
        enabled: true,
        seriesKey: 'calendar',
      },
    },
  }),

  {
    series: {
      symbol: 'circle',
    },
  },

  (chart) => ({
    title: {
      text: 'Highlight Data with Special Effect',
      left: 'center',
      top: 20,
      textStyle: {
        color: '#fff',
        fontSize: 30,
        fontFamily: defaultFont,
      },
    },
    animationEasingUpdate: 'linear',
    animationDurationUpdate: 1000,
    series: [
      {
        type: 'scatter',
        itemStyle: {
          opacity: 0.3,
        },
      },
      {
        type: 'effectScatter',
        coordinateSystem: 'calendar',
        symbolSize: Math.min((chart.getWidth() - 70) / 80, 16),
        rippleEffect: {
          brushType: 'stroke',
          scale: 4,
        },
        data: highlightedData,
      },
    ],
  }),
];

export default new Scene({
  option,
  duration: [1000, 1000, 3000],
  file: 'calendarScatter',
  title: 'Calendar Scatter',
  dark: true,
  background: '#001122',
});
