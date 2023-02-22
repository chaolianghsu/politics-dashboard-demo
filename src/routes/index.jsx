import {
  BrowserRouter, Route, Routes, Navigate,
} from 'react-router-dom'
import { DashboardLayout } from '@/layouts'
import {
  Reputation, Prediction, Demo, Favorability, Volume, Spread,
} from '@/pages'

function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/prediction" replace />} />
          <Route path="prediction" element={<Prediction />} />
          <Route path="reputation" element={<Reputation />} />
          <Route path="demo" element={<Demo />} />
          <Route path="reputation/spread" element={<Spread />} />
          <Route path="reputation/volume" element={<Volume />} />
          <Route path="reputation/favorability" element={<Favorability />} />
          <Route path="*" element={<Navigate to="/prediction" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Routers
