import { useEffect, useState } from 'react'
import apiClient from '../../admin/api/axiosClient'

export function useActiveOffers() {
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiClient
      .get('/offer')
      .then(({ data }) => {
        const list = data?.data ?? data ?? []

        setOffers(
          list
            .filter((o) => o.isActive !== false)
            .map((o) => ({
              ...o,
              id: o._id ?? o.id,
              image: o.image?.secure_url ?? '',
            }))
        )
      })
      .catch(() => setOffers([]))
      .finally(() => setLoading(false))
  }, [])

  return { offers, loading }
}