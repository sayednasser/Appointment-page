import { useEffect, useState } from 'react'
import apiClient from '../../admin/api/axiosClient'

export function useClinicSettings() {
  const [settings, setSettings] = useState(null)

  useEffect(() => {
    apiClient
      .get('/setting')
      .then(({ data }) => {
        const raw = data?.data ?? data ?? {}

        setSettings({
          ...raw,
          whatsapp: raw.socialLinks?.whatsapp ?? raw.whatsapp ?? '',
          googleMapsUrl: raw.googleMap ?? raw.googleMapsUrl ?? '',

          // 👇 مهم
          heroImage: raw.heroImage?.secure_url ?? '',
        })
      })
      .catch(() => setSettings(null))
  }, [])

  return settings
}