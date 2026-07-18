import { useCallback, useEffect, useState } from 'react'
import * as reviewsService from '../services/reviewsService'

export function useReviews() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchReviews = useCallback(async () => {
    setLoading(true)
    try {
      const data = await reviewsService.getReviews()
      setReviews(Array.isArray(data) ? data : [])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchReviews()
  }, [fetchReviews])

  const setStatus = async (id, status) => {
    const updated = await reviewsService.updateReviewStatus(id, status)
    setReviews((prev) => prev.map((r) => (r.id === id ? updated : r)))
    return updated
  }

  const removeReview = async (id) => {
    await reviewsService.deleteReview(id)
    setReviews((prev) => prev.filter((r) => r.id !== id))
  }

  const editReview = async (id, payload) => {
    const updated = await reviewsService.updateReview(id, payload)
    setReviews((prev) => prev.map((r) => (r.id === id ? updated : r)))
    return updated
  }

  return { reviews, loading, setStatus, removeReview, editReview, refetch: fetchReviews }
}
