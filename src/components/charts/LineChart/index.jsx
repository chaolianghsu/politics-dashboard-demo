import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { Box } from '@mui/material'
import PropTypes from 'prop-types'

import genLineChartOption from './genLineChartOption'

const LineChartPropTypes = {
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

function LineChart({
  categories,
  series,
  chartContainerProps,
  onChartPointClick = () => {},
}) {
  return (
    <Box {...chartContainerProps}>
      <HighchartsReact
        highcharts={Highcharts}
        options={genLineChartOption({
          categories,
          series,
          onPointClick: onChartPointClick,
        })}
      />
    </Box>
  )
}

LineChart.propTypes = LineChartPropTypes

export default LineChart
