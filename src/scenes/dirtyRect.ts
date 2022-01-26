import type { EChartsOption } from 'echarts';
import Scene, { GetOption } from '../components/Scene';

const option: (EChartsOption | GetOption)[] = [
  (chart) => {
    const xData: number[] = [];
    const yData: number[] = [];
    const data: number[][] = [];
    const rows = 20;
    const columns = Math.ceil((chart.getWidth() / chart.getHeight()) * rows);
    for (let i = 0; i <= columns; i++) {
      for (let j = 0; j <= rows; j++) {
        data.push([i, j, 0]);
      }
      xData.push(i);
    }
    for (let j = 0; j < rows; j++) {
      yData.push(j);
    }

    const symbolSize = Math.min(chart.getWidth(), chart.getHeight()) / rows;

    let dataIndex = 0;

    setInterval(() => {
      chart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: dataIndex - 1,
      });
      chart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: dataIndex++,
      });
    }, 100);

    return {
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      xAxis: {
        show: false,
        type: 'category',
        data: xData,
      },
      yAxis: {
        show: false,
        type: 'category',
        data: yData,
      },
      hoverLayerThreshold: 10000,
      series: [
        {
          name: 'Gaussian',
          type: 'scatter',
          data: data,
          symbolSize,
          symbol: 'rect',
          itemStyle: {
            opacity: 0.1,
          },
          emphasis: {
            itemStyle: {
              opacity: 1,
            },
          },
          stateAnimation: {
            duration: 300,
          },
          animationThreshold: 10000,
          progressiveThreshold: 10000,
        },
      ],
    };
  },
];

export default new Scene({
  option,
  duration: 800,
  file: 'dirtyRect',
  title: 'Dirty Rectangle Rendering',
  dark: true,
  background: '#001122',
});
