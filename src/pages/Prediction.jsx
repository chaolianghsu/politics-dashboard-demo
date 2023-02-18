import {
  Stack, Avatar, Typography,
} from '@mui/material'

import { PredictionCardGrid, HeaderBar } from '@/containers/prediction'

import KMDImg from '@/assets/pa01.png'

function Prediction() {
  return (
    <Stack spacing={2}>
      <HeaderBar
        text="最新當選率預測"
        note="預測更新期間：2023/01/18 ~ 2023/02/17"
      />
      <Stack alignItems="center" sx={{ width: '100%', color: 'customBlue.dark' }}>
        <Avatar
          src="https://images.alphacoders.com/443/443870.jpg"
          sx={{
            width: 120, height: 120, marginBottom: '1.2rem', border: '0.3rem solid #d8d8d8',
          }}
        />
        <Typography variant="h5" sx={{ fontSize: '2.2rem' }}>羅智強</Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <img src={KMDImg} alt="KMD" width={32} height={20} />
          <Typography variant="body1" sx={{ fontSize: '1.8rem' }}>47.68%</Typography>
        </Stack>
      </Stack>
      <HeaderBar
        text="羅智強 指標儀表板"
        note="數據調查期間：2023/01/18 ~ 2023/02/17"
      />
      <PredictionCardGrid />
    </Stack>
  )
}

Prediction.propTypes = {}

export default Prediction
