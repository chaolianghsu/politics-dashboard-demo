import { useNavigate } from 'react-router-dom'
import { Stack } from '@mui/material'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import ReplyIcon from '@mui/icons-material/Reply'

import { HeaderBar, BlueButton } from '@/components'
import { VolumeTrendCard } from '@/containers/volume'
import { PostListCard } from '@/containers'

function Volume() {
  const navigate = useNavigate()
  return (
    <Stack spacing={2} sx={{ paddingBottom: '5rem' }}>
      <HeaderBar
        text="聲譽模組 / 網路聲量"
        note={(
          <BlueButton
            onClick={() => { navigate('/reputation') }}
          >
            {' '}
            <ReplyIcon />
            返回
          </BlueButton>
)}
        icon={<EqualizerIcon sx={{ fontSize: '3rem' }} />}
      />
      <VolumeTrendCard />
      <PostListCard />
    </Stack>
  )
}

Volume.propTypes = {}

export default Volume
