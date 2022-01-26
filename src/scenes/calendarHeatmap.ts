import type { EChartsOption } from 'echarts';
import Scene from '../components/Scene';
import { defaultFont } from './common/style';
import ghContributions from './data/gh-contributions-2020.json';

const option: EChartsOption = {
  // tooltip: {
  //   position: 'top',
  //   borderWidth: 0,
  // },
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
    type: 'heatmap',
    coordinateSystem: 'calendar',
    data: ghContributions,
    universalTransition: {
      enabled: true,
      seriesKey: 'calendar',
    },
  },
};

export default new Scene({
  option,
  duration: 200,
  file: 'calendarHeatmap',
  title: 'Calendar Heatmap',
  dark: true,
  background: '#001122',
});
