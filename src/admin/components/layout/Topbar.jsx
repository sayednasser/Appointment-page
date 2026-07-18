import { Link } from 'react-router-dom'
import { Menu, Bell, ChevronDown, ExternalLink } from 'lucide-react'

export default function Topbar({ title, onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-100 bg-white/90 px-5 py-4 backdrop-blur lg:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="btn-icon text-ink-soft hover:bg-slate-100 lg:hidden"
          aria-label="فتح القائمة"
        >
          <Menu size={22} />
        </button>
        <h1 className="text-lg font-extrabold text-ink sm:text-xl">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/"
          target="_blank"
          className="admin-btn-outline hidden !py-2 text-xs sm:inline-flex"
        >
          <ExternalLink size={14} />
          عرض الموقع
        </Link>
        <button className="btn-icon relative text-ink-soft hover:bg-slate-100" aria-label="الإشعارات">
          <Bell size={19} />
          <span className="absolute left-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>
        <div className="flex items-center gap-2.5 rounded-xl border border-slate-100 py-1.5 pl-2 pr-1.5">
          <img
            src="https://images.pexels.com/photos/7108250/pexels-photo-7108250.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop"
            alt="صورة المستخدم"
            className="h-8 w-8 rounded-lg object-cover"
          />
          <div className="hidden text-right sm:block">
            <p className="text-xs font-bold text-ink">مدير العيادة</p>
            <p className="text-[11px] text-ink-soft">Admin</p>
          </div>
          <ChevronDown size={15} className="hidden text-ink-soft sm:block" />
        </div>
      </div>
    </header>
  )
}
