import type { EChartsOption } from 'echarts';
import { defaultFont } from './common/style';
import Scene from '../components/Scene';
import * as covidData from './data/covidData';
import { geoAlbersUsa } from 'd3-geo';

const country = covidData.country;
const data = covidData.rawData[50];

const projection = geoAlbersUsa();

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

  {
    series: [
      {
        type: 'map',
        map: 'usa',
        projection: {
          project: (pt) => projection(pt as [number, number]) as number[],
          unproject: (pt) =>
            projection.invert!(pt as [number, number]) as number[],
        },
        universalTransition: true,
      },
    ],
  },
];

export default new Scene({
  option: mapOptions,
  duration: 1000,
  file: 'map',
  title: 'Choropleth Map with Albers Projection',
});
