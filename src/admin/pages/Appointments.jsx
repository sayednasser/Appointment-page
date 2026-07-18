import { useMemo, useState } from 'react'
import { CalendarX2 } from 'lucide-react'
import { useAppointments } from '../hooks/useAppointments'
import { useToast } from '../components/ui/ToastProvider'
import AppointmentFilters from '../components/appointments/AppointmentFilters'
import AppointmentsTable from '../components/appointments/AppointmentsTable'
import EmptyState from '../components/ui/EmptyState'
import { TableSkeleton } from '../components/ui/Skeleton'

export default function Appointments() {
  const { appointments, loading, setStatus } = useAppointments()
  const { showToast } = useToast()
  const [filters, setFilters] = useState({ name: '', doctor: '', date: '' })

  // Build doctor options from normalised data (a.doctor is already the name string)
  const doctorOptions = useMemo(
    () => [...new Set(appointments.map((a) => a.doctor).filter(Boolean))],
    [appointments]
  )

  const filtered = useMemo(() => {
    return appointments.filter((a) => {
      const matchesName = (a.patientName ?? '').toLowerCase().includes(filters.name.toLowerCase())
      const matchesDoctor = !filters.doctor || a.doctor === filters.doctor
      // a.date is normalised from appointmentDate
      const matchesDate = !filters.date || a.date === filters.date
      return matchesName && matchesDoctor && matchesDate
    })
  }, [appointments, filters])

  const handleConfirm = async (appointment) => {
    try {
      await setStatus(appointment.id, 'confirmed')
      showToast(`تم تأكيد حجز ${appointment.patientName}`)
    } catch {
      showToast('حدث خطأ أثناء التأكيد', 'error')
    }
  }

  const handleCancel = async (appointment) => {
    try {
      await setStatus(appointment.id, 'cancelled')
      showToast(`تم إلغاء حجز ${appointment.patientName}`, 'info')
    } catch {
      showToast('حدث خطأ أثناء الإلغاء', 'error')
    }
  }

  return (
    <div className="space-y-5">
      <div className="admin-card p-4">
        <AppointmentFilters filters={filters} setFilters={setFilters} doctorOptions={doctorOptions} />
      </div>

      <div className="admin-card">
        {loading ? (
          <TableSkeleton rows={5} cols={7} />
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={CalendarX2}
            title="لا توجد حجوزات"
            description="لا توجد حجوزات مطابقة لمعايير البحث الحالية."
          />
        ) : (
          <AppointmentsTable appointments={filtered} onConfirm={handleConfirm} onCancel={handleCancel} />
        )}
      </div>
    </div>
  )
}
