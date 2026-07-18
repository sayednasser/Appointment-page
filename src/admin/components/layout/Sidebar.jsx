import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Stethoscope,
  CalendarCheck,
  Images,
  Star,
  Settings,
  Sparkles,
  Tag,
  ChevronsRight,
  ChevronsLeft,
  X,
} from 'lucide-react'

const links = [
  { to: '/admin', label: 'لوحة التحكم', icon: LayoutDashboard, end: true },
  { to: '/admin/doctors', label: 'الدكاترة', icon: Stethoscope },
  { to: '/admin/appointments', label: 'الحجوزات', icon: CalendarCheck },
  { to: '/admin/services', label: 'الخدمات', icon: Sparkles },
  { to: '/admin/offers', label: 'العروض', icon: Tag },
  { to: '/admin/gallery', label: 'قبل وبعد', icon: Images },
  { to: '/admin/reviews', label: 'التقييمات', icon: Star },
  { to: '/admin/settings', label: 'الإعدادات', icon: Settings },
]

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-ink/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <motion.aside
        animate={{ width: collapsed ? 84 : 264 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className={`fixed inset-y-0 right-0 z-50 flex flex-col bg-surface-sidebar text-white transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between gap-2 border-b border-white/10 px-4 py-5">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary-500">
              <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
                <path
                  d="M24 6c-4.5 0-6.8 2.4-9.6 2.4-3.6 0-6.4 2.9-6.4 8.2 0 5 1.6 9.9 2.9 14.6.9 3.4 1.7 7.6 4.6 7.6 3.3 0 3-9.2 8.5-9.2s5.2 9.2 8.5 9.2c2.9 0 3.7-4.2 4.6-7.6 1.3-4.7 2.9-9.6 2.9-14.6 0-5.3-2.8-8.2-6.4-8.2C30.8 8.4 28.5 6 24 6z"
                  fill="currentColor"
                />
              </svg>
            </span>
            {!collapsed && (
              <span className="whitespace-nowrap text-lg font-extrabold">
                دنتا<span className="text-primary-400">فلو</span>
              </span>
            )}
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-white/70 hover:text-white lg:hidden"
            aria-label="إغلاق القائمة"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1.5 overflow-y-auto px-3 py-5">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setMobileOpen(false)}
              title={collapsed ? link.label : undefined}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold transition-colors ${
                  isActive
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                } ${collapsed ? 'justify-center' : ''}`
              }
            >
              <link.icon size={20} className="flex-shrink-0" />
              {!collapsed && <span className="truncate">{link.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="hidden border-t border-white/10 p-3 lg:block">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold text-white/70 hover:bg-white/10 hover:text-white"
          >
            {collapsed ? <ChevronsLeft size={18} /> : <ChevronsRight size={18} />}
            {!collapsed && 'طي القائمة'}
          </button>
        </div>
      </motion.aside>
    </>
  )
}
