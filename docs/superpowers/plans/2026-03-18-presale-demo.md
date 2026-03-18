# Presale Demo Mode Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an environment-variable-driven demo mode so sales can deploy a self-contained demo site to GitHub Pages using MSW mock data.

**Architecture:** A single flag `VITE_DEMO_MODE=true` activates demo behavior: MSW intercepts all API calls, a fake reCAPTCHA replaces the real one, and a `DEMO_ACCOUNTS` map in the MSW auth handler controls login. `VITE_BASE_PATH` handles GitHub Pages subpath routing. No backend required.

**Tech Stack:** React 18, Vite 4, MUI v5, MSW v1, React Router v6, React Hook Form, vite-plugin-environment, Playwright

**Spec:** `docs/superpowers/specs/2026-03-18-presale-demo-design.md`

---

## File Structure

| File | Action | Responsibility |
|------|--------|---------------|
| `src/utils/isDemoMode.js` | Create | Single boolean export for demo mode check |
| `src/__test__/isDemoMode.test.js` | Create | TDD test for isDemoMode utility |
| `src/components/FakeRecaptcha.jsx` | Create | Visual clone of Google reCAPTCHA v2 checkbox |
| `src/__test__/FakeRecaptcha.test.jsx` | Create | TDD test for FakeRecaptcha component |
| `src/__test__/LoginForm.test.jsx` | Create | TDD test for LoginForm demo/normal reCAPTCHA swap |
| `src/__test__/authHandler.test.js` | Create | TDD test for DEMO_ACCOUNTS mock auth handler |
| `src/main.jsx` | Modify | MSW startup condition + serviceWorker.url |
| `src/containers/login/LoginForm.jsx` | Modify | Swap real/fake reCAPTCHA based on isDemoMode |
| `src/mocks/handlers/auth.js` | Modify | DEMO_ACCOUNTS map + preserve admin/admin |
| `src/routes/index.jsx` | Modify | BrowserRouter basename from VITE_BASE_PATH |
| `vite.config.js` | Modify | Dynamic `base` from VITE_BASE_PATH |
| `public/mockServiceWorker.js` | Copy | MSW service worker in Vite public dir |
| `.env.example` | Modify | Document new env vars |
| `.github/workflows/deploy-demo.yml` | Create | GitHub Pages auto-deploy on demo branch |
| `playwright.config.js` | Create | Playwright config with demo mode dev server |
| `e2e/demo-login.spec.js` | Create | E2E test: demo login flow |
| `e2e/demo-navigation.spec.js` | Create | E2E test: post-login page navigation |
| `.gitignore` | Modify | Add .superpowers/, playwright-report/, test-results/ |

---

### Task 1: isDemoMode Utility + Environment Config

**Files:**
- Create: `src/__test__/isDemoMode.test.js`
- Create: `src/utils/isDemoMode.js`
- Modify: `.env.example`
- Modify: `.gitignore`

- [ ] **Step 1: RED — Write failing test for isDemoMode**

Create `src/__test__/isDemoMode.test.js`:
```js
describe('isDemoMode', () => {
  const originalEnv = process.env

  afterEach(() => {
    process.env = originalEnv
    jest.resetModules()
  })

  it('returns true when VITE_DEMO_MODE is "true"', async () => {
    process.env = { ...originalEnv, VITE_DEMO_MODE: 'true' }
    const { isDemoMode } = await import('@/utils/isDemoMode')
    expect(isDemoMode).toBe(true)
  })

  it('returns false when VITE_DEMO_MODE is empty', async () => {
    process.env = { ...originalEnv, VITE_DEMO_MODE: '' }
    const { isDemoMode } = await import('@/utils/isDemoMode')
    expect(isDemoMode).toBe(false)
  })

  it('returns false when VITE_DEMO_MODE is undefined', async () => {
    process.env = { ...originalEnv }
    delete process.env.VITE_DEMO_MODE
    const { isDemoMode } = await import('@/utils/isDemoMode')
    expect(isDemoMode).toBe(false)
  })
})
```

- [ ] **Step 2: Run test — verify RED**

Run: `yarn test --watchAll=false --testPathPattern=isDemoMode`
Expected: FAIL — `Cannot find module '@/utils/isDemoMode'`

- [ ] **Step 3: GREEN — Create isDemoMode utility**

Create `src/utils/isDemoMode.js`:
```js
// vite-plugin-environment exposes env vars as process.env.*
export const isDemoMode = process.env.VITE_DEMO_MODE === 'true'
```

- [ ] **Step 4: Run test — verify GREEN**

Run: `yarn test --watchAll=false --testPathPattern=isDemoMode`
Expected: PASS — all 3 tests pass

- [ ] **Step 5: Update .env.example**

Replace the full content of `.env.example` with:
```
# API URL
# 留空即為 mock api，或是根據要使用的 api url 填寫，可參考如下
# 正式：https://api-taitung.keypo.tw, 測試：http://35.234.54.82
VITE_API_URL=

# Demo mode — set to 'true' to enable MSW mock data + fake reCAPTCHA
VITE_DEMO_MODE=

# Base path for deployment (e.g. '/politics-dashboard-2023/' for GitHub Pages)
VITE_BASE_PATH=
```

- [ ] **Step 6: Add .superpowers/ and playwright output to .gitignore**

Append to `.gitignore`:
```
# superpowers brainstorm files
.superpowers/

# playwright
/playwright-report/
/test-results/
```

- [ ] **Step 7: Commit**

```bash
git add src/__test__/isDemoMode.test.js src/utils/isDemoMode.js .env.example .gitignore
git commit -m "feat: add isDemoMode utility with tests and env config"
```

---

### Task 2: FakeRecaptcha Component

**Files:**
- Create: `src/__test__/FakeRecaptcha.test.jsx`
- Create: `src/components/FakeRecaptcha.jsx`

- [ ] **Step 1: RED — Write failing test for FakeRecaptcha**

Create `src/__test__/FakeRecaptcha.test.jsx`:
```jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FakeRecaptcha from '@/components/FakeRecaptcha'

describe('FakeRecaptcha', () => {
  it('renders「我不是機器人」label', () => {
    render(<FakeRecaptcha onChange={() => {}} />)
    expect(screen.getByText('我不是機器人')).toBeInTheDocument()
  })

  it('calls onChange when clicked', async () => {
    const user = userEvent.setup()
    const handleChange = jest.fn()
    render(<FakeRecaptcha onChange={handleChange} />)

    await user.click(screen.getByText('我不是機器人'))
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('does not call onChange on second click', async () => {
    const user = userEvent.setup()
    const handleChange = jest.fn()
    render(<FakeRecaptcha onChange={handleChange} />)

    await user.click(screen.getByText('我不是機器人'))
    await user.click(screen.getByText('我不是機器人'))
    expect(handleChange).toHaveBeenCalledTimes(1)
  })
})
```

- [ ] **Step 2: Run test — verify RED**

Run: `yarn test --watchAll=false --testPathPattern=FakeRecaptcha`
Expected: FAIL — `Cannot find module '@/components/FakeRecaptcha'`

- [ ] **Step 3: GREEN — Create FakeRecaptcha component**

Create `src/components/FakeRecaptcha.jsx`:
```jsx
import { useState } from 'react'
import { Box } from '@mui/material'
import PropTypes from 'prop-types'

function FakeRecaptcha({ onChange }) {
  const [checked, setChecked] = useState(false)

  const handleClick = () => {
    if (checked) return
    setChecked(true)
    if (onChange) onChange('fake-recaptcha-token')
  }

  return (
    <Box
      onClick={handleClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #d3d3d3',
        borderRadius: '3px',
        backgroundColor: '#f9f9f9',
        padding: '12px 16px',
        cursor: checked ? 'default' : 'pointer',
        userSelect: 'none',
        height: '74px',
        boxSizing: 'border-box',
      }}
    >
      {/* Checkbox */}
      <Box
        sx={{
          width: '28px',
          height: '28px',
          border: checked ? 'none' : '2px solid #c1c1c1',
          borderRadius: '2px',
          backgroundColor: checked ? '#4caf50' : 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: '12px',
          flexShrink: 0,
          transition: 'all 0.2s ease',
        }}
      >
        {checked && (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
              fill="white"
            />
          </svg>
        )}
      </Box>

      {/* Label */}
      <Box sx={{ fontSize: '14px', color: '#333', flexGrow: 1 }}>
        我不是機器人
      </Box>

      {/* reCAPTCHA branding */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontSize: '10px',
          color: '#555',
          lineHeight: 1.2,
        }}
      >
        <Box
          component="img"
          src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
          alt="reCAPTCHA"
          sx={{ width: '32px', height: '32px', marginBottom: '2px' }}
          onError={(e) => {
            e.target.style.display = 'none'
          }}
        />
        <span>reCAPTCHA</span>
      </Box>
    </Box>
  )
}

FakeRecaptcha.propTypes = {
  onChange: PropTypes.func.isRequired,
}

export default FakeRecaptcha
```

- [ ] **Step 4: Run test — verify GREEN**

Run: `yarn test --watchAll=false --testPathPattern=FakeRecaptcha`
Expected: PASS — all 3 tests pass

- [ ] **Step 5: Commit**

```bash
git add src/__test__/FakeRecaptcha.test.jsx src/components/FakeRecaptcha.jsx
git commit -m "feat: add FakeRecaptcha component with tests"
```

---

### Task 3: LoginForm — Swap reCAPTCHA in Demo Mode

**Files:**
- Create: `src/__test__/LoginForm.test.jsx`
- Modify: `src/containers/login/LoginForm.jsx`

- [ ] **Step 1: RED — Write failing test for LoginForm demo mode**

Create `src/__test__/LoginForm.test.jsx`:
```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Must mock isDemoMode before importing LoginForm
jest.mock('@/utils/isDemoMode', () => ({
  isDemoMode: true,
}))

// Mock react-google-recaptcha to make it detectable
jest.mock('react-google-recaptcha', () => function MockReCAPTCHA() {
  return <div data-testid="real-recaptcha">Real reCAPTCHA</div>
})

import LoginForm from '@/containers/login/LoginForm'

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
})

function renderLoginForm() {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

describe('LoginForm in demo mode', () => {
  it('renders FakeRecaptcha instead of real reCAPTCHA', () => {
    renderLoginForm()
    expect(screen.getByText('我不是機器人')).toBeInTheDocument()
    expect(screen.queryByTestId('real-recaptcha')).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — verify RED**

Run: `yarn test --watchAll=false --testPathPattern=LoginForm`
Expected: FAIL — LoginForm still renders real reCAPTCHA (no `isDemoMode` conditional yet)

- [ ] **Step 3: GREEN — Add imports and conditional reCAPTCHA**

At the top of `src/containers/login/LoginForm.jsx`, add after the existing imports:
```jsx
import { isDemoMode } from '@/utils/isDemoMode'
import FakeRecaptcha from '@/components/FakeRecaptcha'
```

Then replace lines 96-110 (the `<Box>` wrapping `<ReCAPTCHA>`):

Before:
```jsx
        <Box sx={{ '&>div': { width: '100%' } }}>
          <ReCAPTCHA
            onChange={handleOnRecaptchChange}
            ref={recaptchaRef}
            sitekey="6LcP1KckAAAAADlDotybpQJI2Ouzp8uj1jMffpS3"
            hl="zh-TW"
          />
          {isSubmitted && isRobot && (
            <Typography
              sx={{ textAlign: 'left', fontSize: '1.2rem', color: '#d32f2f' }}
            >
              請進行驗證
            </Typography>
          )}
        </Box>
```

After:
```jsx
        <Box sx={{ '&>div': { width: '100%' } }}>
          {isDemoMode ? (
            <FakeRecaptcha onChange={handleOnRecaptchChange} />
          ) : (
            <ReCAPTCHA
              onChange={handleOnRecaptchChange}
              ref={recaptchaRef}
              sitekey="6LcP1KckAAAAADlDotybpQJI2Ouzp8uj1jMffpS3"
              hl="zh-TW"
            />
          )}
          {isSubmitted && isRobot && (
            <Typography
              sx={{ textAlign: 'left', fontSize: '1.2rem', color: '#d32f2f' }}
            >
              請進行驗證
            </Typography>
          )}
        </Box>
```

- [ ] **Step 4: Run test — verify GREEN**

Run: `yarn test --watchAll=false --testPathPattern=LoginForm`
Expected: PASS

- [ ] **Step 5: Run lint**

Run: `yarn lint`
Expected: No errors

- [ ] **Step 6: Commit**

```bash
git add src/__test__/LoginForm.test.jsx src/containers/login/LoginForm.jsx
git commit -m "feat: swap reCAPTCHA for FakeRecaptcha in demo mode with tests"
```

---

### Task 4: Mock Auth Handler — DEMO_ACCOUNTS

**Files:**
- Create: `src/__test__/authHandler.test.js`
- Modify: `src/mocks/handlers/auth.js`

- [ ] **Step 1: RED — Write failing test for DEMO_ACCOUNTS auth**

Create `src/__test__/authHandler.test.js`:
```js
import { getToken } from '@/apis/source/auth'

// MSW server is already started in setupTests.js

describe('Mock Auth Handler — DEMO_ACCOUNTS', () => {
  it('allows login with demo@dailyview.tw / demo123', async () => {
    const res = await getToken({ email: 'demo@dailyview.tw', password: 'demo123' })
    expect(res).toHaveProperty('access')
    expect(res).toHaveProperty('refresh')
  })

  it('allows login with admin / admin (dev account preserved)', async () => {
    const res = await getToken({ email: 'admin', password: 'admin' })
    expect(res).toHaveProperty('access')
    expect(res).toHaveProperty('refresh')
  })

  it('rejects wrong password', async () => {
    await expect(
      getToken({ email: 'demo@dailyview.tw', password: 'wrong' }),
    ).rejects.toThrow()
  })

  it('rejects unknown account', async () => {
    await expect(
      getToken({ email: 'unknown@test.com', password: 'test' }),
    ).rejects.toThrow()
  })
})
```

- [ ] **Step 2: Run test — verify RED**

Run: `yarn test --watchAll=false --testPathPattern=authHandler`
Expected: FAIL — `demo@dailyview.tw` login rejected (current handler only accepts `admin/admin`)

- [ ] **Step 3: GREEN — Update auth handler with DEMO_ACCOUNTS**

Replace the full content of `src/mocks/handlers/auth.js`:
```js
import { rest } from 'msw'
import { authAPI, baseUrl } from '@/apis'
import { genToken, tokenValidation } from '../utils/token'

const DEMO_ACCOUNTS = {
  admin: { password: 'admin', dataset: 'default' },
  'demo@dailyview.tw': { password: 'demo123', dataset: 'default' },
}

const authAPIs = [
  rest.post(`${baseUrl}${authAPI.Url}`, async (req, res, ctx) => {
    const { email, password } = await req.json()
    const account = DEMO_ACCOUNTS[email]
    if (!account || account.password !== password) {
      return res(
        ctx.status(401),
        ctx.json({
          detail: 'error',
        }),
      )
    }
    const accessToken = genToken(10000)
    const refreshToken = genToken(2592000000)
    return res(
      ctx.status(200),
      ctx.json({
        refresh: refreshToken,
        access: accessToken,
      }),
    )
  }),
  rest.post(`${baseUrl}${authAPI.tokenVerifyUrl}`, async (req, res, ctx) => {
    const data = await req.json()
    const { token } = data
    const { success, message } = tokenValidation(token)
    if (success === true) {
      return res(
        ctx.status(200),
        ctx.json({ }),
      )
    }
    return res(
      ctx.status(401),
      ctx.json({
        detail: message,
      }),
    )
  }),

  rest.post(`${baseUrl}${authAPI.tokenRefreshUrl}`, async (req, res, ctx) => {
    const data = await req.json()
    const { refresh } = data
    const { success, message } = tokenValidation(refresh)
    if (success === true) {
      const accessToken = genToken(10000)
      return res(
        ctx.status(200),
        ctx.json({ access: accessToken }),
      )
    }
    return res(
      ctx.status(401),
      ctx.json({
        detail: message,
      }),
    )
  }),
]

export default authAPIs
```

- [ ] **Step 4: Run test — verify GREEN**

Run: `yarn test --watchAll=false --testPathPattern=authHandler`
Expected: PASS — all 4 tests pass

- [ ] **Step 5: Run all tests**

Run: `yarn test --watchAll=false`
Expected: All tests pass (no regressions)

- [ ] **Step 6: Commit**

```bash
git add src/__test__/authHandler.test.js src/mocks/handlers/auth.js
git commit -m "feat: add DEMO_ACCOUNTS mapping to mock auth handler with tests"
```

---

### Task 5: MSW Startup — Demo Mode + Subpath Service Worker

**Files:**
- Modify: `src/main.jsx`
- Copy: `mockServiceWorker.js` → `public/mockServiceWorker.js`

- [ ] **Step 1: Copy mockServiceWorker.js to public/**

```bash
cp "/Users/admin/Projects/Politics dashboard/politics-dashboard-2023/mockServiceWorker.js" \
   "/Users/admin/Projects/Politics dashboard/politics-dashboard-2023/public/mockServiceWorker.js"
```

- [ ] **Step 2: Update main.jsx**

Replace the full content of `src/main.jsx`:
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import App from './App'
import './index.scss'

async function prepare() {
  const shouldEnableMsw = process.env.VITE_DEMO_MODE === 'true' || !process.env.VITE_API_URL
  if (shouldEnableMsw) {
    const { worker } = await import('./mocks/browser')
    const basePath = process.env.VITE_BASE_PATH || '/'
    await worker.start({
      serviceWorker: {
        url: `${basePath}mockServiceWorker.js`,
      },
    })
  }
}

prepare().then(() => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        staleTime: 250000,
      },
    },
  })
  const root = document.getElementById('root')
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </React.StrictMode>,
  )
})
```

- [ ] **Step 3: Run tests**

Run: `cd /Users/admin/Projects/Politics\ dashboard/politics-dashboard-2023 && yarn test --watchAll=false`
Expected: All tests pass

- [ ] **Step 4: Commit**

```bash
git add public/mockServiceWorker.js src/main.jsx
git commit -m "feat: MSW startup supports demo mode and subpath service worker URL"
```

---

### Task 6: Vite Config + Router Basename for Subpath

**Files:**
- Modify: `vite.config.js`
- Modify: `src/routes/index.jsx`

- [ ] **Step 1: Update vite.config.js**

Replace the full content of `vite.config.js`:
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'
import EnvironmentPlugin from 'vite-plugin-environment'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react(), svgr(), EnvironmentPlugin('all')],
  resolve: {
    alias: [{
      find: '@', replacement: path.resolve(__dirname, 'src'),
    }],
  },
  build: {
    assetsInlineLimit: 0,
  },
})
```

- [ ] **Step 2: Update routes/index.jsx with basename**

Replace the full content of `src/routes/index.jsx`:
```jsx
import {
  BrowserRouter, Route, Routes, Navigate,
} from 'react-router-dom'
import { DashboardLayout } from '@/layouts'
import {
  Reputation, Prediction, Demo, Favorability, Volume, Spread, Login, TextList, HotKeyword,
} from '@/pages'

import PrivateRoutes from './PrivateRoutes'

const basename = process.env.VITE_BASE_PATH || '/'

function Routers() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/prediction" replace />} />
            <Route path="prediction" element={<Prediction />} />
            <Route path="demo" element={<Demo />} />
            <Route path="reputation">
              <Route index element={<Reputation />} />
              <Route path="spread" element={<Spread />} />
              <Route path="volume" element={<Volume />} />
              <Route path="favorability" element={<Favorability />} />
              <Route path="textlist" element={<TextList />} />
              <Route path="hotkeyword" element={<HotKeyword />} />
            </Route>
            <Route path="*" element={<Navigate to="/prediction" />} />
          </Route>
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Routers
```

- [ ] **Step 3: Run tests**

Run: `cd /Users/admin/Projects/Politics\ dashboard/politics-dashboard-2023 && yarn test --watchAll=false`
Expected: All tests pass

- [ ] **Step 4: Commit**

```bash
git add vite.config.js src/routes/index.jsx
git commit -m "feat: dynamic base path and router basename for GitHub Pages subpath"
```

---

### Task 7: GitHub Actions Workflow

**Files:**
- Create: `.github/workflows/deploy-demo.yml`

- [ ] **Step 1: Create workflow directory**

```bash
mkdir -p "/Users/admin/Projects/Politics dashboard/politics-dashboard-2023/.github/workflows"
```

- [ ] **Step 2: Create deploy-demo.yml**

Create `.github/workflows/deploy-demo.yml`:
```yaml
name: Deploy Demo to GitHub Pages

on:
  push:
    branches:
      - demo

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: yarn

      - name: Install dependencies
        run: yarn install --frozen-lockfile

      - name: Build
        env:
          VITE_API_URL: ''
          VITE_DEMO_MODE: 'true'
          VITE_BASE_PATH: '/${{ github.event.repository.name }}/'
        run: yarn build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/deploy-demo.yml
git commit -m "ci: add GitHub Actions workflow for demo deployment"
```

---

### Task 8: Playwright E2E Tests

**Files:**
- Create: `playwright.config.js`
- Create: `e2e/demo-login.spec.js`
- Create: `e2e/demo-navigation.spec.js`
- Modify: `package.json` (new scripts)
- Modify: `.gitignore`

- [ ] **Step 1: Install Playwright**

```bash
cd "/Users/admin/Projects/Politics dashboard/politics-dashboard-2023"
yarn add -D @playwright/test
npx playwright install chromium
```

- [ ] **Step 2: Create playwright.config.js**

Create `playwright.config.js`:
```js
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
  retries: 0,
  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'VITE_DEMO_MODE=true VITE_API_URL= yarn dev',
    port: 5173,
    reuseExistingServer: !process.env.CI,
    timeout: 15000,
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
})
```

- [ ] **Step 3: Add E2E scripts to package.json**

Add to `scripts` in `package.json`:
```json
"test:e2e": "playwright test",
"test:e2e:headed": "playwright test --headed"
```

- [ ] **Step 4: RED — Write failing E2E test for demo login flow**

Create `e2e/demo-login.spec.js`:
```js
import { test, expect } from '@playwright/test'

test.describe('Demo Login Flow', () => {
  test('shows fake reCAPTCHA on login page', async ({ page }) => {
    await page.goto('/login')
    await expect(page.getByText('我不是機器人')).toBeVisible()
  })

  test('login with demo account succeeds', async ({ page }) => {
    await page.goto('/login')

    // Fill credentials
    await page.getByLabel('帳號').fill('demo@dailyview.tw')
    await page.getByLabel('密碼').fill('demo123')

    // Click fake reCAPTCHA
    await page.getByText('我不是機器人').click()

    // Submit
    await page.getByRole('button', { name: '登入' }).click()

    // Should redirect to /prediction
    await expect(page).toHaveURL(/\/prediction/)
  })

  test('login with admin account still works', async ({ page }) => {
    await page.goto('/login')

    await page.getByLabel('帳號').fill('admin')
    await page.getByLabel('密碼').fill('admin')
    await page.getByText('我不是機器人').click()
    await page.getByRole('button', { name: '登入' }).click()

    await expect(page).toHaveURL(/\/prediction/)
  })

  test('login with wrong credentials shows error', async ({ page }) => {
    await page.goto('/login')

    await page.getByLabel('帳號').fill('wrong@test.com')
    await page.getByLabel('密碼').fill('wrong')
    await page.getByText('我不是機器人').click()
    await page.getByRole('button', { name: '登入' }).click()

    await expect(page.getByText('請確認帳號密碼是否正確')).toBeVisible()
  })

  test('submit without reCAPTCHA shows validation error', async ({ page }) => {
    await page.goto('/login')

    await page.getByLabel('帳號').fill('demo@dailyview.tw')
    await page.getByLabel('密碼').fill('demo123')
    await page.getByRole('button', { name: '登入' }).click()

    await expect(page.getByText('請進行驗證')).toBeVisible()
  })
})
```

- [ ] **Step 5: Write E2E test for post-login navigation**

Create `e2e/demo-navigation.spec.js`:
```js
import { test, expect } from '@playwright/test'

// Login helper — reuse across navigation tests
async function loginAsDemo(page) {
  await page.goto('/login')
  await page.getByLabel('帳號').fill('demo@dailyview.tw')
  await page.getByLabel('密碼').fill('demo123')
  await page.getByText('我不是機器人').click()
  await page.getByRole('button', { name: '登入' }).click()
  await expect(page).toHaveURL(/\/prediction/)
}

test.describe('Demo Navigation — post-login pages', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsDemo(page)
  })

  test('prediction page loads with mock data', async ({ page }) => {
    await expect(page).toHaveURL(/\/prediction/)
    // Page should have rendered content (not blank)
    await expect(page.locator('body')).not.toBeEmpty()
  })

  test('can navigate to reputation page', async ({ page }) => {
    await page.goto('/reputation')
    await expect(page).toHaveURL(/\/reputation/)
    await expect(page.locator('body')).not.toBeEmpty()
  })

  test('can navigate to reputation/spread', async ({ page }) => {
    await page.goto('/reputation/spread')
    await expect(page).toHaveURL(/\/reputation\/spread/)
  })

  test('can navigate to reputation/volume', async ({ page }) => {
    await page.goto('/reputation/volume')
    await expect(page).toHaveURL(/\/reputation\/volume/)
  })

  test('can navigate to reputation/favorability', async ({ page }) => {
    await page.goto('/reputation/favorability')
    await expect(page).toHaveURL(/\/reputation\/favorability/)
  })

  test('can navigate to reputation/hotkeyword', async ({ page }) => {
    await page.goto('/reputation/hotkeyword')
    await expect(page).toHaveURL(/\/reputation\/hotkeyword/)
  })

  test('unauthenticated access redirects to login', async ({ page }) => {
    // Clear tokens
    await page.evaluate(() => {
      localStorage.removeItem('politics_access')
      localStorage.removeItem('politics_refresh')
    })
    await page.goto('/prediction')
    await expect(page).toHaveURL(/\/login/)
  })
})
```

- [ ] **Step 6: Run E2E tests — verify GREEN**

Run: `yarn test:e2e`
Expected: All tests pass. If any fail, fix the implementation and re-run.

- [ ] **Step 7: Commit**

```bash
git add playwright.config.js e2e/ package.json .gitignore
git commit -m "test: add Playwright E2E tests for demo login and navigation"
```

---

### Task 9: Manual Verification (Smoke Test)

E2E tests cover the core flows automatically. This task is a final smoke test for visual confirmation.

- [ ] **Step 1: Start dev server in demo mode**

```bash
cd "/Users/admin/Projects/Politics dashboard/politics-dashboard-2023"
VITE_DEMO_MODE=true VITE_API_URL= yarn dev
```

- [ ] **Step 2: Verify in browser**

Open `http://localhost:5173/login` and check:
1. Fake reCAPTCHA renders (grey box with「我不是機器人」)
2. Click the checkbox — it turns green with a checkmark
3. Enter `demo@dailyview.tw` / `demo123` → login succeeds → redirects to `/prediction`
4. Enter `admin` / `admin` → also works (dev account preserved)
5. Enter wrong credentials → shows error message
6. Navigate through all pages (prediction, reputation, spread, etc.) — all load with mock data

- [ ] **Step 3: Verify production build**

```bash
cd "/Users/admin/Projects/Politics dashboard/politics-dashboard-2023"
VITE_DEMO_MODE=true VITE_API_URL= VITE_BASE_PATH=/test/ yarn build
yarn preview --base /test/
```

Open `http://localhost:4173/test/login` and confirm the same flow works.

- [ ] **Step 4: Verify normal mode is unaffected**

```bash
cd "/Users/admin/Projects/Politics dashboard/politics-dashboard-2023"
yarn dev
```

Open `http://localhost:5173/login` and confirm real reCAPTCHA renders (may fail to load without valid key, but the component should attempt to render).
