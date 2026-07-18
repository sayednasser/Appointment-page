import apiClient from '../api/axiosClient'

function normaliseOffer(raw) {
  return {
    ...raw,
    id: raw._id ?? raw.id,
    status: raw.isActive === false ? 'hidden' : 'active',
    image: raw.image?.secure_url ?? '',
  }
}

function buildPayload(formData) {
  const { status, image, ...rest } = formData
  const fd = new FormData()

  if (rest.title) fd.append('title', rest.title)
  if (rest.description) fd.append('description', rest.description)
  if (rest.oldPrice !== undefined) fd.append('oldPrice', String(rest.oldPrice))
  if (rest.newPrice !== undefined) fd.append('newPrice', String(rest.newPrice))
  if (rest.discountPercentage !== undefined)
    fd.append('discountPercentage', String(rest.discountPercentage))
  if (rest.startDate) fd.append('startDate', rest.startDate)
  if (rest.endDate) fd.append('endDate', rest.endDate)
  if (rest.service) fd.append('service', rest.service)
  fd.append('isActive', status === 'active' ? 'true' : 'false')

  if (image instanceof File) {
    fd.append('image', image)
  }

  return fd
}

export async function getOffers() {
  const { data } = await apiClient.get('/offer')
  const list = data?.data ?? data ?? []
  return list.map(normaliseOffer)
}

export async function createOffer(formData) {
  const { data } = await apiClient.post('/offer', buildPayload(formData))
  return normaliseOffer(data?.data ?? data)
}

export async function updateOffer(id, formData) {
  const { data } = await apiClient.patch(`/offer/${id}`, buildPayload(formData))
  return normaliseOffer(data?.data ?? data)
}

export async function deleteOffer(id) {
  await apiClient.delete(`/offer/${id}`)
  return true
}
