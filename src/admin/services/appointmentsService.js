import apiClient from '../api/axiosClient'

function normaliseAppointment(raw) {
  return {
    ...raw,
    id: raw._id ?? raw.id,
    // Backend uses appointmentDate/appointmentTime; UI uses date/time
    date: raw.appointmentDate ?? raw.date ?? '',
    time: raw.appointmentTime ?? raw.time ?? '',
    status: raw.status ?? 'pending',
    // doctor may be an object (populated) or a string ID
    doctor:
      typeof raw.doctor === 'object' && raw.doctor !== null
        ? raw.doctor.name ?? raw.doctor._id
        : raw.doctor ?? '',
  }
}

export async function getAppointments() {
  const { data } = await apiClient.get('/appointment')
  const list = data?.data ?? data ?? []
  return list.map(normaliseAppointment)
}

export async function updateAppointmentStatus(id, status) {
  const { data } = await apiClient.patch(`/appointment/${id}`, { status })
  return normaliseAppointment(data?.data ?? data)
}

export async function createAppointment(payload) {
  const { data } = await apiClient.post('/appointment', payload)
  return normaliseAppointment(data?.data ?? data)
}
