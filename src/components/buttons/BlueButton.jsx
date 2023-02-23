import { styled, Button } from '@mui/material'

const BlueButton = styled(Button)({
  border: 0,
  padding: '0 20px',
  lineHeight: '40px',
  fontSize: '18px',
  backgroundColor: '#4DBDFF',
  color: '#fff',
  borderRadius: '3px',
  '&:hover': {
    backgroundColor: '#4DBDFF80',
  },
  '&.Mui-disabled': {
    backgroundColor: '#4DBDFF40',
  },
  '& svg': {
    marginRight: '3px',
    position: 'relative',
    marginLeft: '-8px',
  },
})

export default BlueButton
