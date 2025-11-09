import { ApiClient } from '@/shared/lib/api-client'
import { employeesProps, QuestionResultProps } from '@/shared/ui/question-result/ui/question-result'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const client = new ApiClient()

export enum StatusEnum {
  Draft = 'draft',
  Active = 'active',
  Completed = 'completed',
  Archived = 'archived'
}

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
  employees: employeesProps[] | undefined
  to_delete: boolean
}

export interface SurveyPatch {
  id?: number
  name: string
  status: string
  comment: string
  started_at: string
  finished_at: string
  department_name: string | undefined
}

const getSurveyResults = async (id: number) => {
  const response = await client.get<SurveyResults>(`/api/surveys/${id}/`)
  if (response.status === 'success' && 'data' in response) return response.data
  if (response.status === 'error' && 'message' in response) console.error(response.message)
}

const patchSurveyResults = async (id: number, surveyChange: Partial<SurveyPatch>) => {
  const response = await client.patch<SurveyResults>(`/api/surveys/${id}/`, surveyChange)
  if (response.status === 'success' && 'data' in response) return response.data
  if (response.status === 'error' && 'message' in response) console.error(response.message)
}

export const useResultsQuery = (id: number) =>
  useQuery({
    queryKey: ['results', id],
    queryFn: () => getSurveyResults(id)
  })
export const useSurveyResultMutations = () => {
  const queryClient = useQueryClient()

  const handleSuccess = async (
    _data: SurveyResults | undefined,
    variables: { id: number; surveyChange: Partial<SurveyPatch> }
  ) => {
    const { id } = variables
    await queryClient.invalidateQueries({ queryKey: ['results', id] })
  }
  const handleError = (err: Error) => console.error(err)
  const editSurvey = useMutation({
    mutationFn: ({ id, surveyChange }: { id: number; surveyChange: Partial<SurveyPatch> }) => {
      return patchSurveyResults(id, surveyChange)
    },
    onSuccess: handleSuccess,
    onError: handleError
  })
  return { editSurvey }
}
