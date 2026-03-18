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
