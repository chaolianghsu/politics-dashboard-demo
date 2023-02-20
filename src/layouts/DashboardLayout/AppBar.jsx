import { useState } from 'react'
import {
  AppBar as MuiAppBar,
  Toolbar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material'
import PropTypes from 'prop-types'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'

function AppBar({
  drawerWidth, drawerOpen, toggleDrawer, height,
}) {
  const [userButtonAnchorEl, setUserButtonAnchorEl] = useState(null)

  const handleUserMenuClick = (e) => {
    setUserButtonAnchorEl(e.currentTarget)
  }
  const handleUserMenuClose = () => {
    setUserButtonAnchorEl(null)
  }
  const handleOnLogout = () => {
    // localStorage.removeItem('token')
    // localStorage.removeItem('refreshToken')
    // handleUserMenuClose()
    // navigate('/login', { replace: true })
  }

  return (
    <MuiAppBar
      position="fixed"
      sx={{
        width: drawerOpen ? `calc(100% - ${drawerWidth}px)` : '100%',
        backgroundColor: 'white',
        transition: '.35s',
        ...(drawerOpen && { marginLeft: `${drawerWidth}px` }),
      }}
    >
      <Toolbar sx={{
        '@media all': {
          minHeight: height,
        },
      }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', width: '80%' }}>
            <IconButton
              edge="start"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{ marginRight: '1rem' }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box sx={{
            display: 'flex', alignItems: 'center',
          }}
          >
            <Button
              disableElevation
              onClick={handleUserMenuClick}
              endIcon={<KeyboardArrowDownIcon />}
              sx={{ p: 0, px: 1, minWidth: '0px' }}
            >
              <Avatar sx={{
                width: '32px',
                height: '32px',
                backgroundColor: (theme) => theme.palette.customDeepBlue.main,
              }}
              >
                A
              </Avatar>
            </Button>
            <Menu
              anchorEl={userButtonAnchorEl}
              open={Boolean(userButtonAnchorEl)}
              onClose={handleUserMenuClose}
              anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
              transformOrigin={{ horizontal: 'center', vertical: 'top' }}
            >
              <MenuItem onClick={handleOnLogout}>
                <ListItemIcon>
                  <LogoutRoundedIcon />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </MuiAppBar>
  )
}

const AppBarProps = {
  drawerWidth: PropTypes.number,
  drawerOpen: PropTypes.bool,
  toggleDrawer: PropTypes.func,
  height: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number,
  ]),
}
AppBar.propTypes = AppBarProps
export default AppBar
