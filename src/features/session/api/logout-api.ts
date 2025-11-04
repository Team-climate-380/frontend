import { apiClient } from '@/shared/lib/api-client'

export const logoutUser = async () => {
  const response = await apiClient.post('/api/auth/logout')
  if ('error' in response) {
    console.error(response.error)
  }
}
