import { Path } from '@intlify/core-base';
import { EChartsOption, graphic } from 'echarts';
import Scene, { GetOption } from '../components/Scene';
import MetaballPath, { MetaballShape } from './common/MetaballPath';

graphic.registerShape('metaball', MetaballPath as any);

const rings: number[][][] = [];
const ringsCount = 7;
for (let i = 0; i < ringsCount; i++) {
  rings[i] = [];
  const ringPoints = i === 0 ? 1 : i * 6;
  for (let k = 0; k < ringPoints; k++) {
    rings[i].push([
      // Ring / Radius
      i / (ringsCount - 1),
      // Angle
      (k / ringPoints) * Math.PI * 2,
      // Spawn from
    ]);
  }
}

// Built hierarchy data.
const dataAll = [rings[0]];
for (let i = 1; i < ringsCount; i++) {
  const data = dataAll[i - 1].slice();
  const stride = rings[i].length / rings[i - 1].length;
  dataAll.push(data);

  const step = 1 / stride;
  // Find a point to spawn from
  for (let k = 0; k < rings[i].length; k++) {
    const fromIdx = Math.min(Math.round(step * k), rings[i - 1].length - 1);
    const pt = rings[i][k];

    // Spawn from
    pt[2] = fromIdx + (i === 1 ? 0 : dataAll[i - 2].length);
    // Random delay
    pt[3] = Math.random() * 1000;

    data.push(pt);
  }
}

const option: (EChartsOption | GetOption)[] = dataAll.map(
  (data) =>
    ({
      series: [
        {
          type: 'custom',
          coordinateSystem: undefined,
          data,
          animationDuration: 1000,
          animationEasing: 'cubicInOut',
          animationDelay: (idx, params) => {
            return data[idx][3] || 0;
          },
          renderItem(params, api) {
            const width = api.getWidth();
            const height = api.getHeight();
            const viewSize = Math.sqrt(width * width + height * height) / 2;

            function getCircleShape(dataIndex?: number) {
              const ring = api.value(0, dataIndex) as number;
              const angle = api.value(1, dataIndex) as number;
              const r = viewSize * ring;
              const size = viewSize / 25;
              const center = [width / 2, height / 2];
              const cx = center[0] + Math.cos(angle) * r;
              const cy = center[1] + Math.sin(angle) * r;

              return {
                cx,
                cy,
                r: size,
              };
            }

            const circleShape = getCircleShape();

            const fromIdx = data[params.dataIndex][2] as number;

            const fromShape = fromIdx != null ? getCircleShape(fromIdx) : null;

            return {
              type: 'group',
              children: [
                {
                  type: 'circle',
                  shape: {
                    ...circleShape,
                    enterFrom: fromShape,
                  },
                  transition: ['shape'],
                  style: {
                    fill: '#14E0F8',
                  },
                },

                ...(fromShape
                  ? [
                      {
                        type: 'metaball',
                        transition: ['shape'],
                        shape: {
                          cx1: fromShape.cx,
                          cy1: fromShape.cy,
                          r1: fromShape.r,
                          cx2: circleShape.cx,
                          cy2: circleShape.cy,
                          r2: circleShape.r,
                          maxDistance: viewSize / 10,
                          enterFrom: {
                            cx2: fromShape.cx,
                            cy2: fromShape.cy,
                            r2: fromShape.r,
                          },
                        },
                        style: {
                          fill: '#14E0F8',
                        },
                      },
                    ]
                  : []),
              ],
            };
          },
        },
      ],
    } as EChartsOption)
);

export default new Scene({
  option,
  title: 'Extending Your Shape',
  duration: [500, 2000],
  dark: true,
  background: '#225369',
});
