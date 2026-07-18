import { useCallback, useEffect, useState } from 'react'
import * as settingsService from '../services/settingsService'

export function useSettings() {
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const fetchSettings = useCallback(async () => {
    setLoading(true)
    try {
      const data = await settingsService.getSettings()
      setSettings(data)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSettings()
  }, [fetchSettings])

  const save = async (payload) => {
    setSaving(true)
    try {
      const updated = await settingsService.updateSettings(payload)
      setSettings(updated)
      return updated
    } finally {
      setSaving(false)
    }
  }

  return { settings, loading, saving, save, refetch: fetchSettings }
}
