import { useCallback, useEffect, useState } from 'react'
import * as appointmentsService from '../services/appointmentsService'

export function useAppointments() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAppointments = useCallback(async () => {
    setLoading(true)
    try {
      const data = await appointmentsService.getAppointments()
      setAppointments(Array.isArray(data) ? data : [])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAppointments()
  }, [fetchAppointments])

  const setStatus = async (id, status) => {
    const updated = await appointmentsService.updateAppointmentStatus(id, status)
    setAppointments((prev) => prev.map((a) => (a.id === id ? updated : a)))
    return updated
  }

  return { appointments, loading, setStatus, refetch: fetchAppointments }
}
