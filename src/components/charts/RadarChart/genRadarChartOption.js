import HahaIcon from '@/assets/haha.png'
import SadIcon from '@/assets/sad.png'
import WowIcon from '@/assets/wow.png'
import HeartIcon from '@/assets/heart.png'
import AngryIcon from '@/assets/angry.png'

const ICON_SRC_MAP = {
  大心: HeartIcon,
  哈: HahaIcon,
  哇: WowIcon,
  嗚: SadIcon,
  怒: AngryIcon,
}

const genRadarChartOption = ({ series, categories }) => ({
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    polar: true,
    backgroundColor: 'transparent',
    height: 300,
    type: 'line',
  },
  colors: ['#46BBFF'],
  title: {
    text: '',
  },
  pane: {
    size: '80%',
  },
  legend: {
    enabled: false,
  },
  navigation: {
    buttonOptions: {
      enabled: false,
    },
  },
  credits: {
    enabled: false,
  },
  xAxis: {
    categories,
    tickmarkPlacement: 'on',
    lineWidth: 0,
    tickPosition: 'inside',
    labels: {
      useHTML: true,
      formatter() {
        const imgSrc = ICON_SRC_MAP[this.value]
        const label = `<div style="background: url('${imgSrc}') no-repeat 50% 50% /cover; width: 24px; height: 24px"></div>`
        return label
      },
    },
  },
  yAxis: {
    gridLineInterpolation: 'polygon',
    lineWidth: 0,
    gridLineWidth: 1,
    minorTickInterval: 2,
    tickInterval: 100,
    labels: {
      enabled: false,
    },
  },
  tooltip: {
    formatter() {
      return `<b>${this.key}: </b>${this.y.toLocaleString()}<p>筆</p>`
    },
  },
  plotOptions: {
    spline: {
      enableMouseTracking: false,
    },
    series: {
      marker: {
        radius: 3,
      },
    },
  },
  series: series.map((d) => ({
    ...d,
    pointPlacement: 'on',
    type: 'area',
  })),
  responsive: {
    rules: [{
      condition: {
        maxWidth: 500,
      },
      chartOptions: {
        pane: {
          size: '70%',
        },
      },
    }],
  },
})

export default genRadarChartOption
