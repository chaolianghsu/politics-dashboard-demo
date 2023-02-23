import { Stack } from '@mui/material'
import LoginHeroImg from '@/assets/login-bg.jpg'

function Login() {
  return (
    <Stack direction="row">
      <img src={LoginHeroImg} alt="login-hero" />
    </Stack>
  )
}

Login.propTypes = {}

export default Login
