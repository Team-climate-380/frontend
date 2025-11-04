import { ApiClient } from '@/shared/lib/api-client'
import { IQuestion } from '../type'

export interface IQuestionsResponce {
  data: IQuestion[]
  page: number
  per_page: number
  total?: number
  num_pages: number
  has_next: boolean
  has_previous: boolean
}

interface QuestionsParams {
  filter: string
  page?: number
  per_page?: number
  search?: string
}

const apiClient = new ApiClient()

export const getQuestions = async ({
  filter,
  page,
  per_page,
  search
}: QuestionsParams): Promise<IQuestionsResponce | null> => {
  const queryString = new URLSearchParams({
    filter: filter,
    page: String(page),
    per_page: String(per_page),
    ...(search ? { search: search } : {})
  })

  try {
    const response = await apiClient.get(`/api/questions/?${queryString}`)
    if (response.status === 'success' && 'data' in response) {
      return response.data as IQuestionsResponce
    }
    const message = 'message' in response ? response.message : 'Неизвестная ошибка сервера'
    throw new Error(message)
  } catch (error) {
    console.error('Ошибка при загрузке вопросов:', error)
    throw error instanceof Error ? error : new Error('Не удалось загрузить вопросы')
  }
}
