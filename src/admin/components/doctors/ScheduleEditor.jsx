import { Plus, Trash2 } from 'lucide-react'

// Backend expects English day names (from the validation enum).
// We display Arabic labels in the UI and translate on the way in/out.
const DAYS = [
  { en: 'Saturday',  ar: 'السبت'    },
  { en: 'Sunday',    ar: 'الأحد'    },
  { en: 'Monday',    ar: 'الاثنين'  },
  { en: 'Tuesday',   ar: 'الثلاثاء' },
  { en: 'Wednesday', ar: 'الأربعاء' },
  { en: 'Thursday',  ar: 'الخميس'   },
  { en: 'Friday',    ar: 'الجمعة'   },
]

const enToAr = Object.fromEntries(DAYS.map((d) => [d.en, d.ar]))
const arToEn = Object.fromEntries(DAYS.map((d) => [d.ar, d.en]))

/**
 * `schedule` rows use English day names internally (matching backend).
 * The editor displays Arabic labels only.
 */
export default function ScheduleEditor({ schedule, onChange }) {
  const usedDaysEn = schedule.map((s) => s.day)
  const availableDays = DAYS.filter((d) => !usedDaysEn.includes(d.en))

  const addDay = () => {
    if (!availableDays.length) return
    onChange([
      ...schedule,
      { day: availableDays[0].en, from: '10:00', to: '18:00', slotDuration: 30 },
    ])
  }

  const updateRow = (index, field, value) => {
    const next = schedule.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    onChange(next)
  }

  const removeRow = (index) => {
    onChange(schedule.filter((_, i) => i !== index))
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="label-field !mb-0">أيام العمل والمواعيد</label>
        <button
          type="button"
          onClick={addDay}
          disabled={!availableDays.length}
          className="admin-btn-outline !px-3 !py-1.5 text-xs"
        >
          <Plus size={14} />
          إضافة يوم
        </button>
      </div>

      <div className="mt-3 space-y-3">
        {schedule.length === 0 && (
          <p className="rounded-xl border border-dashed border-slate-200 p-4 text-center text-sm text-ink-soft">
            لم تتم إضافة أيام عمل بعد
          </p>
        )}

        {schedule.map((row, index) => (
          <div
            key={index}
            className="grid grid-cols-2 gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-3 sm:grid-cols-5"
          >
            <select
              value={row.day}
              onChange={(e) => updateRow(index, 'day', e.target.value)}
              className="input-field col-span-2 !bg-white sm:col-span-1"
            >
              {/* Current day (always available in its own row) */}
              <option value={row.day}>{enToAr[row.day] ?? row.day}</option>
              {availableDays.map((d) => (
                <option key={d.en} value={d.en}>
                  {d.ar}
                </option>
              ))}
            </select>

            <div>
              <span className="mb-1 block text-[11px] text-ink-soft">من</span>
              <input
                type="time"
                value={row.from}
                onChange={(e) => updateRow(index, 'from', e.target.value)}
                className="input-field !bg-white !py-2 text-xs"
              />
            </div>

            <div>
              <span className="mb-1 block text-[11px] text-ink-soft">إلى</span>
              <input
                type="time"
                value={row.to}
                onChange={(e) => updateRow(index, 'to', e.target.value)}
                className="input-field !bg-white !py-2 text-xs"
              />
            </div>

            <div>
              <span className="mb-1 block text-[11px] text-ink-soft">مدة الكشف (د)</span>
              <input
                type="number"
                min={10}
                step={5}
                value={row.slotDuration}
                onChange={(e) => updateRow(index, 'slotDuration', Number(e.target.value))}
                className="input-field !bg-white !py-2 text-xs"
              />
            </div>

            <div className="flex items-end justify-end">
              <button
                type="button"
                onClick={() => removeRow(index)}
                className="btn-icon text-red-500 hover:bg-red-50"
                aria-label="حذف اليوم"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
