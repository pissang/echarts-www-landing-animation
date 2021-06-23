import { EChartsOption } from 'echarts'

const funnel: EChartsOption = {
  duration: 1000,
  series: [
    {
      type: 'funnel',
      id: 'main',
      universalTransition: true,
      data: [
        {
          name: 'first',
          value: 9,
        },
        {
          name: 'second',
          value: 2,
        },
      ],
    },
  ],
}

export default funnel
