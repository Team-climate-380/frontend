import { ApiClient } from '@/shared/lib/api-client'
import { IQuestion } from '../type'

const apiClient = new ApiClient()

export const updateQuestion = async (id: number, body: Partial<IQuestion>): Promise<IQuestion | null> => {
  const response = await apiClient.patch<IQuestion>(`/api/questions/${id}`, body)
  if (response.status === 'success' && 'data' in response) {
    return response.data
  } else if ('message' in response) {
    console.error('Ошибка при обновлении вопроса:', response.message)
  }
  return null
}
