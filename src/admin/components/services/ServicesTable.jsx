import * as Icons from 'lucide-react'
import { Pencil, Trash2, Eye, EyeOff, ArrowUp, ArrowDown } from 'lucide-react'
import Badge from '../ui/Badge'

export default function ServicesTable({ services, onEdit, onDelete, onToggleVisibility, onMove }) {
  const renderIcon = (name) => {
    const Icon = Icons[name] || Icons.Sparkles
    return <Icon size={18} />
  }

  const rowActions = (service, index) => (
    <div className="flex items-center gap-1.5">
      <button
        onClick={() => onMove(service, 'up')}
        disabled={index === 0}
        className="btn-icon text-ink-soft hover:bg-slate-100 disabled:opacity-30"
        aria-label="نقل لأعلى"
      >
        <ArrowUp size={15} />
      </button>
      <button
        onClick={() => onMove(service, 'down')}
        disabled={index === services.length - 1}
        className="btn-icon text-ink-soft hover:bg-slate-100 disabled:opacity-30"
        aria-label="نقل لأسفل"
      >
        <ArrowDown size={15} />
      </button>
      <button
        onClick={() => onToggleVisibility(service)}
        className="btn-icon text-primary-600 hover:bg-primary-50"
        aria-label={service.status === 'active' ? 'إخفاء' : 'إظهار'}
      >
        {service.status === 'active' ? <Eye size={16} /> : <EyeOff size={16} />}
      </button>
      <button onClick={() => onEdit(service)} className="btn-icon text-ink-soft hover:bg-slate-100" aria-label="تعديل">
        <Pencil size={16} />
      </button>
      <button onClick={() => onDelete(service)} className="btn-icon text-red-500 hover:bg-red-50" aria-label="حذف">
        <Trash2 size={16} />
      </button>
    </div>
  )

  return (
    <>
      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-right">
          <thead>
            <tr className="border-b border-slate-100 text-sm text-ink-soft">
              <th className="px-4 py-3 font-bold">الخدمة</th>
              <th className="px-4 py-3 font-bold">الوصف</th>
              <th className="px-4 py-3 font-bold">الترتيب</th>
              <th className="px-4 py-3 font-bold">الحالة</th>
              <th className="px-4 py-3 font-bold">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr key={service.id} className="border-b border-slate-50 text-sm transition-colors hover:bg-slate-50/60">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={service.image} alt={service.name} className="h-11 w-11 rounded-lg object-cover" />
                    <span className="flex items-center gap-1.5 font-bold text-ink">
                      {renderIcon(service.icon)}
                      {service.name}
                    </span>
                  </div>
                </td>
                <td className="max-w-xs px-4 py-3 text-ink-soft">
                  <p className="line-clamp-2">{service.description}</p>
                </td>
                <td className="px-4 py-3 text-ink-soft">{service.order}</td>
                <td className="px-4 py-3">
                  <Badge variant={service.status === 'active' ? 'success' : 'neutral'}>
                    {service.status === 'active' ? 'ظاهرة' : 'مخفية'}
                  </Badge>
                </td>
                <td className="px-4 py-3">{rowActions(service, index)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {services.map((service, index) => (
          <div key={service.id} className="rounded-xl border border-slate-100 p-4">
            <div className="flex items-center gap-3">
              <img src={service.image} alt={service.name} className="h-14 w-14 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 font-extrabold text-ink">
                  {renderIcon(service.icon)}
                  <span className="truncate">{service.name}</span>
                </p>
                <Badge variant={service.status === 'active' ? 'success' : 'neutral'}>
                  {service.status === 'active' ? 'ظاهرة' : 'مخفية'}
                </Badge>
              </div>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{service.description}</p>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
              {rowActions(service, index)}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
