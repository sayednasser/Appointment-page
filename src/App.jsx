import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './site/HomePage'

// Admin panel is code-split from the public landing page: visitors browsing
// the marketing site never download admin JS, and the admin bundle only
// loads once someone actually navigates to /admin. No behavior changes —
// only how/when the code is fetched.
const AdminLayout = lazy(() => import('./admin/components/layout/AdminLayout'))
const Dashboard = lazy(() => import('./admin/pages/Dashboard'))
const Doctors = lazy(() => import('./admin/pages/Doctors'))
const Appointments = lazy(() => import('./admin/pages/Appointments'))
const Services = lazy(() => import('./admin/pages/Services'))
const Offers = lazy(() => import('./admin/pages/Offers'))
const Gallery = lazy(() => import('./admin/pages/Gallery'))
const Reviews = lazy(() => import('./admin/pages/Reviews'))
const Settings = lazy(() => import('./admin/pages/Settings'))

function AdminFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-200 border-t-primary-500" />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route
        path="/admin"
        element={
          <Suspense fallback={<AdminFallback />}>
            <AdminLayout />
          </Suspense>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="services" element={<Services />} />
        <Route path="offers" element={<Offers />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}
