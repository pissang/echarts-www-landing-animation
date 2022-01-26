import type { EChartsOption } from 'echarts';
import Scene, { GetOption } from '../components/Scene';

function generateDataset() {
  const pointCount = 1e6;
  let base = +new Date(2000, 9, 3);
  const values = new Float64Array(pointCount * 2);
  let off = 0;
  let y = Math.random() * 1e4;
  for (var j = 0; j < pointCount; j++) {
    y += Math.round(10 + Math.random() * -20);
    values[off++] = base += 1000 * 60;
    values[off++] = y;
  }
  return values;
}

const option: (EChartsOption | GetOption)[] = [
  {
    xAxis: {
      type: 'time',
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
      splitLine: {
        show: false,
      },
    },
    series: [
      {
        type: 'line',
        showSymbol: false,
        silent: true,
        dimensions: ['date', 'value'],
        data: generateDataset() as any,
      },
    ],
  },

  // (chart) => {},
];

export default new Scene({
  option,
  duration: 1000,
  file: 'realtimeLine',
  title: 'Time Series Line',
  dark: false,
});
