import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'
import Modal from '../ui/Modal'
import ImageUploadPreview from '../ui/ImageUploadPreview'

const EMPTY_FORM = { patientName: '', rating: 5, comment: '', image: '' }

export default function ReviewEditModal({ open, onClose, onSubmit, review }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (open) {
      setForm(review ? { ...EMPTY_FORM, ...review } : EMPTY_FORM)
      setErrors({})
    }
  }, [open, review])

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  const validate = () => {
    const next = {}
    if (!form.patientName.trim()) next.patientName = 'اسم المريض مطلوب'
    if (!form.comment.trim()) next.comment = 'التعليق مطلوب'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      // reviewsService.updateReview maps patientName → name for the backend
      await onSubmit(form)
      onClose()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="تعديل التقييم" size="md">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="label-field">اسم المريض</label>
          <input
            value={form.patientName}
            onChange={(e) => update('patientName', e.target.value)}
            className="input-field"
          />
          {errors.patientName && <p className="mt-1 text-xs text-red-500">{errors.patientName}</p>}
        </div>

        <div>
          <label className="label-field">التقييم</label>
          <div className="flex gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => update('rating', i + 1)}
                aria-label={`${i + 1} نجوم`}
                className="text-amber-400"
              >
                <Star size={24} className={i < form.rating ? 'fill-amber-400' : 'fill-slate-200 text-slate-200'} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="label-field">التعليق</label>
          <textarea
            value={form.comment}
            onChange={(e) => update('comment', e.target.value)}
            rows={3}
            className="input-field resize-none"
          />
          {errors.comment && <p className="mt-1 text-xs text-red-500">{errors.comment}</p>}
        </div>

        <ImageUploadPreview
          label="صورة (اختياري)"
          value={form.image}
          onChange={(val) => update('image', val)}
        />

        <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
          <button type="button" onClick={onClose} className="admin-btn-outline">
            إلغاء
          </button>
          <button type="submit" disabled={submitting} className="admin-btn-primary">
            {submitting ? 'جارٍ الحفظ...' : 'حفظ التعديلات'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
