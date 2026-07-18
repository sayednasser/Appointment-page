import { Search, Stethoscope, CalendarDays } from 'lucide-react'

export default function AppointmentFilters({ filters, setFilters, doctorOptions }) {
  const update = (field, value) => setFilters((prev) => ({ ...prev, [field]: value }))

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <div className="relative">
        <Search size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={filters.name}
          onChange={(e) => update('name', e.target.value)}
          placeholder="بحث بالاسم"
          className="input-field pr-10"
        />
      </div>

      <div className="relative">
        <Stethoscope size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <select
          value={filters.doctor}
          onChange={(e) => update('doctor', e.target.value)}
          className="input-field pr-10"
        >
          <option value="">كل الأطباء</option>
          {doctorOptions.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div className="relative">
        <CalendarDays size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="date"
          value={filters.date}
          onChange={(e) => update('date', e.target.value)}
          className="input-field pr-10"
        />
      </div>
    </div>
  )
}
