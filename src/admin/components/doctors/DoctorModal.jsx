import { useEffect, useState } from 'react'
import Modal from '../ui/Modal'
import ImageUploadPreview from '../ui/ImageUploadPreview'
import ScheduleEditor from './ScheduleEditor'

const EMPTY_FORM = {
  name: '',
  specialty: '',
  experience: '',
  bio: '',
  image: '',
  status: 'active',
  schedule: [],
}

export default function DoctorModal({ open, onClose, onSubmit, doctor }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (open) {
      setForm(doctor ? { ...EMPTY_FORM, ...doctor } : EMPTY_FORM)
      setErrors({})
    }
  }, [open, doctor])

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'اسم الدكتور مطلوب'
    if (!form.specialty.trim()) next.specialty = 'التخصص مطلوب'
    if (form.experience === '' || Number(form.experience) < 0) next.experience = 'أدخل عدد سنوات صحيح'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      // Pass the form data as-is; doctorsService.buildPayload handles the
      // field name translation (specialty → specialization, bio → description, etc.)
      await onSubmit({ ...form, experience: Number(form.experience) })
      onClose()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={doctor ? 'تعديل بيانات الدكتور' : 'إضافة دكتور جديد'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="label-field">اسم الدكتور</label>
            <input
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              className="input-field"
              placeholder="د. اسم الدكتور"
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </div>

          <div>
            <label className="label-field">التخصص</label>
            <input
              value={form.specialty}
              onChange={(e) => update('specialty', e.target.value)}
              className="input-field"
              placeholder="مثال: أخصائي تقويم الأسنان"
            />
            {errors.specialty && <p className="mt-1 text-xs text-red-500">{errors.specialty}</p>}
          </div>

          <div>
            <label className="label-field">سنوات الخبرة</label>
            <input
              type="number"
              min={0}
              value={form.experience}
              onChange={(e) => update('experience', e.target.value)}
              className="input-field"
              placeholder="مثال: 10"
            />
            {errors.experience && <p className="mt-1 text-xs text-red-500">{errors.experience}</p>}
          </div>

          <div>
            <label className="label-field">الحالة</label>
            <select
              value={form.status}
              onChange={(e) => update('status', e.target.value)}
              className="input-field"
            >
              <option value="active">فعّال</option>
              <option value="inactive">غير فعّال</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="label-field">نبذة عن الدكتور</label>
            <textarea
              value={form.bio}
              onChange={(e) => update('bio', e.target.value)}
              rows={3}
              className="input-field resize-none"
              placeholder="خبرة موجزة عن الدكتور..."
            />
          </div>

          <div className="sm:col-span-2">
            <ImageUploadPreview
              label="صورة الدكتور"
              value={form.image}
              onChange={(val) => update('image', val)}
            />
          </div>
        </div>

        <ScheduleEditor schedule={form.schedule} onChange={(s) => update('schedule', s)} />

        <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
          <button type="button" onClick={onClose} className="admin-btn-outline">
            إلغاء
          </button>
          <button type="submit" disabled={submitting} className="admin-btn-primary">
            {submitting ? 'جارٍ الحفظ...' : doctor ? 'حفظ التعديلات' : 'إضافة الدكتور'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
