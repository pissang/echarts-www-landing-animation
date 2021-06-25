// Parliament chart
import { EChartsOption } from 'echarts';
import { defaultPalette } from './common/colorPalette';
import parliamentLayout from './common/parliamentLayout';
import pieData from './common/pieData';
import Scene from './Scene';

const sum = pieData.reduce((sum, cur) => {
  return sum + cur.value;
}, 0);

const angles: number[] = [];
const startAngle = -Math.PI / 2;
let curAngle = startAngle;
pieData.forEach(item => {
  angles.push(curAngle);
  curAngle += (item.value / sum) * Math.PI * 2;
});
angles.push(startAngle + Math.PI * 2);

const radius = ['30%', '80%'];

const paliamentOption: EChartsOption = {
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
      const idx = params.dataIndex;
      const viewSize = Math.min(api.getWidth(), api.getHeight());
      const r0 = ((parseFloat(radius[0]) / 100) * viewSize) / 2;
      const r1 = ((parseFloat(radius[1]) / 100) * viewSize) / 2;
      const cx = api.getWidth() * 0.5;
      const cy = api.getHeight() * 0.5;
      const size = 15;

      const points = parliamentLayout(
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
        children: points.map(pt => {
          return {
            type: 'circle',
            autoBatch: true,
            shape: {
              cx: cx + pt[0],
              cy: cy + pt[1],
              r: size / 2
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
  option: paliamentOption,
  duration: 1000
});
