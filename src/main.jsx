import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import './index.scss'

async function prepare() {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('./mocks/browser')
    worker.start()
  }
}

prepare().then(() => {
  const root = document.getElementById('root')
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
})
