// eslint-disable-next-line max-len
// colors ['#8E9EE3', '#1BFBE4', '#FD8373', '#8b0707', '#8B46BD', '#aaaa11', '#22aa99', '#853785', '#66aa00', '#8A7F7D', '#d24675', '#D38A1B', '#42A881', '#D98179', '#008972']

const genBarChartOption = ({ categories, series }) => ({
  chart: {
    type: 'bar',
    height: 400,
  },
  title: {
    text: '',
  },
  xAxis: {
    categories,
    labels: {
      style: {
        fontSize: '13px',
      },
    },
  },
  yAxis: {
    title: {
      text: '',
    },
  },
  legend: {
    symbolWidth: 10,
    symbolHeight: 10,
    symbolRadius: 3,
  },
  credits: {
    enabled: false,
  },
  plotOptions: {
    series: {
      events: {
        legendItemClick() {
          return false
        },
      },
    },
  },
  series,
  lang: {
    numericSymbols: null,
    thousandsSep: ',',
  },
  tooltip: {
    formatter() {
      return `${this.key}<br/>筆數: <b>${this.y.toLocaleString()}</b>`
    },
  },
})

export default genBarChartOption
