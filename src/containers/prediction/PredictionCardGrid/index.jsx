import { Unstable_Grid2 as Grid, Stack, Typography } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { useNavigate } from 'react-router-dom'

import { Card, CardTitle } from '@/components'
import contentConfig from './contentConfig'

function PredictionCardGrid() {
  const navigate = useNavigate()
  return (
    <Grid container spacing={1}>
      {contentConfig.map((cardContent) => (
        <Grid xs={12} md={6} lg={3} key={cardContent.title} sx={{ display: 'flex', cursor: 'pointer' }}>
          <Card
            sx={{ width: '100%' }}
            title={(
              <CardTitle
                title={cardContent.title}
                subTitle={cardContent.subTitle}
                mark={
                  cardContent.markNumber && (
                    <Stack alignItems="center" direction="row">
                      {cardContent.markNumber >= 0 ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                      {' '}
                      {cardContent.markNumber}
                      %
                    </Stack>
                  )
                }
                markColor={
                  cardContent.markNumber >= 0
                    ? 'customRed.dark'
                    : 'customGreen.main'
                }
              />
            )}
            icon={(
              <img
                src={cardContent.imgSrc}
                alt={cardContent.title}
                height={50}
                width={50}
              />
            )}
            onClick={() => navigate(cardContent.linkTo)}
          >
            <Typography
              variant="body2"
              sx={{ color: 'customGray.main', fontWeight: 'normal' }}
            >
              {cardContent.description}
            </Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

PredictionCardGrid.propTypes = {}

export default PredictionCardGrid
