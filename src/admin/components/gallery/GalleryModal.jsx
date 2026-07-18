import { useEffect, useState } from 'react'
import Modal from '../ui/Modal'
import ImageUploadPreview from '../ui/ImageUploadPreview'

const EMPTY_FORM = { title: '', description: '', before: '', after: '' }

export default function GalleryModal({ open, onClose, onSubmit, item }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (open) {
      setForm(item ? { ...EMPTY_FORM, ...item } : EMPTY_FORM)
      setErrors({})
    }
  }, [open, item])

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  const validate = () => {
    const next = {}
    // title is optional per backend schema (allow "")
    // Require images only for new items; existing ones already have URLs
    if (!item && !form.before) next.before = 'صورة قبل مطلوبة'
    if (!item && !form.after) next.after = 'صورة بعد مطلوبة'
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
    <Modal open={open} onClose={onClose} title={item ? 'تعديل الحالة' : 'إضافة حالة جديدة'} size="md">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="label-field">عنوان الحالة (اختياري)</label>
          <input
            value={form.title}
            onChange={(e) => update('title', e.target.value)}
            className="input-field"
            placeholder="مثال: تبييض وتجميل شامل"
          />
        </div>

        <div>
          <label className="label-field">وصف الحالة</label>
          <textarea
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            rows={3}
            className="input-field resize-none"
            placeholder="وصف موجز للحالة والإجراء الذي تم..."
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <ImageUploadPreview
              label="صورة قبل"
              value={form.before}
              onChange={(val) => update('before', val)}
              ratio="aspect-[4/3]"
            />
            {errors.before && <p className="mt-1 text-xs text-red-500">{errors.before}</p>}
          </div>
          <div>
            <ImageUploadPreview
              label="صورة بعد"
              value={form.after}
              onChange={(val) => update('after', val)}
              ratio="aspect-[4/3]"
            />
            {errors.after && <p className="mt-1 text-xs text-red-500">{errors.after}</p>}
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
          <button type="button" onClick={onClose} className="admin-btn-outline">
            إلغاء
          </button>
          <button type="submit" disabled={submitting} className="admin-btn-primary">
            {submitting ? 'جارٍ الحفظ...' : item ? 'حفظ التعديلات' : 'إضافة الحالة'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
