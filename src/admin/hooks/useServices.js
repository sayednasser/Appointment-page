import { useCallback, useEffect, useState } from 'react'
import * as servicesService from '../services/servicesService'

export function useServices() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchServices = useCallback(async () => {
    setLoading(true)
    try {
      const data = await servicesService.getServices()
      const list = Array.isArray(data) ? data : []
      setServices([...list].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchServices()
  }, [fetchServices])

  const addService = async (payload) => {
    const item = await servicesService.createService(payload)
    setServices((prev) => [...prev, item].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)))
    return item
  }

  const editService = async (id, payload) => {
    const updated = await servicesService.updateService(id, payload)
    setServices((prev) => prev.map((s) => (s.id === id ? updated : s)))
    return updated
  }

  const removeService = async (id) => {
    await servicesService.deleteService(id)
    setServices((prev) => prev.filter((s) => s.id !== id))
  }

  const toggleVisibility = async (service) => {
    const nextStatus = service.status === 'active' ? 'hidden' : 'active'
    return editService(service.id, { ...service, status: nextStatus })
  }

  const moveService = async (service, direction) => {
    const sorted = [...services].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    const index = sorted.findIndex((s) => s.id === service.id)
    const swapWith = direction === 'up' ? index - 1 : index + 1
    if (swapWith < 0 || swapWith >= sorted.length) return

    const reordered = [...sorted]
    ;[reordered[index], reordered[swapWith]] = [reordered[swapWith], reordered[index]]
    const orderedIds = reordered.map((s) => s.id)

    const updated = await servicesService.reorderServices(orderedIds)
    const list = Array.isArray(updated) ? updated : []
    setServices([...list].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)))
  }

  return {
    services,
    loading,
    addService,
    editService,
    removeService,
    toggleVisibility,
    moveService,
    refetch: fetchServices,
  }
}
