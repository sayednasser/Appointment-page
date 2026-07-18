import { useSettings } from '../hooks/useSettings'
import { useToast } from '../components/ui/ToastProvider'
import SettingsForm from '../components/settings/SettingsForm'

export default function Settings() {
  const { settings, loading, saving, save } = useSettings()
  const { showToast } = useToast()

  const handleSave = async (payload) => {
    try {
      await save(payload)
      showToast('تم حفظ الإعدادات بنجاح')
    } catch {
      showToast('حدث خطأ أثناء الحفظ', 'error')
    }
  }

  if (loading) {
    return (
      <div className="space-y-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="skeleton h-40 w-full rounded-2xl" />
        ))}
      </div>
    )
  }

  return <SettingsForm initialValues={settings} onSave={handleSave} saving={saving} />
}
