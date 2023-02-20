const colors = ['#2454bb', '#436fa5', '#37a4ac', '#bd91c6', '#8dc2e8', '#61707d', '#718291', '#8397a8', '#98aaba', '#b5c1cc']

const genWordCloudChartOption = ({ data }) => ({
  series: [
    {
      type: 'wordcloud',
      data: data.map((d, i) => ({ ...d, color: colors[i] || colors[colors.length - 1] })),
      rotation: {
        from: 0,
        to: 0,
      },
      style: { fontFamily: '微軟正黑體' },
      maxFontSize: 50,
    },
  ],
  tooltip: {
    enabled: false,
  },
  title: {
    text: '',
  },
  credits: {
    enabled: false,
  },
  chart: {
    backgroundColor: 'transparent',
  },
})

export default genWordCloudChartOption
