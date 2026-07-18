import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

const TITLES = {
  '/admin': 'لوحة التحكم',
  '/admin/doctors': 'إدارة الدكاترة',
  '/admin/appointments': 'إدارة الحجوزات',
  '/admin/services': 'إدارة الخدمات',
  '/admin/offers': 'إدارة العروض',
  '/admin/gallery': 'معرض قبل وبعد',
  '/admin/reviews': 'إدارة التقييمات',
  '/admin/settings': 'إعدادات العيادة',
}

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const title = TITLES[location.pathname] || 'لوحة التحكم'

  return (
    <div className="min-h-screen bg-surface">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div
        className={`min-h-screen transition-[margin] duration-300 ${
          collapsed ? 'lg:mr-[84px]' : 'lg:mr-[264px]'
        }`}
      >
        <Topbar title={title} onMenuClick={() => setMobileOpen(true)} />
        <main className="p-5 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
