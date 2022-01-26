// Parliament chart
import type { EChartsOption } from 'echarts';
import pieData from './data/pieData';
import Scene from '../components/Scene';

const fov = 800; //pixels are 300px away from us
function project3dcoords(
  x: number,
  y: number,
  z: number,
  w: number,
  h: number
) {
  // https://thecodeplayer.com/walkthrough/3d-perspective-projection-canvas-javascript
  //calculating 2d position for 3d coordinates
  //fov = field of view = denotes how far the pixels are from us.
  //the scale will control how the spacing between the pixels will decrease with increasing distance from us.
  const scale = fov / (fov + z);
  return [x * scale + w / 2, y * scale + h / 2];
}

function get3dcoords(m: number, n: number, elapsedTime: number) {
  const x = (m - grid / 2) * 100;
  const y =
    Math.sin(m / 5 + elapsedTime) * Math.cos(n / 5 + elapsedTime) * 50 + 300;
  const z = (grid - n) * 80;
  return [x, y, z];
}

const randData = [];
const grid = 50;
for (let i = 0; i < grid; i++) {
  for (let k = 0; k < grid; k++) {
    const x = Math.random();
    const y = Math.random();
    randData.push({
      value: [x, y, Math.random()],
      dist: Math.round(y * 1000) + x,
      groupId: pieData[Math.round(Math.random() * (pieData.length - 1))].name,
    });
  }
}

randData.sort((a, b) => a.dist - b.dist);

const waveOption: EChartsOption[] = [
  // explosion
  {
    series: {
      type: 'custom',
      data: randData,
      coordinateSystem: undefined,
      universalTransition: {
        enabled: true,
        seriesKey: 'point',
      },
      animationThreshold: 1e5,
      animationDurationUpdate: 500,
      animationEasingUpdate: 'circularOut',

      renderItem(params, api) {
        const idx = params.dataIndex;
        const x = +api.value(0) * api.getWidth();
        const y = +api.value(1) * api.getHeight();
        const size = 4;
        return {
          type: 'circle',
          // autoBatch: true,
          shape: {
            cx: x,
            cy: y,
            r: size / 2,
            // width: size,
            // height: size
          },
          style: {
            fill: 'rgba(255, 255, 255, 0.7)',
          },
        };
      },
    },
  },
  // grid
  {
    series: {
      animationEasingUpdate: 'cubicInOut',
      universalTransition: {
        // Need to disable universal transition to continue custom series animation
        enabled: false,
      },
      renderItem(params, api) {
        const idx = params.dataIndex;
        const m = idx % grid;
        const n = Math.floor(idx / grid);
        const x = (m / grid) * api.getWidth();
        const y = (n / grid) * api.getHeight();
        const size = 5;
        return {
          type: 'circle',
          // autoBatch: true,
          shape: {
            cx: x,
            cy: y,
            r: size / 2,
            // width: size,
            // height: size
          },
          transition: ['shape'],
          style: {
            fill: 'rgba(255, 255, 255, 0.7)',
          },
        };
      },
    },
  },
  // grid with size
  {
    series: {
      animationEasingUpdate: 'cubicInOut',
      renderItem(params, api) {
        const idx = params.dataIndex;
        const m = idx % grid;
        const n = Math.floor(idx / grid);
        const x = (m / grid) * api.getWidth();
        const y = (n / grid) * api.getHeight();
        const size = +api.value(2) * 10 + 3;
        return {
          type: 'circle',
          // autoBatch: true,
          shape: {
            cx: x,
            cy: y,
            r: size / 2,
          },
          transition: ['shape'],
          style: {
            fill: 'rgba(255, 255, 255, 0.7)',
          },
        };
      },
    },
  },
  // wave
  {
    series: {
      animationEasingUpdate: 'cubicInOut',
      renderItem(params, api) {
        const idx = params.dataIndex;
        const m = idx % grid;
        const n = Math.floor(idx / grid);
        const [x, y, z] = get3dcoords(m, n, 0);
        const size = ((+api.value(2) * 10 + 10) * fov) / (fov + z);
        const [x2d, y2d] = project3dcoords(
          x,
          y,
          z,
          api.getWidth(),
          api.getHeight()
        );
        return {
          type: 'circle',
          shape: {
            cx: x2d,
            cy: y2d,
            r: size / 2,
          },
          extra: {
            percent: 0,
          },
          transition: ['shape'],
          style: {
            fill: 'rgba(255, 255, 255, 0.7)',
          },
        };
      },
    },
  },

  {
    series: {
      animationEasingUpdate: 'linear',
      animationDurationUpdate: 5000,

      renderItem(params, api) {
        const idx = params.dataIndex;
        const m = idx % grid;
        const n = Math.floor(idx / grid);
        const [x, y, z] = get3dcoords(m, n, 0);
        // const size = Math.abs(n - grid / 2) + 5;
        const size = ((+api.value(2) * 10 + 10) * fov) / (fov + z);
        const w = api.getWidth();
        const h = api.getHeight();
        const [x2d, y2d] = project3dcoords(x, y, z, w, h);
        return {
          type: 'circle',
          shape: {
            cx: x2d,
            cy: y2d,
            r: size / 2,
          },
          extra: {
            percent: 1,
          },
          transition: 'extra',
          style: {
            fill: 'rgba(255, 255, 255, 0.7)',
          },
          during(duringApi) {
            const elapsedTime = (duringApi.getExtra('percent') as number) * 5;
            const [x, y, z] = get3dcoords(m, n, elapsedTime);
            const [x2d, y2d] = project3dcoords(x, y, z, w, h);
            duringApi.setShape('cx', x2d);
            duringApi.setShape('cy', y2d);
          },
        };
      },
    },
  },
  // To a line
  {
    series: {
      animationEasingUpdate: 'cubicOut',
      animationDurationUpdate: 200,
      animationDelayUpdate(idx) {
        return Math.random() * 500;
      },

      renderItem(params, api) {
        const idx = params.dataIndex;
        const m = idx % grid;
        const n = Math.floor(idx / grid);
        const [x, y, z] = get3dcoords(m, n, 0);
        const [x2d, y2d] = project3dcoords(
          x,
          y,
          z,
          api.getWidth(),
          api.getHeight()
        );
        return {
          type: 'circle',
          shape: {
            cx: x2d + Math.random() * 5,
            cy: api.getHeight() / 2,
            r: 1,
          },
          transition: ['shape'],
          style: {
            fill: 'rgba(255, 255, 255, 0.7)',
          },
        };
      },
    },
  },

  // To a dot
  {
    series: {
      animationEasingUpdate: 'cubicOut',
      animationDurationUpdate: 500,
      animationDelayUpdate: 0,

      renderItem(params, api) {
        return {
          type: 'circle',
          shape: {
            cx: api.getWidth() / 2,
            cy: api.getHeight() / 2,
            r: 0,
          },
          transition: ['shape'],
          style: {
            transition: ['opacity'],
            opacity: 0,
            fill: 'rgba(255, 255, 255, 0.7)',
          },
        };
      },
    },
  },
];

export default new Scene({
  option: waveOption,
  file: 'particles',
  title: 'Customized Particles Animation',
  // background: 'orange',
  background: '#707585',
  dark: true,
  duration: [700, 500, 1000, 500, 5000, 700, 500],
});
