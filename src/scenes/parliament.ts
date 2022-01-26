// Parliament chart
import type { EChartsOption } from 'echarts';
import { defaultColorPalette } from './common/style';
import { layoutSector } from './common/parliamentLayout';
import pieLayout from './common/pieLayout';
import pieData from './data/pieData';
import Scene from '../components/Scene';

const angles: number[] = pieLayout(pieData, -Math.PI / 2, Math.PI * 2);

const radius = ['30%', '80%'];

const paliamentOption: EChartsOption = {
  series: {
    type: 'custom',
    data: pieData,
    coordinateSystem: undefined,
    universalTransition: {
      enabled: true,
      seriesKey: 'point',
    },
    animationDurationUpdate: 1000,
    renderItem(params, api) {
      const idx = params.dataIndex;
      const viewSize = Math.min(api.getWidth(), api.getHeight());
      const r0 = ((parseFloat(radius[0]) / 100) * viewSize) / 2;
      const r1 = ((parseFloat(radius[1]) / 100) * viewSize) / 2;
      const cx = api.getWidth() * 0.5;
      const cy = api.getHeight() * 0.5;
      const size = viewSize / 40;

      const points = layoutSector(
        angles[idx],
        angles[idx + 1],
        Math.PI * 2,
        r0,
        r1,
        size + 3
      );

      return {
        type: 'group',
        focus: 'self',
        children: points.map((pt) => {
          return {
            type: 'circle',
            // autoBatch: true,
            shape: {
              cx: cx + pt[0],
              cy: cy + pt[1],
              r: size / 2,
            },
            style: {
              fill: defaultColorPalette[idx % defaultColorPalette.length],
            },
          };
        }),
      };
    },
  },
};

export default new Scene({
  option: paliamentOption,
  file: 'parliament',
  title: 'Parliament Chart',
  duration: 1000,
});
