import apiClient from '../api/axiosClient'

function normaliseReview(raw) {
  return {
    ...raw,
    id: raw._id ?? raw.id,
    // Backend uses name; UI uses patientName
    patientName: raw.name ?? raw.patientName ?? '',
    // Backend uses comment; keep as-is but also map from comment
    comment: raw.comment ?? '',
    status: raw.status ?? 'pending',
    image: raw.image ?? '',
  }
}

function buildPayload(formData) {
  const { patientName, image, ...rest } = formData
  const fd = new FormData()

  // Backend expects 'name' not 'patientName'
  if (patientName !== undefined) fd.append('name', patientName)
  if (rest.rating !== undefined) fd.append('rating', String(rest.rating))
  if (rest.comment) fd.append('comment', rest.comment)
  if (rest.status) fd.append('status', rest.status)

  if (image instanceof File) {
    fd.append('image', image)
  }

  return fd
}

export async function getReviews() {
  const { data } = await apiClient.get('/review')
  const list = data?.data ?? data ?? []
  return list.map(normaliseReview)
}

export async function updateReviewStatus(id, status) {
  const { data } = await apiClient.patch(`/review/${id}`, { status })
  return normaliseReview(data?.data ?? data)
}

export async function updateReview(id, formData) {
  const { data } = await apiClient.patch(`/review/${id}`, buildPayload(formData))
  return normaliseReview(data?.data ?? data)
}

export async function deleteReview(id) {
  await apiClient.delete(`/review/${id}`)
  return true
}
