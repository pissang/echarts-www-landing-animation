import type { EChartsOption } from 'echarts';
import Scene from '../components/Scene';
import { defaultColorPalette2, defaultFont } from './common/style';
import data from './data/echarts-package-size.json';

const option: EChartsOption = {
  color: defaultColorPalette2,
  series: [
    {
      type: 'treemap',
      name: 'echarts',
      left: 10,
      top: 10,
      bottom: 10,
      right: 10,
      animationDurationUpdate: 1000,
      animationThreshold: 3000,
      roam: false,
      nodeClick: undefined,
      data: data.children,
      leafDepth: 2,
      levels: [
        {
          colorMappingBy: 'id',
          itemStyle: {
            borderWidth: 3,
            gapWidth: 3,
            borderRadius: 5,
            shadowBlur: 20,
            shadowColor: 'rgba(20, 20, 40, 1)',
          },
        },
        {
          itemStyle: {
            borderWidth: 2,
            gapWidth: 1,
            borderRadius: 5,
            shadowBlur: 5,
            shadowColor: 'rgba(20, 20, 40, 0.9)',
          },
        },
        {
          upperLabel: {
            show: false,
          },
          itemStyle: {
            borderWidth: 0,
            gapWidth: 0,
            borderRadius: 1,
          },
        },
      ],
      universalTransition: {
        enabled: true,
        seriesKey: 'hierarchy',
      },
      label: {
        show: true,
        formatter: '{b}',
        fontSize: 10,
        fontWeight: 100,
        overflow: 'break',
        fontFamily: defaultFont,
      },
      labelLayout: function (params) {
        if (params.rect.width < 5 || params.rect.height < 5) {
          return {
            fontSize: 0,
          };
        }
        return {
          fontSize: Math.min(
            Math.sqrt(params.rect.width * params.rect.height) / 10,
            14
          ),
        };
      },
      itemStyle: {
        borderColor: 'rgba(100, 100, 200, 0.2)',
        borderWidth: 0,
      },
      upperLabel: {
        show: true,
        height: 15,
        fontSize: 10,
        fontFamily: 'Barlow Condensed',
        color: 'rgba(255,255,255,0.7)',
      },
      breadcrumb: {
        show: false,
      },
    },
  ],
};

export default new Scene({
  file: 'treemapComplexStyle',
  title: 'Customize to Complex Style',
  option,
  duration: 3000,
  dark: true,
  background: '#001122',
});
