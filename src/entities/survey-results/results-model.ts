import { ApiClient } from '@/shared/lib/api-client'
import { employeesProps, QuestionResultProps } from '@/shared/ui/question-result/ui/question-result'
import { useQuery } from '@tanstack/react-query'

const client = new ApiClient()

export interface SurveyResults {
  id: number
  name: string
  status: string
  comment: string
  started_at: string
  finished_at: string
  is_favorite: boolean
  question_count: number
  finished_count: number
  questions: QuestionResultProps[]
  department: {
    id: number
    name: string
  }
  employees: employeesProps[]
}

const getServeyResults = async (id: number) => {
  const response = await client.get<SurveyResults>(`/api/surveys/${id}/`)
  if (response.status === 'success' && 'data' in response) return response.data
  if (response.status === 'error' && 'message' in response) console.error(response.message)
}

export const useResultsQuery = (id: number) =>
  useQuery({
    queryKey: ['results', id],
    queryFn: () => getServeyResults(id)
  })
