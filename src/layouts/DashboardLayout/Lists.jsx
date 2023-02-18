import {
  ListItemButton, ListItemText, styled, Box,
} from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import TrackChangesIcon from '@mui/icons-material/TrackChanges'
import EqualizerIcon from '@mui/icons-material/Equalizer'

const CustomItemText = styled(ListItemText)({
  textAlign: 'center',
  color: 'white',
  width: '12rem',
  margin: '.5rem auto',
  overflow: 'hidden',
})

const CustomItemButton = styled(ListItemButton)({
  height: '100%',
})
const activeBgColor = 'linear-gradient(rgb(103, 131, 255), rgb(75, 193, 255))'
const bgColor = '#fff'

export const navItems = [
  {
    id: 'prediction',
    label: '預測模組',
    getIcon: (color) => <TrackChangesIcon sx={{ fontSize: 65, color }} />,
  },
  {
    id: 'reputation',
    label: '聲譽模組',
    getIcon: (color) => <EqualizerIcon sx={{ fontSize: 65, color }} />,
  },
]

function Lists() {
  const currentLocation = useLocation().pathname.split('/')[1]

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
      }}
    >
      {navItems.map((item) => {
        const { id, label, getIcon } = item
        const isActive = currentLocation === id
        const textColor = isActive ? '#fff' : 'customGray.light'

        return (
          <Link
            key={id}
            style={{
              flexGrow: '1',
              textDecoration: 'none',
              minHeight: '15vh',
              maxHeight: '18vh',
            }}
            to={id}
          >
            <CustomItemButton
              sx={{
                background: isActive ? activeBgColor : bgColor,
              }}
            >
              <Box sx={{ width: '100%' }}>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  {getIcon(textColor)}
                </Box>
                <CustomItemText
                  primary={label}
                  primaryTypographyProps={{ fontSize: '1.5rem', color: textColor }}
                />
              </Box>
            </CustomItemButton>
          </Link>
        )
      })}
    </Box>
  )
}

Lists.propTypes = {}

export default Lists
