import Scene, { GetOption } from '../components/Scene';

const option: GetOption[] = [
  (chart) => ({
    graphic: {
      elements: [
        {
          type: 'text',
          left: 'center',
          top: 'center',
          style: {
            text: 'Apache ECharts',
            fontSize: Math.round(chart.getWidth() / 15),
            fontWeight: 'bold',
            lineDash: [0, 200],
            lineDashOffset: 0,
            fill: 'transparent',
            stroke: '#000',
            lineWidth: 1,
            fontFamily: `'Open Sans', 'Open Sans Condensed', sans-serif`,
          },
          keyframeAnimation: {
            duration: 2000,
            keyframes: [
              {
                percent: 0.7,
                style: {
                  fill: 'transparent',
                  lineDashOffset: 200,
                  lineDash: [200, 0],
                },
              },
              {
                // Stop for a while.
                percent: 0.8,
                style: {
                  fill: 'transparent',
                },
              },
              {
                percent: 1,
                style: {
                  fill: 'black',
                },
              },
            ],
          },
        },
      ],
    },
  }),
];
export default new Scene({
  option,
  duration: 3000,
  title: '',
  dark: false,
});
