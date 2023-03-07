import { Box } from '@mui/material'
import { Card, TitleData } from '@/components'
import PropTypes from 'prop-types'

function SpreadCard({ diffusionValue, interactionValue }) {
  return (
    <Card
      title={(
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <TitleData value={diffusionValue} unit="channels" title="擴散廣度" />
          <TitleData value={interactionValue} unit="piece" title="互動強度" />
        </Box>
      )}
    />
  )
}

SpreadCard.propTypes = {
  diffusionValue: PropTypes.number,
  interactionValue: PropTypes.number,
}

export default SpreadCard
