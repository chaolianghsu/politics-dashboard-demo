import { LineChart, BarChart, ColChart } from '@/components/charts'
import { Box } from '@mui/material'

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

function Demo() {
  return (
    <Box sx={{ height: '150vh' }}>
      <LineChart
        categories={fakeData.date}
        series={fakeData.data.map((d) => ({
          name: d.tn,
          data: d.g,
        }))}
      />
      <BarChart
        categories={fakeData.date}
        series={fakeData.data.map((d) => ({
          name: d.tn,
          data: d.g,
          color: '#8E9EE3',
        }))}
      />
      <ColChart
        series={[
          {
            name: '筆數',
            colorByPoint: true,
            data: [
              { name: '正評量', y: 2323 },
              { name: '負評', y: 1122 },
            ],
          },
        ]}
      />
    </Box>
  )
}

Demo.propTypes = {}

export default Demo
