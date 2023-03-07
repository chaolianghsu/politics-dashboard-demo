import PropTypes from 'prop-types'
import { Box, Typography, Stack } from '@mui/material'
import { Card, TitleData } from '@/components'

const FavorabilityCardPropTypes = {
  data: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      senti: PropTypes.string,
      g: PropTypes.arrayOf(PropTypes.number),
      pc: PropTypes.string,
      t: PropTypes.number,
    })),
    date: PropTypes.arrayOf(PropTypes.string),
    grow: PropTypes.string,
    pn: PropTypes.number,
  }),
}
function FavorabilityCard({ data }) {
  return (
    <Card
      title={(
        <Box sx={{
          width: '100%',
          display: 'flex',
          flexDirection: {
            xs: 'column',
            lg: 'row',
          },
          justifyContent: 'space-between',
        }}
        >
          <TitleData markNumber={data.grow} value={data.pn} unit="percentage" title="好感度" />
          <Stack
            direction={{
              xs: 'column',
              lg: 'row',
            }}
            sx={{
              marginTop: {
                xs: '3rem',
                lg: '0',
              },
              marginBottom: '3rem',
              width: '50%',
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              alignItems="end"
              sx={{
                width: {
                  xs: 'auto',
                  lg: '50%',
                },
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: 'customGray.main',
                  fontSize: '2rem',
                }}
              >
                正評
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  color: 'customPurple.main',
                  fontSize: '3rem',
                }}
              >
                {data.data[0].t}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  color: 'customGray.main',
                  fontSize: '2rem',
                }}
              >
                筆
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="end">
              <Typography
                variant="h4"
                sx={{
                  color: 'customGray.main',
                  fontSize: '2rem',
                }}
              >
                負評
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  color: 'customLightBlue.main',
                  fontSize: '3rem',
                }}
              >
                {data.data[2].t}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  color: 'customGray.main',
                  fontSize: '2rem',
                }}
              >
                筆
              </Typography>
            </Stack>
          </Stack>
        </Box>
)}
    />
  )
}

FavorabilityCard.propTypes = FavorabilityCardPropTypes

export default FavorabilityCard
