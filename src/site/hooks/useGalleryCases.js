import { useEffect, useState } from 'react'
import apiClient from '../../admin/api/axiosClient'

export function useGalleryCases() {
  const [cases, setCases] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiClient
      .get('/gallery')
      .then(({ data }) => {
        const list = data?.data ?? data ?? []

        setCases(
          list
            .filter((g) => g.isActive !== false)
            .map((g) => ({
              ...g,
              id: g._id ?? g.id,

              before:
                g.beforeImage?.secure_url ??
                g.before ??
                '',

              after:
                g.afterImage?.secure_url ??
                g.after ??
                '',
            }))
        )
      })
      .catch(() => setCases([]))
      .finally(() => setLoading(false))
  }, [])

  return { cases, loading }
}