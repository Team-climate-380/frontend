import { ApiClient } from '@/shared/lib/api-client'
import { IQuestionForm } from '../forms/use-create-edit-question-form'

const apiClient = new ApiClient()

// type TNewQuestionData = {
//   text: string
//   question_type: string
//   isfavorite?: boolean
// }

type TNewQuestionResponse = {
  id: number
  surveys: []
  text: string
  question_type: string
  is_favorite: boolean
}

export const createNewQuestion = async (body: Partial<IQuestionForm>): Promise<TNewQuestionResponse | null> => {
  const response = await apiClient.post<TNewQuestionResponse>(`/api/questions/`, body)
  if (response.status === 'success' && 'data' in response) {
    return response.data as TNewQuestionResponse
  } else if ('message' in response) {
    console.error('Ошибка при создании вопроса', response.message)
  }
  return null
}
