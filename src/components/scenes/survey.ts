// Survey chart with circle packing
import { EChartsOption } from 'echarts';
import Scene from './Scene';
import { packSiblings } from 'd3-hierarchy';
import pieData from './common/pieData';
import pieLayout from './common/pieLayout';
import parliamentLayout from './common/parliamentLayout';
import { defaultPalette } from './common/colorPalette';

const angles: number[] = pieLayout(pieData, -Math.PI / 2, Math.PI * 2);
const radius = ['30%', '80%'];

const columnCount = Math.ceil(Math.sqrt(pieData.length));
const rowCount = Math.ceil(pieData.length / columnCount);

const surveyOption: EChartsOption = {
  series: {
    type: 'custom',
    data: pieData,
    coordinateSystem: undefined,
    universalTransition: {
      enabled: true,
      seriesKey: 'first'
    },
    animationDurationUpdate: 1000,
    renderItem(params, api) {
      // TODO only use parliamentLayout to calculate count.
      const idx = params.dataIndex;
      const viewSize = Math.min(api.getWidth(), api.getHeight());
      const r0 = ((parseFloat(radius[0]) / 100) * viewSize) / 2;
      const r1 = ((parseFloat(radius[1]) / 100) * viewSize) / 2;
      const size = 15;
      const points = parliamentLayout(
        angles[idx],
        angles[idx + 1],
        Math.PI * 2,
        r0,
        r1,
        size + 3
      );

      const cellWidth = api.getWidth() / columnCount;
      const cellHeight = api.getHeight() / rowCount;

      const circles: { x: number; y: number; r: number }[] = packSiblings(
        points.map(pt => {
          return {
            r: (Math.random() * size) / 2 + size / 4
          };
        })
      );

      const cx = cellWidth * (idx % columnCount) + cellWidth / 2;
      const cy = cellHeight * Math.floor(idx / columnCount) + cellHeight / 2;

      return {
        type: 'group',
        focus: 'self',
        children: circles.map(circle => {
          return {
            type: 'circle',
            autoBatch: true,
            shape: {
              cx: cx + circle.x,
              cy: cy + circle.y,
              r: circle.r
            },
            style: {
              fill: defaultPalette[idx % defaultPalette.length]
            }
          };
        })
      };
    }
  }
};

export default new Scene({
  option: surveyOption,
  duration: 1000
});
