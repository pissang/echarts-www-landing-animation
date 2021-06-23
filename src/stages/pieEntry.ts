import { EChartsOption } from 'echarts'

const entryPie: EChartsOption = {
  legend: {
    top: '5%',
    left: 'center',
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: ['30%', '70%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 10,
        borderColor: '#000',
        borderWidth: 5,
      },
      label: {
        show: true,
      },
      labelLine: {
        show: true,
      },
      data: [
        { value: 1048, name: '搜索引擎' },
        { value: 735, name: '直接访问' },
        { value: 580, name: '邮件营销' },
        { value: 484, name: '联盟广告' },
        { value: 300, name: '视频广告' },
      ],
    },
  ],
}

export default entryPie
