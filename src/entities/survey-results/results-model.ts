import { ApiClient } from '@/shared/lib/api-client'
import { QuestionResultProps } from '@/shared/ui/question-result/ui/question-result'
import { create } from 'zustand'

const client = new ApiClient()

export interface SurveyResults {
  id: number
  name: string
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
}

type SurveyResultsStore = {
  results: SurveyResults | null
  loading: boolean
  error: string | null
  fetchResults: (id: number) => Promise<void>
}

export const useSurveyResultsStore = create<SurveyResultsStore>(set => ({
  results: null,
  loading: false,
  error: null,

  fetchResults: async (id: number) => {
    set({ loading: true, error: null })
    const response = await client.get<SurveyResults>(`/api/surveys/${id}/`)

    if (response.status === 'success' && 'data' in response) {
      set({ results: response.data, loading: false })
    } else if ('message' in response) {
      set({ error: response.message, loading: false })
    }
  }
}))
