import { SurveyResults } from '@entities/survey-results/results-model'

export interface ISurveysResponse {
  data: SurveyResults[]
  page: number
  per_page: number
  total: number
  num_pages: number
  has_next: boolean
  has_previous: boolean
}
