import { ThemeProvider, CssBaseline } from '@mui/material'
import { theme } from './utils'
import Routers from './routes'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routers />
    </ThemeProvider>
  )
}

export default App
