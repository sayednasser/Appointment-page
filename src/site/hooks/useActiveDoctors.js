import { useEffect, useState } from 'react'
import apiClient from '../../admin/api/axiosClient'

export function useActiveDoctors() {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiClient
      .get('/doctor')
      .then(({ data }) => {
        const list = data?.data ?? data ?? []
        setDoctors(
          list
            .filter((d) => d.isActive !== false)
            .map((d) => ({
              ...d,
              id: d._id ?? d.id,

              // الصورة
              image: d.image?.secure_url ?? d.image ?? '',

              specialty: d.specialization ?? d.specialty ?? '',
              bio: d.description ?? d.bio ?? '',

              schedule: (d.workingHours ?? d.schedule ?? []).map((wh) => ({
                day: wh.day,
                from: wh.startTime ?? wh.from ?? '',
                to: wh.endTime ?? wh.to ?? '',
              })),
            }))
        )
      })
      .catch(() => setDoctors([]))
      .finally(() => setLoading(false))
  }, [])

  return { doctors, loading }
}
