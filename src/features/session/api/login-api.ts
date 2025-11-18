import { apiClient } from '@/shared/lib/api-client'

export const loginUser = async ({ email, password }: { email: string; password: string }) => {
  const response = await apiClient.post('/api/auth/login', { email, password })
  if ('error' in response) {
    if (response.statusCode === 401) throw new Error('Invalid credentials')
    throw new Error('Ошибка авторизации')
  }
  return response
}
