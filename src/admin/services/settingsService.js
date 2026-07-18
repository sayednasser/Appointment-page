import apiClient from '../api/axiosClient'

function normaliseSettings(raw) {
  if (!raw) return raw

  const data = raw?.data?.data ?? raw?.data ?? raw

  return {
    ...data,

    whatsapp: data.socialLinks?.whatsapp ?? '',

    googleMapsUrl: data.googleMap ?? '',

    // عرض الصورة القادمة من الباك
    heroImage: data.heroImage?.secure_url ?? '',

    // لو هتستخدم اللوجو بعدين
    logo: data.logo?.secure_url ?? '',
  }
}
function buildPayload(formData) {
  const fd = new FormData()

  if (formData.clinicName?.trim()) {
    fd.append('clinicName', formData.clinicName)
  }

  if (formData.heroTitle?.trim()) {
    fd.append('heroTitle', formData.heroTitle)
  }

  if (formData.heroSubtitle?.trim()) {
    fd.append('heroSubtitle', formData.heroSubtitle)
  }

  if (formData.heroDescription?.trim()) {
    fd.append('heroDescription', formData.heroDescription)
  }

  if (formData.phone?.trim()) {
    fd.append('phone', formData.phone)
  }

  if (formData.address?.trim()) {
    fd.append('address', formData.address)
  }

  if (formData.googleMapsUrl?.trim()) {
    fd.append('googleMap', formData.googleMapsUrl)
  }

  if (formData.footerText?.trim()) {
    fd.append('footerText', formData.footerText)
  }

  fd.append(
    'socialLinks',
    JSON.stringify({
      whatsapp: formData.whatsapp || '',
    })
  )

  if (formData.heroImage instanceof File) {
    fd.append('heroImage', formData.heroImage)
  }

  return fd
}

export async function getSettings() {
  const { data } = await apiClient.get('/setting')
  return normaliseSettings(data)
}

export async function updateSettings(formData) {
  const fd = new FormData()

  if (formData.clinicName)
    fd.append('clinicName', formData.clinicName)

  if (formData.heroTitle)
    fd.append('heroTitle', formData.heroTitle)

  if (formData.heroDescription)
    fd.append('heroDescription', formData.heroDescription)

  if (formData.phone)
    fd.append('phone', formData.phone)

  if (formData.address)
    fd.append('address', formData.address)

  if (formData.googleMapsUrl)
    fd.append('googleMap', formData.googleMapsUrl)

  fd.append(
    'socialLinks',
    JSON.stringify({
      whatsapp: formData.whatsapp || '',
    })
  )

  // صورة الهيرو
  if (formData.heroImage instanceof File) {
    fd.append('image', formData.heroImage)
  }

  const { data } = await apiClient.patch('/setting', fd)

  return normaliseSettings(data)
}