import { useCallback, useEffect, useState } from 'react'
import * as doctorsService from '../services/doctorsService'

export function useDoctors() {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchDoctors = useCallback(async () => {
    setLoading(true)
    try {
      const data = await doctorsService.getDoctors()
      setDoctors(Array.isArray(data) ? data : [])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDoctors()
  }, [fetchDoctors])

  const addDoctor = async (payload) => {
    const doctor = await doctorsService.createDoctor(payload)
    setDoctors((prev) => [...prev, doctor])
    return doctor
  }

  const editDoctor = async (id, payload) => {
    const updated = await doctorsService.updateDoctor(id, payload)
    setDoctors((prev) => prev.map((d) => (d.id === id ? updated : d)))
    return updated
  }

  const removeDoctor = async (id) => {
    await doctorsService.deleteDoctor(id)
    setDoctors((prev) => prev.filter((d) => d.id !== id))
  }

  return { doctors, loading, addDoctor, editDoctor, removeDoctor, refetch: fetchDoctors }
}
