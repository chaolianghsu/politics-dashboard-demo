import { Stack } from '@mui/material'
import EqualizerIcon from '@mui/icons-material/Equalizer'

import { HeaderBar } from '@/components'
import { ReputationSectionOne, ReputationSectionTwo } from '@/containers/reputation'

function Reputation() {
  return (
    <Stack spacing={2} paddingBottom="2rem">
      <HeaderBar
        text="聲譽模組"
        icon={<EqualizerIcon sx={{ fontSize: '3rem' }} />}
      />
      <ReputationSectionOne />
      <ReputationSectionTwo />
    </Stack>
  )
}

Reputation.propTypes = {}

export default Reputation
