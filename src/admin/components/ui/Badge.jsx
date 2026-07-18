const VARIANTS = {
  success: 'bg-emerald-50 text-emerald-700',
  warning: 'bg-amber-50 text-amber-700',
  danger: 'bg-red-50 text-red-600',
  info: 'bg-primary-50 text-primary-700',
  neutral: 'bg-slate-100 text-slate-600',
}

export default function Badge({ variant = 'neutral', children, icon: Icon }) {
  return (
    <span className={`badge ${VARIANTS[variant]}`}>
      {Icon && <Icon size={13} />}
      {children}
    </span>
  )
}
