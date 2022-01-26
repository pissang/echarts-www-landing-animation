import type { CustomSeriesOption, EChartsOption } from 'echarts';
import { graphic } from 'echarts/core';
import Scene, { GetOption } from '../components/Scene';
import MetaballPath from './common/MetaballPath';

graphic.registerShape('metaball', MetaballPath as any);

const FILL_COLOR = '#ddd';

const rings: number[][][] = [];
const ringsCount = 6;
for (let i = 0; i < ringsCount; i++) {
  rings[i] = [];
  const ringPoints = i === 0 ? 1 : i * 6;
  for (let k = 0; k < ringPoints; k++) {
    rings[i].push([
      // Ring / Radius
      i / (ringsCount - 1),
      // Angle
      (k / ringPoints) * Math.PI * 2,
      // Size
      i === 0 ? 1.2 : Math.random() * 0.5 + 0.5,
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
    pt[3] = fromIdx + (i === 1 ? 0 : dataAll[i - 2].length);
    // Random delay
    pt[4] = Math.random() * 1000;

    data.push(pt);
  }
}

function getCircleShape(
  api: Parameters<Exclude<CustomSeriesOption['renderItem'], undefined>>[1],
  dataIndex?: number
) {
  const width = api.getWidth();
  const height = api.getHeight();
  const viewSize = Math.sqrt(width * width + height * height) / 2;

  const ring = api.value(0, dataIndex) as number;
  const angle = api.value(1, dataIndex) as number;
  const r = viewSize * ring;
  const size = (viewSize / 20) * +api.value(2, dataIndex);
  const center = [width / 2, height / 2];
  const cx = center[0] + Math.cos(angle) * r;
  const cy = center[1] + Math.sin(angle) * r;

  return {
    cx,
    cy,
    r: size,
  };
}
const SVG_SHAPES = [
  'M23.6 2c-3.363 0-6.258 2.736-7.599 5.594-1.342-2.858-4.237-5.594-7.601-5.594-4.637 0-8.4 3.764-8.4 8.401 0 9.433 9.516 11.906 16.001 21.232 6.13-9.268 15.999-12.1 15.999-21.232 0-4.637-3.763-8.401-8.4-8.401z',
  'M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM22 8c1.105 0 2 1.343 2 3s-0.895 3-2 3-2-1.343-2-3 0.895-3 2-3zM10 8c1.105 0 2 1.343 2 3s-0.895 3-2 3-2-1.343-2-3 0.895-3 2-3zM16 28c-5.215 0-9.544-4.371-10-9.947 2.93 1.691 6.377 2.658 10 2.658s7.070-0.963 10-2.654c-0.455 5.576-4.785 9.942-10 9.942z',
  'M32 2c0-1.422-0.298-2.775-0.833-4-1.049 2.401-3.014 4.31-5.453 5.287-2.694-2.061-6.061-3.287-9.714-3.287s-7.021 1.226-9.714 3.287c-2.439-0.976-4.404-2.886-5.453-5.287-0.535 1.225-0.833 2.578-0.833 4 0 2.299 0.777 4.417 2.081 6.106-1.324 2.329-2.081 5.023-2.081 7.894 0 8.837 7.163 16 16 16s16-7.163 16-16c0-2.871-0.757-5.565-2.081-7.894 1.304-1.689 2.081-3.806 2.081-6.106zM18.003 11.891c0.064-1.483 1.413-2.467 2.55-3.036 1.086-0.543 2.16-0.814 2.205-0.826 0.536-0.134 1.079 0.192 1.213 0.728s-0.192 1.079-0.728 1.213c-0.551 0.139-1.204 0.379-1.779 0.667 0.333 0.357 0.537 0.836 0.537 1.363 0 1.105-0.895 2-2 2s-2-0.895-2-2c0-0.037 0.001-0.073 0.003-0.109zM8.030 8.758c0.134-0.536 0.677-0.862 1.213-0.728 0.045 0.011 1.119 0.283 2.205 0.826 1.137 0.569 2.486 1.553 2.55 3.036 0.002 0.036 0.003 0.072 0.003 0.109 0 1.105-0.895 2-2 2s-2-0.895-2-2c0-0.527 0.204-1.005 0.537-1.363-0.575-0.288-1.228-0.528-1.779-0.667-0.536-0.134-0.861-0.677-0.728-1.213zM16 26c-3.641 0-6.827-1.946-8.576-4.855l2.573-1.544c1.224 2.036 3.454 3.398 6.003 3.398s4.779-1.362 6.003-3.398l2.573 1.544c-1.749 2.908-4.935 4.855-8.576 4.855z',
  'M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM22 8c1.105 0 2 0.895 2 2s-0.895 2-2 2-2-0.895-2-2 0.895-2 2-2zM10 8c1.105 0 2 0.895 2 2s-0.895 2-2 2-2-0.895-2-2 0.895-2 2-2zM16.994 21.23c-0.039-0.035-0.078-0.072-0.115-0.109-0.586-0.586-0.878-1.353-0.879-2.121-0 0.768-0.293 1.535-0.879 2.121-0.038 0.038-0.076 0.074-0.115 0.109-2.704 2.453-9.006-0.058-9.006-3.23 1.938 1.25 3.452 0.306 4.879-1.121 1.172-1.172 3.071-1.172 4.243 0 0.586 0.586 0.879 1.353 0.879 2.121 0-0.768 0.293-1.535 0.879-2.121 1.172-1.172 3.071-1.172 4.243 0 1.427 1.427 2.941 2.371 4.879 1.121 0 3.173-6.302 5.684-9.006 3.23z',
  'M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM10 14c-1.105 0-2-1.343-2-3s0.895-3 2-3 2 1.343 2 3-0.895 3-2 3zM16 26c-2.209 0-4-1.791-4-4s1.791-4 4-4c2.209 0 4 1.791 4 4s-1.791 4-4 4zM22 14c-1.105 0-2-1.343-2-3s0.895-3 2-3 2 1.343 2 3-0.895 3-2 3z',
  'M14 18v-14c-7.732 0-14 6.268-14 14s6.268 14 14 14 14-6.268 14-14c0-2.251-0.532-4.378-1.476-6.262l-12.524 6.262zM28.524 7.738c-2.299-4.588-7.043-7.738-12.524-7.738v14l12.524-6.262z',
  'M30 10h-6v-3c0-2.761-5.373-5-12-5s-12 2.239-12 5v20c0 2.761 5.373 5 12 5s12-2.239 12-5v-3h6c1.105 0 2-0.895 2-2v-10c0-1.105-0.895-2-2-2zM5.502 8.075c-1.156-0.381-1.857-0.789-2.232-1.075 0.375-0.286 1.075-0.694 2.232-1.075 1.811-0.597 4.118-0.925 6.498-0.925s4.688 0.329 6.498 0.925c1.156 0.381 1.857 0.789 2.232 1.075-0.375 0.286-1.076 0.694-2.232 1.075-1.811 0.597-4.118 0.925-6.498 0.925s-4.688-0.329-6.498-0.925zM28 20h-4v-6h4v6z',
  'M24 19.999l-5.713-5.713 13.713-10.286-4-4-17.141 6.858-5.397-5.397c-1.556-1.556-3.728-1.928-4.828-0.828s-0.727 3.273 0.828 4.828l5.396 5.396-6.858 17.143 4 4 10.287-13.715 5.713 5.713v7.999h4l2-6 6-2v-4l-7.999 0z',
];

const option: (EChartsOption | GetOption)[] = [
  ...dataAll.map(
    (data) =>
      ({
        series: [
          {
            type: 'custom',
            coordinateSystem: undefined,
            data,
            animationDuration: 700,
            animationEasing: 'cubicInOut',
            animationDelay: (idx, params) => {
              return data[idx][4] || 0;
            },
            renderItem(params, api) {
              const width = api.getWidth();
              const height = api.getHeight();
              const viewSize = Math.sqrt(width * width + height * height) / 2;
              const circleShape = getCircleShape(api);

              const fromIdx = data[params.dataIndex][3] as number;

              const fromShape =
                fromIdx != null ? getCircleShape(api, fromIdx) : null;

              return {
                type: 'group',
                children: [
                  {
                    type: 'circle',
                    silent: true,
                    shape: {
                      ...circleShape,
                      enterFrom: fromShape,
                    },
                    transition: ['shape'],
                    style: {
                      fill: FILL_COLOR,
                    },
                  },

                  ...(fromShape
                    ? [
                        {
                          type: 'metaball',
                          transition: ['shape'],
                          silent: true,
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
                            fill: FILL_COLOR,
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
  ),

  ...SVG_SHAPES.map(
    (d) =>
      ({
        title: {
          text: 'OR ANY SVG SHAPES',
          left: 'center',
          top: 'center',
          textStyle: {
            fontSize: 50,
            color: '#fff',
            textBorderColor: '#001122',
            textBorderWidth: 10,
            fontFamily: "'Oswald', sans-serif",
          },
        },
        series: [
          {
            type: 'custom',
            coordinateSystem: undefined,
            data: dataAll[dataAll.length - 1],
            animationDuration: 1500,
            animationEasing: 'cubicInOut',
            animationDelay: 0,
            universalTransition: {
              enabled: true,
            },
            renderItem(params, api) {
              const circleShape = getCircleShape(api);

              return {
                type: 'path',
                silent: true,
                shape: {
                  d,
                  x: circleShape.cx - circleShape.r,
                  y: circleShape.cy - circleShape.r,
                  width: circleShape.r * 2,
                  height: circleShape.r * 2,
                },
                transition: ['shape'],
                style: {
                  fill: FILL_COLOR,
                },
              };
            },
          },
        ],
      } as EChartsOption)
  ),
];

export default new Scene({
  option,
  file: 'metaball',
  title: 'Extending Your Shape',
  duration: [
    100,
    ...dataAll.slice(1).map((a) => 1500),
    ...SVG_SHAPES.map((a) => 500),
  ],
  dark: true,
  // background: '#225369',
  background: '#373940',
});
