const genLineChartOption = ({ categories, series, onPointClick }) => {
  const colors = ['#647BDE', '#A4A1FB']

  const options = {
    chart: {
      type: 'areaspline',
      height: 290,
      scrollablePlotArea: {
        minWidth: 360,
        scrollPositionX: 1,
      },
    },
    colors,
    title: {
      text: '',
    },
    xAxis: {
      categories,
      labels: {
        style: {
          fontSize: '11px',
        },
      },
    },
    yAxis: {
      title: {
        text: '',
      },
    },
    plotOptions: {
      series: {
        cursor: 'pointer',
        point: {
          events: {
            click: onPointClick,
          },
        },
        dataLabels: {
          enabled: true,
          formatter() {
            return this.y.toLocaleString()
          },
          style: {
            color: '#647BDE',
            textOutline: 'none',
          },
        },
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      crosshairs: true,
      shared: true,
      formatter() {
        return `${this.x}<br/>筆數: <b>${this.y.toLocaleString()}</b>`
      },
    },
    credits: {
      enabled: false,
    },
    series: series.map((d, i) => ({
      name: d.name,
      data: d.data,
      fillColor: {
        linearGradient: {
          x1: 0, y1: 0, x2: 0, y2: 1,
        },
        stops: [
          [0, colors[i]],
          [1, 'rgba(255,255,255,.25)'],
        ],
      },
    })),
  }

  return options
}

export default genLineChartOption
