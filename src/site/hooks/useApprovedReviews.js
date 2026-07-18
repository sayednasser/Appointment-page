import { useEffect, useState } from 'react'
import apiClient from '../../admin/api/axiosClient'

export function useApprovedReviews() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiClient
      .get('/review')
      .then(({ data }) => {
        const list = data?.data ?? data ?? []
        setReviews(
          list
            .filter((r) => r.status === 'approved')
            .map((r) => ({
              ...r,
              id: r._id ?? r.id,
              patientName: r.name ?? r.patientName ?? '',
            }))
        )
      })
      .catch(() => setReviews([]))
      .finally(() => setLoading(false))
  }, [])

  return { reviews, loading }
}
