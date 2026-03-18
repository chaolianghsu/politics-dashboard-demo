# Presale Demo Mode Design

## Overview

為業務團隊建立 Demo 模式，讓潛在客戶透過 GitHub Pages 體驗台灣選戰儀表板。使用環境變數 `VITE_DEMO_MODE` 驅動，前端搭配 MSW mock data，不需要後端。

## Requirements

1. 登入頁保持原樣，不加任何 demo 提示（帳密由業務另外提供給客戶）
2. Demo 模式下 reCAPTCHA 替換為外觀相同但點一下就過的假元件
3. 登入後所有頁面開放，使用現有 MSW mock data
4. 先做一組通用 demo 帳號，結構預留未來多帳號對應不同 mock dataset
5. 部署到 GitHub Pages（靜態 hosting）

## Approach

環境變數驅動 Demo 模式（方案 A）。一套 codebase，用 `VITE_DEMO_MODE=true` 切換。正式環境完全不受影響。

## Design

### 1. Environment Variable & MSW Startup

新增 `VITE_DEMO_MODE=true` 環境變數。

`main.jsx` MSW 啟動條件修改為：
- `VITE_DEMO_MODE === 'true'` → 強制啟動 MSW
- 保留原有 `!VITE_API_URL` 邏輯給開發用

新建 `src/utils/isDemoMode.js`：
```js
export const isDemoMode = process.env.VITE_DEMO_MODE === 'true'
```

`.env.example` 加入 `VITE_DEMO_MODE=` 說明。

### 2. Fake reCAPTCHA Component

新建 `src/components/FakeRecaptcha.jsx`：
- 外觀模擬 Google reCAPTCHA v2 checkbox（灰色外框、「我不是機器人」文字、勾選動畫）
- 點擊觸發 `onChange` callback，行為與真 reCAPTCHA 一致

`LoginForm.jsx` 根據 `isDemoMode` 條件渲染：
```jsx
{isDemoMode
  ? <FakeRecaptcha onChange={handleOnRecaptchChange} />
  : <ReCAPTCHA ... />
}
```

### 3. Mock Auth Handler — Demo Accounts

`src/mocks/handlers/auth.js` 改為帳號 mapping 結構：
```js
const DEMO_ACCOUNTS = {
  'demo@dailyview.tw': { password: 'demo123', dataset: 'default' },
}
```

- 登入驗證查找 `DEMO_ACCOUNTS[email]` + 密碼比對
- 保留原有 `admin/admin` 開發用帳號，避免影響其他開發者的本地開發流程
- `dataset` 欄位本次不使用，預留給未來多客戶 mock data
- token 生成、verify、refresh handler 不變

### 4. GitHub Pages Deployment

`vite.config.js` 動態 `base`，透過新增環境變數 `VITE_BASE_PATH` 控制：
```js
base: process.env.VITE_BASE_PATH || '/'
```

GitHub Actions workflow 中設定 `VITE_BASE_PATH` 為實際 GitHub Pages 路徑（例如 `'/politics-dashboard-2023/'`），值取決於 GitHub repo 名稱。

`BrowserRouter` 加 `basename`，根據 `isDemoMode` 判斷，值同樣讀取 `VITE_BASE_PATH`。

MSW service worker `mockServiceWorker.js` 目前位於專案根目錄，需複製到 `public/` 目錄，這樣 Vite build 時才會自動複製到 `dist/` output。

`main.jsx` 中 `worker.start()` 需指定 service worker URL 以支援 subpath 部署：
```js
worker.start({
  serviceWorker: {
    url: `${process.env.VITE_BASE_PATH || '/'}mockServiceWorker.js`,
  },
})
```
若不指定，瀏覽器會從根路徑 `/mockServiceWorker.js` 載入，在 GitHub Pages subpath 下會 404。

注意：Demo 帳密（`DEMO_ACCOUNTS`）會包含在 build 出的 JS bundle 中，透過瀏覽器 devtools 可見。這在 Demo 情境下是可接受的設計，因為本身就是提供給客戶試用的公開帳號。

新增 `.github/workflows/deploy-demo.yml`：
- 觸發：push 到 `demo` branch
- 步驟：install → build（`VITE_DEMO_MODE=true`）→ deploy GitHub Pages

## Files Changed

| File | Change |
|------|--------|
| `src/utils/isDemoMode.js` | **New** — isDemoMode helper |
| `src/components/FakeRecaptcha.jsx` | **New** — Fake reCAPTCHA component |
| `src/main.jsx` | MSW startup adds VITE_DEMO_MODE check + serviceWorker.url for subpath |
| `src/containers/login/LoginForm.jsx` | Conditional real/fake reCAPTCHA |
| `src/mocks/handlers/auth.js` | DEMO_ACCOUNTS mapping replaces hardcoded credentials |
| `src/routes/index.jsx` | BrowserRouter basename |
| `vite.config.js` | Dynamic base path |
| `public/mockServiceWorker.js` | **Copy** from project root to public/ |
| `.env.example` | Add VITE_DEMO_MODE and VITE_BASE_PATH |
| `.github/workflows/deploy-demo.yml` | **New** — GitHub Pages auto-deploy |
| `.gitignore` | Add `.superpowers/` |

## Not Changed

- Login page UI appearance (Login.jsx, LoginForm.jsx visual layout)
- All non-auth MSW handlers (existing mock data untouched)
- Zustand store, axios interceptor, PrivateRoutes guard
