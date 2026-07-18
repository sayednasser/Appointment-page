import { useEffect, useState } from 'react'
import Modal from '../ui/Modal'
import ImageUploadPreview from '../ui/ImageUploadPreview'

const EMPTY_FORM = {
  title: '',
  description: '',
  image: '',
  oldPrice: '',
  newPrice: '',
  discountPercentage: '',
  startDate: '',
  endDate: '',
}

function computeDiscount(oldPrice, newPrice) {
  const oldNum = Number(oldPrice)
  const newNum = Number(newPrice)
  if (!oldNum || !newNum || oldNum <= newNum) return ''
  return Math.round(((oldNum - newNum) / oldNum) * 100)
}

export default function OfferModal({ open, onClose, onSubmit, offer }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (open) {
      setForm(offer ? { ...EMPTY_FORM, ...offer } : EMPTY_FORM)
      setErrors({})
    }
  }, [open, offer])

  const update = (field, value) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value }
      if (field === 'oldPrice' || field === 'newPrice') {
        const auto = computeDiscount(next.oldPrice, next.newPrice)
        if (auto !== '') next.discountPercentage = auto
      }
      return next
    })
  }

  const validate = () => {
    const next = {}
    if (!form.title.trim()) next.title = 'عنوان العرض مطلوب'
    if (!form.description.trim()) next.description = 'وصف العرض مطلوب'
    if (!form.image) next.image = 'صورة العرض مطلوبة'
    if (!form.oldPrice) next.oldPrice = 'السعر قبل الخصم مطلوب'
    if (!form.newPrice) next.newPrice = 'السعر بعد الخصم مطلوب'
    if (form.startDate && form.endDate && form.startDate > form.endDate) {
      next.endDate = 'تاريخ الانتهاء يجب أن يكون بعد تاريخ البدء'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      await onSubmit({
        ...form,
        oldPrice: Number(form.oldPrice),
        newPrice: Number(form.newPrice),
        discountPercentage: Number(form.discountPercentage) || 0,
      })
      onClose()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={offer ? 'تعديل العرض' : 'إضافة عرض جديد'} size="md">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="label-field">عنوان العرض</label>
          <input
            value={form.title}
            onChange={(e) => update('title', e.target.value)}
            className="input-field"
            placeholder="مثال: عرض تبييض الأسنان"
          />
          {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
        </div>

        <div>
          <label className="label-field">وصف العرض</label>
          <textarea
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            rows={3}
            className="input-field resize-none"
            placeholder="وصف موجز للعرض..."
          />
          {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
        </div>

        <div>
          <ImageUploadPreview label="صورة العرض" value={form.image} onChange={(val) => update('image', val)} ratio="aspect-[4/3]" />
          {errors.image && <p className="mt-1 text-xs text-red-500">{errors.image}</p>}
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label className="label-field">السعر قبل</label>
            <input
              type="number"
              min="0"
              value={form.oldPrice}
              onChange={(e) => update('oldPrice', e.target.value)}
              className="input-field"
              placeholder="1500"
            />
            {errors.oldPrice && <p className="mt-1 text-xs text-red-500">{errors.oldPrice}</p>}
          </div>
          <div>
            <label className="label-field">السعر بعد</label>
            <input
              type="number"
              min="0"
              value={form.newPrice}
              onChange={(e) => update('newPrice', e.target.value)}
              className="input-field"
              placeholder="999"
            />
            {errors.newPrice && <p className="mt-1 text-xs text-red-500">{errors.newPrice}</p>}
          </div>
          <div>
            <label className="label-field">نسبة الخصم %</label>
            <input
              type="number"
              min="0"
              max="100"
              value={form.discountPercentage}
              onChange={(e) => update('discountPercentage', e.target.value)}
              className="input-field"
              placeholder="محسوبة تلقائياً"
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="label-field">تاريخ البدء</label>
            <input
              type="date"
              value={form.startDate}
              onChange={(e) => update('startDate', e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="label-field">تاريخ الانتهاء</label>
            <input
              type="date"
              value={form.endDate}
              onChange={(e) => update('endDate', e.target.value)}
              className="input-field"
            />
            {errors.endDate && <p className="mt-1 text-xs text-red-500">{errors.endDate}</p>}
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
          <button type="button" onClick={onClose} className="admin-btn-outline">
            إلغاء
          </button>
          <button type="submit" disabled={submitting} className="admin-btn-primary">
            {submitting ? 'جارٍ الحفظ...' : offer ? 'حفظ التعديلات' : 'إضافة العرض'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
