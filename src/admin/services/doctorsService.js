import apiClient from '../api/axiosClient'

// Normalise a doctor from the backend (_id -> id, field name mappings)
function normaliseDoctor(raw) {
  return {
    ...raw,
    id: raw._id ?? raw.id,
    // Backend uses specialization; UI uses specialty
    specialty: raw.specialization ?? raw.specialty ?? '',
    // Backend uses description; UI uses bio
    bio: raw.description ?? raw.bio ?? '',
    // Backend uses isActive boolean; UI uses status string
    status: raw.isActive === false ? 'inactive' : 'active',
    // Backend uses workingHours array; UI uses schedule
    schedule: (raw.workingHours ?? raw.schedule ?? []).map((wh) => ({
      day: wh.day,
      from: wh.startTime ?? wh.from ?? '',
      to: wh.endTime ?? wh.to ?? '',
      slotDuration: wh.slotDuration ?? 30,
      isActive: wh.isActive !== false,
    })),
    image: raw.image ?? '',
  }
}

// Prepare payload for create/update: map UI fields → backend fields
function buildPayload(formData) {
  const { specialty, bio, status, schedule, image, ...rest } = formData
  const fd = new FormData()

  fd.append('name', rest.name ?? '')
  fd.append('specialization', specialty ?? '')
  if (bio) fd.append('description', bio)
  if (rest.experience !== undefined) fd.append('experience', String(rest.experience))
  fd.append('isActive', status === 'active' ? 'true' : 'false')
  if (rest.displayOrder !== undefined) fd.append('displayOrder', String(rest.displayOrder))

  // workingHours as JSON string (multer / multipart)
  const workingHours = (schedule ?? []).map((s) => ({
    day: s.day,
    startTime: s.from,
    endTime: s.to,
    isActive: s.isActive !== false,
  }))
  fd.append('workingHours', JSON.stringify(workingHours))

  // image: only attach if it's a real File object (new upload)
  if (image instanceof File) {
    fd.append('image', image)
  }

  return fd
}

export async function getDoctors() {
  const { data } = await apiClient.get('/doctor')
  const list = data?.data ?? data ?? []
  return list.map(normaliseDoctor)
}

export async function createDoctor(formData) {
  const { data } = await apiClient.post('/doctor', buildPayload(formData))
  return normaliseDoctor(data?.data ?? data)
}

export async function updateDoctor(id, formData) {
  const { data } = await apiClient.patch(`/doctor/${id}`, buildPayload(formData))
  return normaliseDoctor(data?.data ?? data)
}

export async function deleteDoctor(id) {
  await apiClient.delete(`/doctor/${id}`)
  return true
}
