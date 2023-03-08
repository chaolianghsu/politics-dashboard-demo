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
  Typography,
  Popover,
} from '@mui/material'
import PropTypes from 'prop-types'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import dateFormat from 'dateformat'
import { addDays, startOfWeek, endOfWeek } from 'date-fns'
import { zhTW } from 'react-date-range/src/locale'
import { createStaticRanges } from 'react-date-range'
import { shallow } from 'zustand/shallow'
import { useNavigate } from 'react-router-dom'
import StyledDateRangePicker from './StyledDateRangePicker'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { useGlobalDateStore } from '../../../store'

function AppBar({
  drawerWidth, drawerOpen, toggleDrawer, height,
}) {
  const [userButtonAnchorEl, setUserButtonAnchorEl] = useState(null)
  const [datePickerAnchorEl, setDatePickerAnchorEl] = useState(null)
  const navigate = useNavigate()

  const handleClick = (event) => {
    setDatePickerAnchorEl(event.currentTarget)
  }
  const { startDate, endDate, updateDate } = useGlobalDateStore(
    (state) => ({
      startDate: state.startDate,
      endDate: state.endDate,
      updateDate: state.update,
    }),
    shallow,
  )
  const handleClose = () => {
    setDatePickerAnchorEl(null)
  }

  const open = Boolean(datePickerAnchorEl)
  const id = open ? 'simple-popover' : undefined
  const timeRanges = [
    {
      label: '昨天',
      range: () => ({
        startDate: addDays(new Date(), -1),
        endDate: addDays(new Date(), -1),
      }),
    },
    {
      label: '一週內',
      range: () => ({
        startDate: startOfWeek(new Date()),
        endDate: endOfWeek(new Date()),
      }),
    },
    {
      label: '上一週',
      range: () => ({
        startDate: startOfWeek(addDays(new Date(), -7)),
        endDate: endOfWeek(addDays(new Date(), -7)),
      }),
    },
    {
      label: '上上一週',
      range: () => ({
        startDate: startOfWeek(addDays(new Date(), -14)),
        endDate: endOfWeek(addDays(new Date(), -14)),
      }),
    },
  ]
  const ranges = [...createStaticRanges(timeRanges)]
  const [dateState, setDateState] = useState({
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    key: 'selection',
  })
  const handleUserMenuClick = (e) => {
    setUserButtonAnchorEl(e.currentTarget)
  }
  const handleUserMenuClose = () => {
    setUserButtonAnchorEl(null)
  }
  const handleOnLogout = () => {
    localStorage.removeItem('politics_access')
    localStorage.removeItem('politics_refresh')
    handleUserMenuClose()
    navigate('/login', { replace: true })
  }
  const handleQueryDateOnChange = () => {
    updateDate({ startDate: dateState.startDate, endDate: dateState.endDate })
    setDatePickerAnchorEl(null)
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
      <Toolbar
        sx={{
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
            <Box>
              <Button
                size="small"
                variant="outlined"
                color="customGray"
                onClick={handleClick}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    color: 'black',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: '1.2rem', sm: '1.4rem' },
                      marginRight: '.5rem',
                      fontWeight: '400',
                    }}
                    noWrap
                    flexShrink={0}
                  >
                    調查期間
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: '500',
                      fontSize: { xs: '1.2rem', sm: '1.6rem' },
                    }}
                    noWrap
                  >
                    {`${dateFormat(
                      startDate.toString(),
                      'yyyy-mm-dd',
                    )} ~ ${dateFormat(endDate.toString(), 'yyyy-mm-dd')}`}
                  </Typography>
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </Box>
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={datePickerAnchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <StyledDateRangePicker
                  ranges={[dateState]}
                  onChange={(item) => {
                    setDateState(item.selection)
                  }}
                  locale={zhTW}
                  showSelectPreview
                  moveRangeOnFirstSelection={false}
                  staticRanges={ranges}
                  inputRanges={[]}
                  maxDate={addDays(new Date(), -1)}
                />
                <Box sx={{ paddingLeft: '1rem', paddingBottom: '1rem' }}>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={handleQueryDateOnChange}
                  >
                    <Typography variant="button" sx={{ color: 'white' }}>
                      查詢
                    </Typography>
                  </Button>
                </Box>
              </Popover>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Button
              disableElevation
              onClick={handleUserMenuClick}
              endIcon={<KeyboardArrowDownIcon sx={{ marginLeft: '-0.8rem' }} />}
              sx={{ p: 0, px: 0, minWidth: '0px' }}
            >
              <Avatar
                sx={{
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
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
AppBar.propTypes = AppBarProps
export default AppBar
