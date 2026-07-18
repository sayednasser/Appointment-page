import { Pencil, Trash2 } from 'lucide-react'

export default function GalleryCard({ item, onEdit, onDelete }) {
  return (
    <div className="admin-card group overflow-hidden">
      <div className="grid grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img src={item.before} alt={`${item.title} - قبل`} className="h-full w-full object-cover" />
          <span className="absolute right-2 top-2 rounded-full bg-ink/70 px-2.5 py-1 text-[11px] font-bold text-white">
            قبل
          </span>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden">
          <img src={item.after} alt={`${item.title} - بعد`} className="h-full w-full object-cover" />
          <span className="absolute left-2 top-2 rounded-full bg-primary-500/90 px-2.5 py-1 text-[11px] font-bold text-white">
            بعد
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-extrabold text-ink">{item.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-ink-soft">{item.description}</p>
        <div className="mt-4 flex gap-2 border-t border-slate-100 pt-3">
          <button onClick={() => onEdit(item)} className="admin-btn-outline flex-1 !py-2 text-xs">
            <Pencil size={14} />
            تعديل
          </button>
          <button onClick={() => onDelete(item)} className="admin-btn-danger flex-1 !py-2 text-xs">
            <Trash2 size={14} />
            حذف
          </button>
        </div>
      </div>
    </div>
  )
}
