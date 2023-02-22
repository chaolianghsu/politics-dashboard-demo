import { styled, Button } from '@mui/material'

const DetailButton = styled(Button)({
  border: 'none',
  width: '120px',
  height: '40px',
  cursor: 'pointer',
  background: 'linear-gradient(to bottom, #6588FF, #4CC0FF)',
  color: 'white',
  borderRadius: '10px',
  margin: '10px 0 0 auto',
  fontSize: '14px',
  textAlign: 'center',
  fontWeight: 'bold',
  lineHeight: '40px',
  '&.large': {
    width: '130px',
  },
})

export default DetailButton
