import { LineChart, BarChart } from '@/components/charts'

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
      g: [
        1424,
        1967,
        1191,
        1557,
        1465,
        1071,
        428,
      ],
      pc: '100.0%',
      t: 9103,
    },
  ],
  total: 9103,
  grow: '-51.05',
}

function Demo() {
  return (
    <>
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

    </>
  )
}

Demo.propTypes = {}

export default Demo
