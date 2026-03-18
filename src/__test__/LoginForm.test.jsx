import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@mui/material'

import LoginForm from '@/containers/login/LoginForm'
import theme from '@/utils/theme'

// Must mock isDemoMode before importing LoginForm
jest.mock('@/utils/isDemoMode', () => ({
  isDemoMode: true,
}))

// Mock react-google-recaptcha to make it detectable
jest.mock('react-google-recaptcha', () => function MockReCAPTCHA() {
  return <div data-testid="real-recaptcha">Real reCAPTCHA</div>
})

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
})

function renderLoginForm() {
  return render(
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </QueryClientProvider>
    </ThemeProvider>,
  )
}

describe('LoginForm in demo mode', () => {
  it('renders FakeRecaptcha instead of real reCAPTCHA', () => {
    renderLoginForm()
    expect(screen.getByText('我不是機器人')).toBeInTheDocument()
    expect(screen.queryByTestId('real-recaptcha')).not.toBeInTheDocument()
  })
})
