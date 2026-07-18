import apiClient from '../api/axiosClient'

function formatDate(date) {
  if (!date) return ''

  return new Date(date).toLocaleDateString('ar-EG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
function normaliseAppointment(raw) {
  return {
    ...raw,
    id: raw._id ?? raw.id,

    date: formatDate(raw.appointmentDate ?? raw.date),

    time: raw.appointmentTime ?? raw.time ?? '',

    status: raw.status ?? 'pending',

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
