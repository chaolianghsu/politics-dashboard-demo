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
}

function WordCloud({ data, chartContainerProps }) {
  return (
    <Box {...chartContainerProps}>
      <HighchartsReact
        highcharts={Highcharts}
        options={genWordCloudChartOption({
          data,
        })}
      />
    </Box>
  )
}

WordCloud.propTypes = WordCloudPropTypes

export default WordCloud
