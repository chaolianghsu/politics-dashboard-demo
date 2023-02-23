import { useNavigate } from 'react-router-dom'
import { Stack } from '@mui/material'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import ReplyIcon from '@mui/icons-material/Reply'

import { HeaderBar, BlueButton } from '@/components'
import { SpreadCard } from '@/containers/spread'
import { PostListCard } from '@/containers'

function Spread() {
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
      <SpreadCard />
      <PostListCard />
    </Stack>
  )
}

Spread.propTypes = {}

export default Spread
