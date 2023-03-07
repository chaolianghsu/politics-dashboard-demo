import PropTypes from 'prop-types'
import { CardContent, Typography } from '@mui/material'
import { Card, LineChart, TitleData } from '@/components'

const VolumeTrendCardPropTypes = {
  data: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      tn: PropTypes.string,
      q: PropTypes.string,
      g: PropTypes.arrayOf(PropTypes.number),
      pc: PropTypes.string,
      t: PropTypes.number,
    })),
    date: PropTypes.arrayOf(PropTypes.string),
    grow: PropTypes.string,
    total: PropTypes.number,
  }),
}
function VolumeTrendCard({ data }) {
  return (
    <Card
      title={<TitleData title="網路聲量" markNumber={data.grow} value={data.total} unit="percentage" />}
    >
      <CardContent sx={{
        marginLeft: '-0.5rem', display: 'flex', flexDirection: 'column', gap: '2rem',
      }}
      >
        <Typography
          variant="h4"
          sx={{
            color: 'customGray.main',
            fontSize: '2rem',
          }}
        >
          聲量趨勢
        </Typography>
        <LineChart
          categories={data.date}
          series={data.data.map((d) => ({
            name: d.tn,
            data: d.g,
          }))}
        />
      </CardContent>
    </Card>
  )
}

VolumeTrendCard.propTypes = VolumeTrendCardPropTypes

export default VolumeTrendCard
