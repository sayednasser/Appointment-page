import { useEffect, useState } from 'react'
import apiClient from '../../admin/api/axiosClient'

export function useActiveServices() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiClient
      .get('/service')
      .then(({ data }) => {
        const list = data?.data ?? data ?? []
        setServices(
          list
            .filter((s) => s.isActive !== false)
            .map((s) => ({ ...s, id: s._id ?? s.id, order: s.displayOrder ?? s.order ?? 0 }))
            .sort((a, b) => a.order - b.order)
        )
      })
      .catch(() => setServices([]))
      .finally(() => setLoading(false))
  }, [])

  return { services, loading }
}
