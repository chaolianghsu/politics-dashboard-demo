import { useNavigate } from 'react-router-dom'
import { Stack } from '@mui/material'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import ReplyIcon from '@mui/icons-material/Reply'

import { HeaderBar, BlueButton } from '@/components'
import { FavorabilityCard } from '@/containers/favorability'
import { PostListCard } from '@/containers'

function Favorability() {
  const navigate = useNavigate()
  return (
    <Stack spacing={2} sx={{ paddingBottom: '5rem' }}>
      <HeaderBar
        text="聲譽模組 / 好感度
        "
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
      <FavorabilityCard />
      <PostListCard />
    </Stack>
  )
}

Favorability.propTypes = {}

export default Favorability
