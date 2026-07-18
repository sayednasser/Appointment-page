import { useRef } from 'react'
import { ImagePlus, X } from 'lucide-react'

/**
 * ImageUploadPreview
 *
 * `value` can be:
 *   - a File object (newly chosen, not yet uploaded)
 *   - a URL string  (existing image from backend)
 *   - null / ''     (empty)
 *
 * `onChange` receives either a File object (new selection) or '' (cleared).
 * The service layer is responsible for appending File instances to FormData.
 */
export default function ImageUploadPreview({ label, value, onChange, ratio = 'aspect-square' }) {
  const inputRef = useRef(null)

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    onChange(file)
    // Reset input so the same file can be re-selected if cleared
    e.target.value = ''
  }

  // Derive a preview URL: File → object URL, string URL → use as-is
  const previewUrl = value instanceof File ? URL.createObjectURL(value) : value || ''

  return (
    <div>
      {label && <label className="label-field">{label}</label>}
      <div className="flex items-center gap-4">
        <div
          className={`relative flex ${ratio} w-28 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-slate-200 bg-slate-50`}
        >
          {previewUrl ? (
            <>
              <img src={previewUrl} alt="معاينة" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => onChange('')}
                className="absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-red-500 shadow"
                aria-label="إزالة الصورة"
              >
                <X size={13} />
              </button>
            </>
          ) : (
            <ImagePlus className="text-slate-300" size={26} />
          )}
        </div>
        <div className="flex-1">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />
          <button type="button" onClick={() => inputRef.current?.click()} className="admin-btn-outline text-xs">
            <ImagePlus size={15} />
            {previewUrl ? 'تغيير الصورة' : 'رفع صورة'}
          </button>
          <p className="mt-1.5 text-xs text-ink-soft">PNG أو JPG بحد أقصى 5 ميجا</p>
        </div>
      </div>
    </div>
  )
}
