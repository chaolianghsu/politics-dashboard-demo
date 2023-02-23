import PropTypes from 'prop-types'
import { Stack, Typography } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const descriptionConfigs = {
  聲譽值: '綜合評量網路聲量與好感度，數值越高代表聲譽越佳。',
  網路聲量: '網路上提及自己討論數，筆數越多表示討論度越高。',
  好感度: '網路上的好感程度，正評越多且負評越少，好感度越高。',
  擴散廣度: '相關新聞出現的頻道數量，數值越高表示新聞擴散越廣。',
  互動強度: '在社群、討論區、部落格中，平均每篇文章有多少留言數，數值越高表示互動強度越高。',
  粉絲觸及力: '估計粉專經常互動的人數。',
  社群互動力: '按讚數、留言數及分享數的加總，數值越高表示互動程度越高。',
  平均互動力: '平均每位經常互動者會有多少互動數。',
}
function TitleData({ title, markNumber, unit }) {
  // 單位
  const TypesConfig = {
    percentage: (
      <Typography
        sx={{
          color: markNumber >= 0 ? 'customRed.dark' : 'customGreen.main',
          display: 'flex',
          alignItems: 'center',
          fontSize: '1.4rem',
        }}
      >
        {markNumber >= 0 ? (
          <KeyboardArrowUpIcon />
        ) : (
          <KeyboardArrowDownIcon />
        )}
        {' '}
        {markNumber}
        %
      </Typography>),
    channels: <Typography sx={{ marginLeft: '1rem' }}>頻道數</Typography>,
    piece: <Typography sx={{ marginLeft: '1rem' }}>則</Typography>,
    people: <Typography sx={{ marginLeft: '1rem' }}>人</Typography>,
    none: '',
  }
  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={2} alignItems="end">
        <Typography
          variant="h4"
          sx={{
            color: 'customGray.main',
            fontSize: '2rem',
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="h4"
          sx={{
            color: 'customPurple.main',
            fontSize: '3rem',
          }}
        >
          8,810
        </Typography>
        {TypesConfig[unit]}
      </Stack>
      <Typography variant="body1" sx={{ color: 'customGray.light', fontSize: '1.5rem' }}>
        {descriptionConfigs[title]}
      </Typography>
    </Stack>
  )
}

TitleData.propTypes = {
  markNumber: PropTypes.number,
  unit: PropTypes.string,
  title: PropTypes.string,
}

export default TitleData
