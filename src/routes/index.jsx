import {
  BrowserRouter, Route, Routes, Navigate,
} from 'react-router-dom'
import { DashboardLayout } from '@/layouts'
import {
  Reputation, Prediction, Demo, Favorability, Volume, Spread, Login, TextList,
} from '@/pages'

import PrivateRoutes from './PrivateRoutes'

function Routers() {
  return (
    <BrowserRouter>
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
