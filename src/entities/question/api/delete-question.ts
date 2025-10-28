import { ApiClient } from '@/shared/lib/api-client'
import { IQuestion } from '../type'

const apiClient = new ApiClient()

export const deleteQuestion = async (id: number): Promise<IQuestion | null> => {
  const response = await apiClient.delete<IQuestion>(`/api/questions/${id}`, { 'Content-Type': 'application/json' })
  if (response.status === 'success' && 'data' in response) {
    return response.data
  } else if ('message' in response) {
    console.error('Ошибка при удалении вопроса:', response.message)
  }
  return null
}
