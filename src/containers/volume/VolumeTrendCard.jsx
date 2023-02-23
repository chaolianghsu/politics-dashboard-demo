import { CardContent, Typography } from '@mui/material'
import { Card, LineChart, TitleData } from '@/components'

const markNumber = 12.5
const fakeData = {
  date: [
    '2023/02/14',
    '2023/02/15',
    '2023/02/16',
    '2023/02/17',
    '2023/02/18',
    '2023/02/19',
    '2023/02/20',
  ],
  data: [
    {
      tn: '羅智強',
      q: '(羅智強|羅小強|羅痔瘡|羅智|羅智弱|羅自戕|騾子強)',
      g: [1424, 1967, 1191, 1557, 1465, 1071, 428],
      pc: '100.0%',
      t: 9103,
    },
  ],
  total: 9103,
  grow: '-51.05',
}
function VolumeTrendCard() {
  return (
    <Card
      title={<TitleData markNumber={markNumber} />}
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
          categories={fakeData.date}
          series={fakeData.data.map((d) => ({
            name: d.tn,
            data: d.g,
          }))}
        />
      </CardContent>
    </Card>
  )
}

VolumeTrendCard.propTypes = {}

export default VolumeTrendCard
