import { SurveyResults } from '@entities/survey-results/results-model'
import { DepartmentInfo } from '@entities/groups/types/department-types'

export interface ISurveysResponse {
  data: SurveyResults[]
  page: number
  per_page: number
  total: number
  num_pages: number
  has_next: boolean
  has_previous: boolean
}

export type TSurveyUpdate = Pick<
  SurveyResults,
  'name' | 'status' | 'comment' | 'started_at' | 'finished_at' | 'is_favorite' | 'to_delete'
> &
  Pick<DepartmentInfo, 'department_name'>
