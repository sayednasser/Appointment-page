import apiClient from '../../admin/api/axiosClient'

export function useCreateAppointment() {
  const createAppointment = async (payload) => {
    const { data } = await apiClient.post('/appointment', payload)
    return data?.data ?? data
  }
  return { createAppointment }
}
