import { motion } from 'framer-motion'

export default function StatCard({ icon: Icon, label, value, tint = 'primary', delay = 0 }) {
  const tints = {
    primary: 'bg-primary-50 text-primary-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    violet: 'bg-violet-50 text-violet-600',
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="admin-card flex items-center gap-4 p-5 hover:-translate-y-0.5 hover:shadow-floaty transition-all"
    >
      <span className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${tints[tint]}`}>
        <Icon size={22} />
      </span>
      <div>
        <p className="text-sm text-ink-soft">{label}</p>
        <p className="mt-0.5 text-2xl font-extrabold text-ink">{value}</p>
      </div>
    </motion.div>
  )
}
