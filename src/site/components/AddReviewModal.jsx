import { useRef, useState } from 'react'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import Modal from '../../admin/components/ui/Modal'
import ImageUploadPreview from '../../admin/components/ui/ImageUploadPreview'
import StarRatingInput from './StarRatingInput'
import { useSubmitReview } from '../hooks/useSubmitReview'
import { useLang } from '../i18n/LanguageContext'

const EMPTY_FORM = { patientName: '', rating: 5, comment: '', image: '' }

export default function AddReviewModal({ open, onClose }) {
  const { submitReview } = useSubmitReview()
  const { t } = useLang()
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  // Ref-based lock closes the race window between a rapid double-tap and the
  // next re-render, so the request can never fire twice even on slow mobile
  // devices where state updates lag behind touch events.
  const submittingRef = useRef(false)

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  const validate = () => {
    const next = {}
    if (!form.patientName.trim()) next.patientName = t.addReview.nameError
    if (!form.comment.trim()) next.comment = t.addReview.commentError
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submittingRef.current) return
    if (!validate()) return
    submittingRef.current = true
    setSubmitError('')
    setSubmitting(true)
    try {
      await submitReview(form)
      setSubmitted(true)
      setForm(EMPTY_FORM)
      setErrors({})
    } catch (err) {
      setSubmitError(t.addReview.errorGeneric)
    } finally {
      submittingRef.current = false
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setForm(EMPTY_FORM)
      setErrors({})
      setSubmitted(false)
      setSubmitError('')
    }, 250)
  }

  return (
    <Modal open={open} onClose={handleClose} title={t.addReview.title} size="md">
      {submitted ? (
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <CheckCircle2 className="text-primary-500" size={40} />
          <p className="text-lg font-extrabold text-ink">{t.addReview.successTitle}</p>
          <p className="text-sm text-ink-soft">{t.addReview.successDesc}</p>
          <button onClick={handleClose} className="btn-primary mt-2 !py-2.5">
            {t.addReview.ok}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="label-field">{t.addReview.nameLabel}</label>
            <input
              value={form.patientName}
              onChange={(e) => update('patientName', e.target.value)}
              className="input-field"
              placeholder={t.addReview.namePlaceholder}
            />
            {errors.patientName && (
              <p className="mt-1 text-xs text-red-500">{errors.patientName}</p>
            )}
          </div>

          <div>
            <label className="label-field">{t.addReview.ratingLabel}</label>
            <StarRatingInput value={form.rating} onChange={(v) => update('rating', v)} />
          </div>

          <div>
            <label className="label-field">{t.addReview.commentLabel}</label>
            <textarea
              value={form.comment}
              onChange={(e) => update('comment', e.target.value)}
              rows={4}
              className="input-field resize-none"
              placeholder={t.addReview.commentPlaceholder}
            />
            {errors.comment && (
              <p className="mt-1 text-xs text-red-500">{errors.comment}</p>
            )}
          </div>

          <ImageUploadPreview
            label={t.addReview.imageLabel}
            value={form.image}
            onChange={(val) => update('image', val)}
          />

          {submitError && (
            <div className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
              <AlertCircle size={16} className="flex-shrink-0" />
              {submitError}
            </div>
          )}

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={submitting}
              className="admin-btn-outline disabled:cursor-not-allowed disabled:opacity-60"
            >
              {t.addReview.cancel}
            </button>
            <button
              type="submit"
              disabled={submitting}
              aria-busy={submitting}
              className="btn-primary !py-2.5 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? t.addReview.submitting : t.addReview.submit}
            </button>
          </div>
        </form>
      )}
    </Modal>
  )
}
