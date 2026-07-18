import { Pencil, Trash2, Eye, EyeOff } from 'lucide-react'
import Badge from '../ui/Badge'

export default function OffersTable({ offers, onEdit, onDelete, onToggleVisibility }) {
  const rowActions = (offer) => (
    <div className="flex items-center gap-1.5">
      <button
        onClick={() => onToggleVisibility(offer)}
        className="btn-icon text-primary-600 hover:bg-primary-50"
        aria-label={offer.status === 'active' ? 'إخفاء' : 'إظهار'}
      >
        {offer.status === 'active' ? <Eye size={16} /> : <EyeOff size={16} />}
      </button>
      <button onClick={() => onEdit(offer)} className="btn-icon text-ink-soft hover:bg-slate-100" aria-label="تعديل">
        <Pencil size={16} />
      </button>
      <button onClick={() => onDelete(offer)} className="btn-icon text-red-500 hover:bg-red-50" aria-label="حذف">
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
              <th className="px-4 py-3 font-bold">العرض</th>
              <th className="px-4 py-3 font-bold">السعر</th>
              <th className="px-4 py-3 font-bold">الخصم</th>
              <th className="px-4 py-3 font-bold">الفترة</th>
              <th className="px-4 py-3 font-bold">الحالة</th>
              <th className="px-4 py-3 font-bold">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer.id} className="border-b border-slate-50 text-sm transition-colors hover:bg-slate-50/60">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={offer.image} alt={offer.title} className="h-11 w-11 rounded-lg object-cover" />
                    <span className="font-bold text-ink">{offer.title}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-ink-soft">
                  <span className="ml-1.5 line-through">{offer.oldPrice}</span>
                  <span className="font-bold text-primary-600">{offer.newPrice}</span>
                </td>
                <td className="px-4 py-3">
                  <Badge variant="danger">{offer.discountPercentage}%</Badge>
                </td>
                <td className="px-4 py-3 text-xs text-ink-soft">
                  {offer.startDate} → {offer.endDate}
                </td>
                <td className="px-4 py-3">
                  <Badge variant={offer.status === 'active' ? 'success' : 'neutral'}>
                    {offer.status === 'active' ? 'مفعّل' : 'مخفي'}
                  </Badge>
                </td>
                <td className="px-4 py-3">{rowActions(offer)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {offers.map((offer) => (
          <div key={offer.id} className="rounded-xl border border-slate-100 p-4">
            <div className="flex items-center gap-3">
              <img src={offer.image} alt={offer.title} className="h-14 w-14 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-extrabold text-ink">{offer.title}</p>
                <Badge variant={offer.status === 'active' ? 'success' : 'neutral'}>
                  {offer.status === 'active' ? 'مفعّل' : 'مخفي'}
                </Badge>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-2 text-sm">
              <span className="text-ink-soft line-through">{offer.oldPrice}</span>
              <span className="font-bold text-primary-600">{offer.newPrice}</span>
              <Badge variant="danger">{offer.discountPercentage}%</Badge>
            </div>
            <p className="mt-1 text-xs text-ink-soft">
              {offer.startDate} → {offer.endDate}
            </p>
            <div className="mt-3 flex items-center justify-end gap-1.5 border-t border-slate-100 pt-3">
              {rowActions(offer)}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
