import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { Box } from '@mui/material'
import PropTypes from 'prop-types'

import genColChartOption from './genColChartOption'

const ColChartPropTypes = {
  categories: PropTypes.arrayOf(PropTypes.string),
  series: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      data: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.number, PropTypes.shape({})]),
      ),
      colorByPoint: PropTypes.bool,
    }),
  ),
  chartContainerProps: PropTypes.shape({}),
}

function ColChart({
  categories,
  series,
  chartContainerProps,
}) {
  return (
    <Box {...chartContainerProps}>
      <HighchartsReact
        highcharts={Highcharts}
        options={genColChartOption({
          categories,
          series,
        })}
      />
    </Box>
  )
}

ColChart.propTypes = ColChartPropTypes

export default ColChart
