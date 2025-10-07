import { ApiClient } from '@/shared/lib/api-client'
import { Question } from '../type'

interface Questions {
  data: Question[]
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

export const getQuestions = async ({ filter, page, per_page, search }: QuestionsParams): Promise<Questions | null> => {
  const queryString = new URLSearchParams({
    filter: filter,
    page: String(page),
    per_page: String(per_page),
    ...(search ? { search: search } : {})
  })
  const response = await apiClient.get(`/api/questions/?${queryString}`)
  if (response.status === 'success' && 'data' in response) {
    return response.data as Questions
  } else if ('message' in response) {
    console.error('Ошибка при загрузке вопросов', response.message)
  }
  return null
}
