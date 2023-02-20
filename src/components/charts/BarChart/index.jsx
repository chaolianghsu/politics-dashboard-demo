import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { Box } from '@mui/material'
import PropTypes from 'prop-types'

import genBarChartOption from './genBarChartOption'

const BarChartPropTypes = {
  categories: PropTypes.arrayOf(PropTypes.string),
  series: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      data: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.number, PropTypes.shape({})]),
      ),
      color: PropTypes.string,
    }),
  ),
  chartContainerProps: PropTypes.shape({}),
  barColor: PropTypes.string,
}

function BarChart({
  categories,
  series,
  chartContainerProps,
  barColor = '#8E9EE3',
}) {
  return (
    <Box {...chartContainerProps}>
      <HighchartsReact
        highcharts={Highcharts}
        options={genBarChartOption({
          categories,
          series,
          barColor,
        })}
      />
    </Box>
  )
}

BarChart.propTypes = BarChartPropTypes

export default BarChart
