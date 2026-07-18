import { useEffect, useState } from 'react'
import { Save } from 'lucide-react'
import ImageUploadPreview from '../ui/ImageUploadPreview'

export default function SettingsForm({ initialValues, onSave, saving }) {
  const [form, setForm] = useState(initialValues)

  useEffect(() => {
    setForm(initialValues)
  }, [initialValues])

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(form)
  }

  if (!form) return null

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className="admin-card p-5 sm:p-6">
        <h3 className="mb-4 text-base font-extrabold text-ink">الهوية والصور</h3>
        <div className="grid gap-5">
          <ImageUploadPreview
            label="صورة الصفحة الرئيسية"
            value={form.heroImage}
            onChange={(val) => update('heroImage', val)}
            ratio="aspect-video"
          />
        </div>
      </section>

      <section className="admin-card p-5 sm:p-6">
        <h3 className="mb-4 text-base font-extrabold text-ink">بيانات العيادة</h3>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="label-field">اسم العيادة</label>
            <input
              value={form.clinicName}
              onChange={(e) => update('clinicName', e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="label-field">رقم الهاتف</label>
            <input
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              className="input-field"
              dir="ltr"
            />
          </div>
          <div>
            <label className="label-field">رقم الواتساب</label>
            <input
              value={form.whatsapp}
              onChange={(e) => update('whatsapp', e.target.value)}
              className="input-field"
              dir="ltr"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="label-field">العنوان</label>
            <input
              value={form.address}
              onChange={(e) => update('address', e.target.value)}
              className="input-field"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="label-field">رابط Google Maps</label>
            <input
              value={form.googleMapsUrl}
              onChange={(e) => update('googleMapsUrl', e.target.value)}
              className="input-field"
              dir="ltr"
            />
          </div>
        </div>
      </section>

      <section className="admin-card p-5 sm:p-6">
        <h3 className="mb-4 text-base font-extrabold text-ink">محتوى الصفحة الرئيسية</h3>
        <div className="space-y-5">
          <div>
            <label className="label-field">عنوان الصفحة الرئيسية</label>
            <input
              value={form.heroTitle}
              onChange={(e) => update('heroTitle', e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="label-field">وصف الصفحة الرئيسية</label>
            <textarea
              value={form.heroDescription}
              onChange={(e) => update('heroDescription', e.target.value)}
              rows={3}
              className="input-field resize-none"
            />
          </div>
        </div>
      </section>

      <div className="flex justify-end">
        <button type="submit" disabled={saving} className="admin-btn-primary">
          <Save size={18} />
          {saving ? 'جارٍ الحفظ...' : 'حفظ الإعدادات'}
        </button>
      </div>
    </form>
  )
}
