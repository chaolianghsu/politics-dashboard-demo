import { useState, useRef } from 'react'
import {
  TextField, Stack, Button, Typography, Box,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import ReCAPTCHA from 'react-google-recaptcha'
import { useMutation } from '@tanstack/react-query'

import { axiosInstance } from '@/apis'
import { getToken } from '@/apis/source/auth'
import LogoLoginImg from '@/assets/logo-login.png'

function LoginForm() {
  const [isRobot, setIsRobot] = useState(true)
  const navigate = useNavigate()
  const recaptchaRef = useRef(null)
  const { register, handleSubmit, formState: { errors, isSubmitted } } = useForm()

  const { mutate } = useMutation({
    mutationFn: getToken,
    onSuccess: (res) => {
      const { access, refresh } = res
      localStorage.setItem('politics_access', access)
      localStorage.setItem('politics_refresh', refresh)
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${access}`
      navigate('/reputation')
    },
  })

  const handleOnRecaptchChange = () => {
    setIsRobot(false)
  }

  const onSubmit = (d) => {
    mutate({ email: d.account, password: d.password })
  }

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ marginX: 'auto', width: '26rem' }}
    >
      <Box sx={{ width: '23rem' }}>
        <img src={LogoLoginImg} alt="logo-login" style={{ width: '100%' }} />
      </Box>
      <Typography
        sx={{
          color: 'customGray.light',
          fontSize: '1.6rem',
          fontWeight: 'normal',
        }}
        variant="h5"
      >
        歡迎回來！請登入您的帳號密碼
      </Typography>
      <Stack
        sx={{ marginY: '5rem' }}
        spacing={3}
        textAlign="center"
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          name="account"
          fullWidth
          label="帳號"
          variant="standard"
          color="customGray"
          error={!!errors.account}
          helperText={errors.account?.message}
          {...register('account', { required: '請輸入帳號' })}
        />
        <TextField
          name="password"
          fullWidth
          label="密碼"
          variant="standard"
          color="customGray"
          type="password"
          error={!!errors.account}
          helperText={errors.account?.message}
          {...register('password', { required: '請輸入密碼' })}
        />
        <Box sx={{ '&>div': { width: '100%' } }}>
          <ReCAPTCHA
            onChange={handleOnRecaptchChange}
            ref={recaptchaRef}
            sitekey="6LcP1KckAAAAADlDotybpQJI2Ouzp8uj1jMffpS3"
            hl="zh-TW"
          />
          {(isSubmitted && isRobot) && (
          <Typography sx={{ textAlign: 'left', fontSize: '1.2rem', color: '#d32f2f' }}>
            請進行驗證
          </Typography>
          )}
        </Box>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#4c607e',
            width: '100%',
            padding: '1rem',
            fontWeight: 'bold',
          }}
          type="submit"
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
