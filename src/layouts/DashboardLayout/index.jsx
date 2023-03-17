import { useState, useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import {
  Drawer, Box, useTheme, useMediaQuery, Typography, Stack,
} from '@mui/material'
import AppBar from './AppBar'
import Logo from './Logo'
import Lists from './Lists'

const staticDrawerWidth = 180
const topBarHeight = 54
const duration = 350

function DashboardLayout() {
  const theme = useTheme()
  const location = useLocation()
  const scrollId = location?.state?.scrollTarget

  const ref = useRef(null)

  const [drawerOpen, setDrawerOpen] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const drawerWidth = isMobile ? 0 : staticDrawerWidth

  const handleMobileDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  // navigate到reputation的子頁面自動滑到最上面
  useEffect(() => {
    if (ref.current) {
      if (scrollId === 'section_three') {
        ref.current.scrollTop = isMobile ? 3500 : 5000
        return
      } if (scrollId === 'reputation') {
        ref.current.scrollTop = 189
        return
      }
      ref.current.scrollTop = 0
    }
  }, [scrollId, isMobile])
  const toggleDrawer = () => {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, duration)

    return isMobile ? handleMobileDrawerToggle() : setDrawerOpen(!drawerOpen)
  }

  return (
    <>
      <AppBar
        height={topBarHeight}
        drawerWidth={drawerWidth}
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
      />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth } }}
      >
        <Drawer
          ModalProps={{ keepMounted: true }}
          variant="permanent"
          sx={{
            display: { sm: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerOpen ? drawerWidth : 0,
              transition: `${duration / 1000}s`,
            },
          }}
        >
          <Logo />
          <Lists />
        </Drawer>

        {/* For mobile */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleMobileDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { sm: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: staticDrawerWidth },
          }}
        >
          <Logo />
          <Lists />
        </Drawer>
      </Box>
      <Stack
        sx={{
          ml: drawerOpen ? `${drawerWidth}px` : 0,
          mt: `${topBarHeight}px`,
          transition: `${duration / 1000}s`,
          overflowY: 'scroll',
          height: `calc(100% - ${topBarHeight}px)`,
        }}
        ref={ref}
      >
        <Box
          sx={{
            marginTop: '3.4rem',
            padding: {
              xs: '0 4px',
              sm: '0 16px',
              md: '0 28px',
            },
            paddingBottom: '54px',
          }}
        >
          <Outlet />
        </Box>
        <Box sx={{
          textAlign: 'center', mt: 'auto', color: 'customGray.light', pb: '2.5rem',
        }}
        >
          <Typography variant="body2" sx={{ fontSize: '1.4rem', fontWeight: 'normal' }}>
            Copyright © 2023 大數據股份有限公司
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '1.4rem', fontWeight: 'normal' }}>
            All rights reserved
          </Typography>
        </Box>
      </Stack>
    </>
  )
}

export default DashboardLayout
