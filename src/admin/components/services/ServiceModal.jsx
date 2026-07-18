import { useEffect, useState } from 'react'
import * as Icons from 'lucide-react'
import Modal from '../ui/Modal'

const ICON_OPTIONS = [
  'Sparkles',
  'Syringe',
  'Activity',
  'AlignCenter',
  'Anchor',
  'Sun',
  'Smile',
  'Heart',
  'ShieldCheck',
  'Stethoscope',
]

const EMPTY_FORM = { name: '', description: '', icon: 'Sparkles' }

export default function ServiceModal({ open, onClose, onSubmit, service }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (open) {
      setForm(service ? { ...EMPTY_FORM, ...service } : EMPTY_FORM)
      setErrors({})
    }
  }, [open, service])

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'اسم الخدمة مطلوب'
    if (!form.description.trim()) next.description = 'وصف الخدمة مطلوب'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      await onSubmit(form)
      onClose()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={service ? 'تعديل الخدمة' : 'إضافة خدمة جديدة'} size="md">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="label-field">اسم الخدمة</label>
          <input
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            className="input-field"
            placeholder="مثال: تبييض الأسنان"
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label className="label-field">وصف الخدمة</label>
          <textarea
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            rows={3}
            className="input-field resize-none"
            placeholder="وصف موجز للخدمة..."
          />
          {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
        </div>

        <div>
          <label className="label-field">أيقونة الخدمة (اختياري)</label>
          <div className="flex flex-wrap gap-2">
            {ICON_OPTIONS.map((iconName) => {
              const Icon = Icons[iconName]
              const active = form.icon === iconName
              return (
                <button
                  type="button"
                  key={iconName}
                  onClick={() => update('icon', iconName)}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border-2 transition-colors ${active
                    ? 'border-primary-500 bg-primary-500 text-white'
                    : 'border-slate-200 text-ink-soft hover:border-primary-300'
                    }`}
                  aria-label={iconName}
                  title={iconName}
                >
                  <Icon size={18} />
                </button>
              )
            })}
          </div>
        </div>

        

        <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
          <button type="button" onClick={onClose} className="admin-btn-outline">
            إلغاء
          </button>
          <button type="submit" disabled={submitting} className="admin-btn-primary">
            {submitting ? 'جارٍ الحفظ...' : service ? 'حفظ التعديلات' : 'إضافة الخدمة'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
