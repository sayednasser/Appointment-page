import apiClient from '../api/axiosClient'

function normaliseGalleryCase(raw) {
  return {
    ...raw,
    id: raw._id ?? raw.id,
    title: raw.title ?? '',
    description: raw.description ?? '',
    status: raw.isActive === false ? 'hidden' : 'active',

    before:
      raw.beforeImage?.secure_url ??
      raw.before ??
      '',

    after:
      raw.afterImage?.secure_url ??
      raw.after ??
      '',
  }
}

function buildPayload(formData) {
  const { before, after, status, ...rest } = formData
  const fd = new FormData()

  if (rest.title !== undefined) fd.append('title', rest.title)
  if (rest.description !== undefined) fd.append('description', rest.description)
  if (rest.displayOrder !== undefined) fd.append('displayOrder', String(rest.displayOrder))
  fd.append('isActive', status === 'active' || status === undefined ? 'true' : 'false')

  if (before instanceof File) fd.append('beforeImage', before)
  if (after instanceof File) fd.append('afterImage', after)

  return fd
}

export async function getGalleryCases() {
  const { data } = await apiClient.get('/gallery')
  const list = data?.data ?? data ?? []
  return list.map(normaliseGalleryCase)
}

export async function createGalleryCase(formData) {
  const { data } = await apiClient.post('/gallery', buildPayload(formData))
  return normaliseGalleryCase(data?.data ?? data)
}

export async function updateGalleryCase(id, formData) {
  const { data } = await apiClient.patch(`/gallery/${id}`, buildPayload(formData))
  return normaliseGalleryCase(data?.data ?? data)
}

export async function deleteGalleryCase(id) {
  await apiClient.delete(`/gallery/${id}`)
  return true
}
