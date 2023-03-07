import { Box } from '@mui/material'
import Highcharts from 'highcharts'
import wordCloud from 'highcharts/modules/wordcloud'
import HighchartsReact from 'highcharts-react-official'
import PropTypes from 'prop-types'
import genWordCloudChartOption from './genWordCloudChartOption'

wordCloud(Highcharts)

const WordCloudPropTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, weight: PropTypes.number }),
  ),
  chartContainerProps: PropTypes.shape({}),
  background: PropTypes.bool,
  size: PropTypes.string,
}

function WordCloud({
  data, chartContainerProps, background, size = 'small',
}) {
  const archimedeanSpiral = function archimedeanSpiral(t) {
    return {
      x: t * Math.cos(t) * (size === 'small' ? 0.1 : 0.2),
      y: t * Math.sin(t) * (size === 'small' ? 0.2 : 0.1),
    }
  }
  Highcharts.seriesTypes.wordcloud.prototype.spirals.archimedean = archimedeanSpiral

  return (
    <Box {...chartContainerProps}>
      <HighchartsReact
        highcharts={Highcharts}
        options={genWordCloudChartOption({
          data, background, size,
        })}
        immutable
      />
    </Box>
  )
}

WordCloud.propTypes = WordCloudPropTypes

export default WordCloud
