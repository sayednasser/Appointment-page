import { Inbox } from 'lucide-react'

export default function EmptyState({
  icon: Icon = Inbox,
  title = 'لا توجد بيانات بعد',
  description = 'لم يتم إضافة أي عناصر حتى الآن.',
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        <Icon size={28} />
      </span>
      <h3 className="text-base font-extrabold text-ink">{title}</h3>
      <p className="max-w-xs text-sm text-ink-soft">{description}</p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
