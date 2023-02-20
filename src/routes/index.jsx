import {
  BrowserRouter, Route, Routes, Navigate,
} from 'react-router-dom'
import { DashboardLayout } from '@/layouts'
import { Reputation, Prediction } from '@/pages'

function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/prediction" replace />} />
          <Route path="prediction" element={<Prediction />} />
          <Route path="reputation" element={<Reputation />} />
          <Route path="*" element={<Navigate to="/prediction" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Routers
