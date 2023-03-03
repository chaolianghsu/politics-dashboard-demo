import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Stack } from '@mui/material'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import ReplyIcon from '@mui/icons-material/Reply'

import { HeaderBar, BlueButton } from '@/components'
import { PostListCard } from '@/containers'

function TextList() {
  const [tabValue, setTabValue] = useState(0)
  const handleTableValue = (e, newValue) => {
    setTabValue(newValue)
  }
  const navigate = useNavigate()
  return (
    <Stack spacing={2} sx={{ paddingBottom: '5rem' }}>
      <HeaderBar
        text="聲譽模組 / 熱門文章列表"
        note={(
          <BlueButton
            onClick={() => { navigate('/reputation') }}
          >
            <ReplyIcon />
            返回
          </BlueButton>
)}
        icon={<EqualizerIcon sx={{ fontSize: '3rem' }} />}
      />
      <PostListCard tabValue={tabValue} tabOnChange={handleTableValue} tabNames={['全部來源', '新聞', '社群', '討論區']} />
    </Stack>
  )
}

TextList.propTypes = {}

export default TextList
