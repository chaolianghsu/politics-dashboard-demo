import PropTypes from 'prop-types'
import { Unstable_Grid2 as Grid, Stack, Typography } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { useNavigate } from 'react-router-dom'

import { Card, CardTitle } from '@/components'
import contentConfig from './contentConfig'

const titleConfig = {
  網路聲量: 'vol',
  聲譽值: 'reputation',
  好感度: 'favorability',
  互動強度: 'interaction',
  擴散廣度: 'diffusion',
  社群互動力: 'social_rc',
  粉絲觸及力: 'social_touch',
}

function PredictionCardGrid({ data }) {
  const navigate = useNavigate()

  const dataFormat = contentConfig.map((item) => {
    if (data[titleConfig[item.title]]) {
      if (item.title === '互動強度') {
        return {
          ...item,
          subTitle: `${data[titleConfig[item.title]].total ?? data[titleConfig[item.title]]}則`,
          markNumber: data[titleConfig[item.title]].grow ?? null,
        }
      }
      return {
        ...item,
        subTitle: data[titleConfig[item.title]].total ?? data[titleConfig[item.title]],
        markNumber: data[titleConfig[item.title]].grow ?? null,
      }
    }
    return item
  })
  return (
    <Grid container spacing={1}>
      {dataFormat.map((cardContent) => (
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

PredictionCardGrid.propTypes = {
  data: PropTypes.shape({
    date: PropTypes.string,
    diffusion: PropTypes.number,
    favorability: PropTypes.shape({
      total: PropTypes.number,
      grow: PropTypes.string,
    }),
    interaction: PropTypes.number,
    reputation: PropTypes.shape({
      total: PropTypes.number,
      grow: PropTypes.number,
    }),
    social_rc: PropTypes.number,
    social_touch: PropTypes.number,
    update: PropTypes.string,
    vol: PropTypes.shape({
      total: PropTypes.number,
      grow: PropTypes.string,
    }),
  }),
}

export default PredictionCardGrid
