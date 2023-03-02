import {
  Typography, Unstable_Grid2 as Grid, Stack, Box,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { Card, TitleData, DetailButton } from '@/components'

function ReputationSectionTwo() {
  const navigate = useNavigate()
  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={7}>
        <Card title={<Typography variant="h4">網路散播力</Typography>}>
          <Stack margin={1.5}>
            <Stack direction="row" spacing={3} sx={{ marginBottom: '2rem' }}>
              <Box sx={{ flex: '1' }}>
                <TitleData value={10} unit="channels" title="擴散廣度" />
              </Box>
              <Box sx={{ flex: '1' }}>
                <TitleData value={120} unit="piece" title="互動強度" />
              </Box>
            </Stack>
            <DetailButton onClick={() => navigate('/reputation/spread')} sx={{ marginLeft: 'auto' }}>
              詳細資料
            </DetailButton>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  )
}

ReputationSectionTwo.propTypes = {}

export default ReputationSectionTwo
