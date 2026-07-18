import { useCallback, useEffect, useState } from 'react'
import * as galleryService from '../services/galleryService'

export function useGallery() {
  const [cases, setCases] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchCases = useCallback(async () => {
    setLoading(true)
    try {
      const data = await galleryService.getGalleryCases()
      setCases(Array.isArray(data) ? data : [])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCases()
  }, [fetchCases])

  const addCase = async (payload) => {
    const item = await galleryService.createGalleryCase(payload)
    setCases((prev) => [...prev, item])
    return item
  }

  const editCase = async (id, payload) => {
    const updated = await galleryService.updateGalleryCase(id, payload)
    setCases((prev) => prev.map((c) => (c.id === id ? updated : c)))
    return updated
  }

  const removeCase = async (id) => {
    await galleryService.deleteGalleryCase(id)
    setCases((prev) => prev.filter((c) => c.id !== id))
  }

  return { cases, loading, addCase, editCase, removeCase, refetch: fetchCases }
}
