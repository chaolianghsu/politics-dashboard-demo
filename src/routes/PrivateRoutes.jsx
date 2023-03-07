import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { authAPI } from '@/apis'

function PrivateRoutes() {
  const location = useLocation()
  const navigate = useNavigate()

  const { mutate } = useMutation(authAPI.verifyToken, {
    onSuccess: () => {},
    onError: () => {
      navigate('/login', { replace: true, state: { from: location } })
    },
  })

  useEffect(() => {
    const access = localStorage.getItem('politics_access') || ''
    mutate({ access })
  }, [location, mutate, navigate])

  return <Outlet />
}

export default PrivateRoutes
