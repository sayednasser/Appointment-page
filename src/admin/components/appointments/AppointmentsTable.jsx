import { Check, X, Phone, Stethoscope, CalendarDays, Clock } from 'lucide-react'
import Badge from '../ui/Badge'

const STATUS_MAP = {
  pending: { label: 'قيد الانتظار', variant: 'warning' },
  confirmed: { label: 'تم التأكيد', variant: 'success' },
  cancelled: { label: 'ملغي', variant: 'danger' },
}

export default function AppointmentsTable({ appointments, onConfirm, onCancel }) {
  return (
    <>
      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-right">
          <thead>
            <tr className="border-b border-slate-100 text-sm text-ink-soft">
              <th className="px-4 py-3 font-bold">اسم المريض</th>
              <th className="px-4 py-3 font-bold">رقم الهاتف</th>
              <th className="px-4 py-3 font-bold">الدكتور</th>
              <th className="px-4 py-3 font-bold">التاريخ</th>
              <th className="px-4 py-3 font-bold">الوقت</th>
              <th className="px-4 py-3 font-bold">الحالة</th>
              <th className="px-4 py-3 font-bold">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => {
              const status = STATUS_MAP[a.status]
              return (
                <tr key={a.id} className="border-b border-slate-50 text-sm transition-colors hover:bg-slate-50/60">
                  <td className="px-4 py-3 font-bold text-ink">{a.patientName}</td>
                  <td className="px-4 py-3 text-ink-soft" dir="ltr">{a.phone}</td>
                  <td className="px-4 py-3 text-ink-soft">{a.doctor}</td>
                  <td className="px-4 py-3 text-ink-soft">{a.date}</td>
                  <td className="px-4 py-3 text-ink-soft">{a.time}</td>
                  <td className="px-4 py-3">
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        disabled={a.status === 'confirmed'}
                        onClick={() => onConfirm(a)}
                        className="btn-icon text-emerald-600 hover:bg-emerald-50 disabled:opacity-30"
                        aria-label="تأكيد"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        disabled={a.status === 'cancelled'}
                        onClick={() => onCancel(a)}
                        className="btn-icon text-red-500 hover:bg-red-50 disabled:opacity-30"
                        aria-label="إلغاء"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {appointments.map((a) => {
          const status = STATUS_MAP[a.status]
          return (
            <div key={a.id} className="rounded-xl border border-slate-100 p-4">
              <div className="flex items-center justify-between">
                <p className="font-extrabold text-ink">{a.patientName}</p>
                <Badge variant={status.variant}>{status.label}</Badge>
              </div>
              <div className="mt-2 space-y-1 text-xs text-ink-soft">
                <p className="flex items-center gap-1.5" dir="ltr">
                  <Phone size={12} />
                  {a.phone}
                </p>
                <p className="flex items-center gap-1.5">
                  <Stethoscope size={12} />
                  {a.doctor}
                </p>
                <p className="flex items-center gap-1.5">
                  <CalendarDays size={12} />
                  {a.date}
                  <Clock size={12} className="mr-2" />
                  {a.time}
                </p>
              </div>
              <div className="mt-3 flex gap-2 border-t border-slate-100 pt-3">
                <button
                  disabled={a.status === 'confirmed'}
                  onClick={() => onConfirm(a)}
                  className="admin-btn-outline flex-1 !py-2 text-xs !text-emerald-600 disabled:opacity-40"
                >
                  <Check size={14} />
                  تأكيد
                </button>
                <button
                  disabled={a.status === 'cancelled'}
                  onClick={() => onCancel(a)}
                  className="admin-btn-danger flex-1 !py-2 text-xs disabled:opacity-40"
                >
                  <X size={14} />
                  إلغاء
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
