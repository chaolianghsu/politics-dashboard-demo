import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HCMore from 'highcharts/highcharts-more'
import { Box } from '@mui/material'
import PropTypes from 'prop-types'

import genRadarChartOption from './genRadarChartOption'

HCMore(Highcharts)

const RadarChartPropTypes = {
  categories: PropTypes.arrayOf(PropTypes.string),
  series: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      data: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.number, PropTypes.shape({})]),
      ),
    }),
  ),
  chartContainerProps: PropTypes.shape({}),
  onChartPointClick: PropTypes.func,
}

function RadarChart({
  categories,
  series,
  chartContainerProps,
}) {
  return (
    <Box {...chartContainerProps}>
      <HighchartsReact
        highcharts={Highcharts}
        options={genRadarChartOption({
          categories,
          series,
        })}
      />
    </Box>
  )
}

RadarChart.propTypes = RadarChartPropTypes

export default RadarChart
