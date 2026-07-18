import apiClient from '../../admin/api/axiosClient'

export function useSubmitReview() {
  const submitReview = async (payload) => {
    // Backend expects 'name' not 'patientName'
    const { patientName, ...rest } = payload
    const body = { ...rest, name: patientName ?? rest.name }
    const { data } = await apiClient.post('/review', body)
    return data?.data ?? data
  }

  return { submitReview }
}
