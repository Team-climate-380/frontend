import { createUrl, typeParams } from './utils/create-url'

export const routes = {
  home: () => '/',
  login: () => '/login',
  questions: (queryParams?: typeParams) => createUrl('/questions/', {}, queryParams),
  surveys: () => '/surveys',
  new_survey: () => '/new-survey',
  results_survey: () => '/results-survey',
  employees: (queryParams?: typeParams) => createUrl('/employees/', {}, queryParams),
  departments: () => '/departments',
  password_recovery: () => '/password-recovery'

  // TODO: remove it, just example
  // chunkDetails: (params: { id: string }, queryParams: typeParams) => createUrl('/chunk/:id', params, queryParams),
  // chunks: (queryParams: typeParams) => createUrl('/chunk/:id', {}, queryParams)
}
