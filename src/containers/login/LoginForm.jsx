import { useState } from 'react'
import {
  TextField, Stack, Button, Typography, Box,
} from '@mui/material'

import LogoLoginImg from '@/assets/logo-login.png'

function LoginForm() {
  const [formInfo, setFormInfo] = useState({ account: '', password: '' })

  const handleChange = (e) => {
    setFormInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleLogin = () => {
    console.log(formInfo)
  }

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ marginX: 'auto' }}
    >
      <Box sx={{ width: '26rem' }}>
        <img src={LogoLoginImg} alt="logo-login" style={{ width: '100%' }} />
      </Box>

      <Typography
        sx={{
          color: 'customGray.light',
          fontSize: '1.8rem',
          fontWeight: 'normal',
        }}
        variant="h5"
      >
        歡迎回來！請登入您的帳號密碼
      </Typography>
      <Stack sx={{ marginY: '5rem', width: '36rem' }} spacing={3}>
        <TextField name="account" onChange={handleChange} label="帳號" variant="standard" color="customGray" />
        <TextField name="password" onChange={handleChange} label="密碼" variant="standard" color="customGray" />
        <Button
          onClick={handleLogin}
          variant="contained"
          sx={{
            backgroundColor: '#4c607e', width: '100%', padding: '1rem', fontWeight: 'bold',
          }}
        >
          登入
        </Button>
      </Stack>

      <Box
        sx={{
          textAlign: 'center',
          color: 'customGray.main',
          pb: '2.5rem',
        }}
      >
        <Typography
          variant="body2"
          sx={{ fontSize: '1.4rem', fontWeight: 'normal' }}
        >
          Copyright © 2023 大數據股份有限公司
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: '1.4rem', fontWeight: 'normal' }}
        >
          All rights reserved
        </Typography>
      </Box>
    </Stack>
  )
}

LoginForm.propTypes = {}

export default LoginForm
