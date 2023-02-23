import { Box } from '@mui/material'
import { Card, TitleData } from '@/components'

const markNumber = 12.5
function SpreadCard() {
  return (
    <Card
      title={(
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <TitleData markNumber={markNumber} unit="channels" title="擴散廣度" />
          <TitleData markNumber={markNumber} unit="piece" title="互動強度" />
        </Box>
)}
    />
  )
}

SpreadCard.propTypes = {}

export default SpreadCard
