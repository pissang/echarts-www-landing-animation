// Survey chart with circle packing
import type { EChartsOption } from 'echarts';
import Scene from '../components/Scene';
import { packSiblings, packEnclose } from 'd3-hierarchy';
import pieData from './data/pieData';
import pieLayout from './common/pieLayout';
import { layoutSector } from './common/parliamentLayout';
import { defaultColorPalette } from './common/style';

const angles: number[] = pieLayout(pieData, -Math.PI / 2, Math.PI * 2);
const radius = ['30%', '80%'];

// const columnCount = Math.ceil(Math.sqrt(pieData.length));
const columnCount = 4;
const rowCount = Math.ceil(pieData.length / columnCount);

const surveyOption: EChartsOption = {
  series: {
    type: 'custom',
    data: pieData,
    coordinateSystem: undefined,
    universalTransition: {
      enabled: true,
      seriesKey: 'point',
      delay(idx, count) {
        return (idx / count) * 1000;
      },
    },
    animationDurationUpdate: 1000,
    renderItem(params, api) {
      // TODO only use parliamentLayout to calculate count.
      const idx = params.dataIndex;
      const viewSize = Math.min(api.getWidth(), api.getHeight());
      const r0 = ((parseFloat(radius[0]) / 100) * viewSize) / 2;
      const r1 = ((parseFloat(radius[1]) / 100) * viewSize) / 2;
      const size = viewSize / 40;
      const points = layoutSector(
        angles[idx],
        angles[idx + 1],
        Math.PI * 2,
        r0,
        r1,
        size + 3
      );

      const cellWidth = api.getWidth() / columnCount;
      const cellHeight = api.getHeight() / rowCount;
      const cx = cellWidth * (idx % columnCount) + cellWidth / 2;
      const cy = cellHeight * Math.floor(idx / columnCount) + cellHeight / 2;

      const newSize = cellWidth / 10;
      const circles: { x: number; y: number; r: number }[] = packSiblings(
        points.map((pt) => {
          return {
            r: (Math.pow(Math.random(), 10) * newSize) / 2 + newSize / 4,
          };
        })
        // .sort((a, b) => b.r - a.r)
      );

      const { r } = packEnclose(circles);

      return {
        type: 'group',
        focus: 'self',
        children: circles.map((circle) => {
          return {
            type: 'circle',
            // autoBatch: true,
            shape: {
              cx: cx + circle.x,
              cy: cy + circle.y,
              r: circle.r,
            },
            style: {
              fill: defaultColorPalette[idx % defaultColorPalette.length],
            },
          };
        }),
        // .concat([
        //   {
        //     type: 'circle',
        //     morph: false,
        //     shape: {
        //       cx: cx,
        //       cy: cy,
        //       r,
        //     },
        //     style: {
        //       stroke: '#eee',
        //       fill: 'none',
        //     },
        //   } as any,
        // ]),
      };
    },
  },
};

export default new Scene({
  option: surveyOption,
  file: 'survey',
  title: 'Survey Chart',
  duration: 3000,
});
