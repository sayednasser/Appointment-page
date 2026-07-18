import { Pencil, Trash2, GraduationCap } from 'lucide-react'
import Badge from '../ui/Badge'

export default function DoctorsTable({ doctors, onEdit, onDelete }) {
  return (
    <>
      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-right">
          <thead>
            <tr className="border-b border-slate-100 text-sm text-ink-soft">
              <th className="px-4 py-3 font-bold">الصورة</th>
              <th className="px-4 py-3 font-bold">اسم الدكتور</th>
              <th className="px-4 py-3 font-bold">التخصص</th>
              <th className="px-4 py-3 font-bold">سنوات الخبرة</th>
              <th className="px-4 py-3 font-bold">الحالة</th>
              <th className="px-4 py-3 font-bold">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id} className="border-b border-slate-50 text-sm transition-colors hover:bg-slate-50/60">
                <td className="px-4 py-3">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="h-11 w-11 rounded-xl object-cover"
                  />
                </td>
                <td className="px-4 py-3 font-bold text-ink">{doctor.name}</td>
                <td className="px-4 py-3 text-ink-soft">{doctor.specialty}</td>
                <td className="px-4 py-3 text-ink-soft">{doctor.experience} سنوات</td>
                <td className="px-4 py-3">
                  <Badge variant={doctor.status === 'active' ? 'success' : 'neutral'}>
                    {doctor.status === 'active' ? 'فعّال' : 'غير فعّال'}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(doctor)}
                      className="btn-icon text-primary-600 hover:bg-primary-50"
                      aria-label="تعديل"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(doctor)}
                      className="btn-icon text-red-500 hover:bg-red-50"
                      aria-label="حذف"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="rounded-xl border border-slate-100 p-4">
            <div className="flex items-start gap-3">
              <img src={doctor.image} alt={doctor.name} className="h-14 w-14 rounded-xl object-cover" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-extrabold text-ink">{doctor.name}</p>
                  <Badge variant={doctor.status === 'active' ? 'success' : 'neutral'}>
                    {doctor.status === 'active' ? 'فعّال' : 'غير فعّال'}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-ink-soft">{doctor.specialty}</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-ink-soft">
                  <GraduationCap size={13} />
                  {doctor.experience} سنوات خبرة
                </p>
              </div>
            </div>
            <div className="mt-3 flex gap-2 border-t border-slate-100 pt-3">
              <button onClick={() => onEdit(doctor)} className="admin-btn-outline flex-1 !py-2 text-xs">
                <Pencil size={14} />
                تعديل
              </button>
              <button onClick={() => onDelete(doctor)} className="admin-btn-danger flex-1 !py-2 text-xs">
                <Trash2 size={14} />
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
