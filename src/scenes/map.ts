import { EChartsOption, registerMap } from 'echarts';
import { defaultFont } from './common/style';
import Scene from '../components/Scene';
import * as covidData from './data/covidData';
import usaJson from './data/usa.json';

registerMap('usa', usaJson as any, {
  Alaska: {
    // 把阿拉斯加移到美国主大陆左下方
    left: -113,
    top: 20,
    width: 15,
  },
  Hawaii: {
    left: -95, // 夏威夷
    top: 20,
    width: 5,
  },
  'Puerto Rico': {
    // 波多黎各
    left: -85,
    top: 22,
    width: 2,
  },
});

const country = covidData.country;
const data = covidData.rawData[50];

console.log(
  country.map((name, idx) => {
    return {
      name: name,
      value: data[idx],
    };
  })
);

const mapOptions: EChartsOption[] = [
  {
    textStyle: {
      fontFamily: defaultFont,
    },
    visualMap: {
      show: false,
      min: 0,
      max: 50,
      inRange: {
        colorAlpha: [0.5, 1],
      },
    },
    series: [
      {
        type: 'map',
        map: 'usa',
        data: country.map((name, idx) => {
          return {
            name: name,
            value: data[idx],
          };
        }),
        label: {
          show: true,
          color: '#fff',
        },
        labelLayout: {
          hideOverlap: true,
        },
        silent: true,
        itemStyle: {
          borderColor: '#fff',
        },
      },
    ],
  },
];

export default new Scene({
  option: mapOptions,
  duration: 2000,
  title: 'Choropleth Map',
});
