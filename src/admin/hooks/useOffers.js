import { useCallback, useEffect, useState } from 'react'
import * as offersService from '../services/offersService'

export function useOffers() {
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchOffers = useCallback(async () => {
    setLoading(true)
    try {
      const data = await offersService.getOffers()
      setOffers(Array.isArray(data) ? data : [])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchOffers()
  }, [fetchOffers])

  const addOffer = async (payload) => {
    const item = await offersService.createOffer(payload)
    setOffers((prev) => [item, ...prev])
    return item
  }

  const editOffer = async (id, payload) => {
    const updated = await offersService.updateOffer(id, payload)
    setOffers((prev) => prev.map((o) => (o.id === id ? updated : o)))
    return updated
  }

  const removeOffer = async (id) => {
    await offersService.deleteOffer(id)
    setOffers((prev) => prev.filter((o) => o.id !== id))
  }

  const toggleVisibility = async (offer) => {
    const nextStatus = offer.status === 'active' ? 'hidden' : 'active'
    return editOffer(offer.id, { ...offer, status: nextStatus })
  }

  return { offers, loading, addOffer, editOffer, removeOffer, toggleVisibility, refetch: fetchOffers }
}
