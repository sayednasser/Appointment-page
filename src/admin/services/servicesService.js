import apiClient from '../api/axiosClient'

function normaliseService(raw) {
  return {
    ...raw,
    id: raw._id ?? raw.id,
    status: raw.isActive === false ? 'hidden' : 'active',
    order: raw.displayOrder ?? raw.order ?? 0,
    image: raw.image ?? '',
    icon: raw.icon ?? 'Sparkles',
  }
}

function buildPayload(formData) {
  const { status, order, image, ...rest } = formData
  const fd = new FormData()

  if (rest.name) fd.append('name', rest.name)
  if (rest.description) fd.append('description', rest.description)
  if (rest.icon) fd.append('icon', rest.icon)
  fd.append('isActive', status === 'active' ? 'true' : 'false')
  if (order !== undefined) fd.append('displayOrder', String(order))

  if (image instanceof File) {
    fd.append('image', image)
  }

  return fd
}

export async function getServices() {
  const { data } = await apiClient.get('/service')
  const list = data?.data ?? data ?? []
  return list.map(normaliseService)
}

export async function createService(formData) {
  const { data } = await apiClient.post('/service', buildPayload(formData))
  return normaliseService(data?.data ?? data)
}

export async function updateService(id, formData) {
  const { data } = await apiClient.patch(`/service/${id}`, buildPayload(formData))
  return normaliseService(data?.data ?? data)
}

export async function deleteService(id) {
  await apiClient.delete(`/service/${id}`)
  return true
}

export async function reorderServices(orderedIds) {
  const { data } = await apiClient.patch('/service/reorder', { orderedIds })
  const list = data?.data ?? data ?? []
  return list.map(normaliseService)
}
