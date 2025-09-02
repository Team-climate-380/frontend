// import { createUrl, typeParams } from './utils/create-url'

export const routes = {
  home: () => '/',
  login: () => '/login',
  questions: () => '/questions',
  surveys: () => '/surveys',
  new_surveys: () => '/new-surveys',
  results_surveys: () => '/results-surveys',
  employees: () => '/employees',
  departments: () => '/departments'

  // TODO: remove it, just example
  // chunkDetails: (params: { id: string }, queryParams: typeParams) => createUrl('/chunk/:id', params, queryParams),
  // chunks: (queryParams: typeParams) => createUrl('/chunk/:id', {}, queryParams)
}
