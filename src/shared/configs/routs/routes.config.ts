import { createUrl, typeParams } from './utils/create-url'

export const routes = {
  home: () => '/',
  login: () => '/login',
  questions: (queryParams?: typeParams) => createUrl('/questions/', {}, queryParams),
  surveys: () => '/surveys',
  new_survey: () => '/new-survey',
  edit_survey_path: () => '/edit-survey',
  edit_survey: (id: number | null | undefined) => `/edit-survey?surveyId=${id}`,
  results_survey: (id: number) => `/results-survey?surveyId=${id}`,
  results_survey_path: () => '/results-survey',
  full_results: (id: number) => `/full-results?surveyId=${id}`,
  full_results_path: () => '/full-results',
  short_results: (id: number) => `/short-results?surveyId=${id}`,
  short_results_path: () => '/short-results',
  employees: (queryParams?: typeParams) => createUrl('/employees/', {}, queryParams),
  departments: () => '/departments',
  password_recovery: () => '/password-recovery'

  // TODO: remove it, just example
  // chunkDetails: (params: { id: string }, queryParams: typeParams) => createUrl('/chunk/:id', params, queryParams),
  // chunks: (queryParams: typeParams) => createUrl('/chunk/:id', {}, queryParams)
}
