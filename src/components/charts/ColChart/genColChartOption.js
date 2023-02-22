// ['#8E9EE3', '#1BFBE4', '#934DFC']

const genColChartOption = ({ series }) => (
  {
    chart: {
      type: 'column',
      height: 320,
    },
    colors: ['#8E9EE3', '#1BFBE4', '#934DFC'],
    title: {
      text: '',
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {
      min: 0,
      title: {
        text: '',
      },
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    series,
    tooltip: {
      formatter() {
        return `${this.key}<br/>筆數: <b>${this.y.toLocaleString()}</b>`
      },
    },
  }
)

export default genColChartOption
