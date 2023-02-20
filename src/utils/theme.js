import { createTheme } from '@mui/material'
import { zhTW } from '@mui/material/locale'

const themeBreakpoint = createTheme()

const theme = createTheme({
  typography: {
    htmlFontSize: 10,
    fontFamily: 'Microsoft JhengHei, Arial',
    lineHeight: 0,
    h1: {
      fontSize: '4rem',
      fontWeight: 'bold',
      letterSpacing: '0',
      fontFamily: 'Montserrat, sans-serif',
    },
    h2: {
      fontSize: '3rem',
      fontWeight: 'bold',
      letterSpacing: '0',
    },
    h3: {
      fontSize: '3rem',
      fontWeight: 'bold',
      letterSpacing: '0',
      fontFamily: 'Montserrat, sans-serif',
    },
    h4: {
      fontSize: '2.4rem',
      fontWeight: 'bold',
      fontFamily: 'Montserrat, sans-serif',
    },
    h5: {
      fontSize: '2rem',
      fontWeight: '600',
      fontFamily: 'Montserrat, sans-serif',
    },
    body1: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
    },
    body2: {
      fontSize: '1.6rem',
      fontWeight: 'bold',
      fontFamily: 'Montserrat, sans-serif',
    },
    button: {
      textTransform: 'none',
    },
  },
  palette: {
    background: {
      default: '#EEEEEE',
    },
    customDeepBlue: {
      main: '#4C607E',
      light: '#36465f',
    },
    customGray: {
      main: '#4D4F5C',
      light: '#849fb4',
    },
    customBlue: {
      main: '#55D8FE',
    },
    customYellow: {
      main: '#FFDA83',
    },
    customRed: {
      main: '#FF8373',
      dark: '#d50000',
    },
    customWhite: {
      main: '#ffffff',
    },
    customGreen: {
      main: '#00CC27',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 7px rgba(0, 0, 0, 0.2)',
            backgroundColor: '#f5f5f5',
            borderRadius: '10px',
          },
          '*::-webkit-scrollbar': {
            height: '8px',
            width: '10px',
            backgroundColor: '#f5f5f5',
            borderRadius: '10px',
          },
          '*::-webkit-scrollbar-thumb': {
            borderRadius: '10px',
            backgroundColor: 'rgb(182, 182, 182)',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          '&:hover': {
            backgroundColor: '#4C607E40',
          },
          '&.Mui-selected': {
            backgroundColor: '#4C607E',
            '&:hover': {
              backgroundColor: '#4C607E40',
            },
            '&.Mui-focusVisible': { background: '#4C607E' },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: '6px 6px 8px rgba(0, 0, 0, 0.1)',
          padding: '8px',
          overflow: 'auto',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          [themeBreakpoint.breakpoints.between('xs', 'sm')]: {
            padding: '4px',
          },
        },
      },

    },
    MuiDataGrid: {
      defaultProps: {
        disableColumnFilter: true,
        disableColumnMenu: true,
      },
    },
    MuiCalendarPicker: {
      styleOverrides: {
        root: {
          '& .MuiTypography-root:disabled': {
            color: 'rgba(0, 0, 0, 0.3)',
          },
        },
      },
    },
  },
  zhTW,
})

export default theme
