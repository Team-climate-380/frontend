import { DepartmentInfo } from '@/entities/groups'
import { SurveyResults } from '@/entities/survey-results/results-model'
import { ApiClient } from '@/shared/lib/api-client'
import { ISurveysResponse } from '../types'

const api = new ApiClient({})

export const fetchParticipants = async (): Promise<string[]> => {
  // TODO: сейчас department принимает объект, а не массив, также сервер не принимает список пользователей
  const departmentsRes = await api.get<DepartmentInfo[]>('/api/departments/')
  if ('data' in departmentsRes) {
    const departmentOptions = departmentsRes.data.map(dep => dep.department_name)
    return departmentOptions
  }
  return []
  // const [departmentsRes, employeesRes] = await Promise.all([
  //   api.get<DepartmentInfo[]>('/api/departments/'),
  //   api.get<EmployeeInfo[]>('/api/employees/')
  // ])
  // if ('data' in departmentsRes && 'data' in employeesRes) {
  //   const departmentOptions = departmentsRes.data.map(dep => dep.department_name)
  // const employeeOptions = employeesRes.data.map(emp => emp.full_name)
  // return [...departmentOptions /*, ...employeeOptions */]
}

export const createSurvey = async (surveyPayload: Record<string, unknown>) => {
  const response = await api.post('/api/surveys/', surveyPayload, {})
  if ('data' in response) {
    return response.data
  }
  throw new Error('Не удалось создать опрос')
}

export const updateSurvey = async (surveyPayload: Record<string, unknown>, id: number) => {
  const response = await api.patch(`/api/surveys/${id}/`, surveyPayload, {})
  if ('data' in response) {
    return response.data
  }
  throw new Error('Не удалось обновить опрос')
}

export const fetchSurveyById = async (id: number) => {
  const response = await api.get<SurveyResults>(`/api/surveys/${id}/`)
  if (response.status === 'success' && 'data' in response) return response.data
  throw new Error('Не удалось получить данные опроса')
export const getAllSurveys = async (
  pageParam: number,
  currentFilter: string,
  currentDepartment: number,
  searchQuery: string
) => {
  let url = `/api/surveys/?page=${pageParam}&filter=${currentFilter}`
  const queryParams = window.location?.search

  if (queryParams.includes('department')) {
    url = url + `&department=${currentDepartment}`
  }

  if (queryParams.includes('search')) {
    url = `/api/surveys/?page=${pageParam}&search=${searchQuery}`
  }

  const response = await api.get<ISurveysResponse>(`${url}`)
  if (response.status === 'success' && 'data' in response) {
    return response.data
  }
  throw new Error('Ошибка при получении данных')
}

export const deleteSurvey = async (id: number | undefined | null) => {
  console.log(`удалить опрос: ${id}`)
  // TODO: ждем, пока бэк реализует удаление опроса

  // const response = await api.delete(`/api/surveys/${id}`)

  // if ('error' in response) {
  //   throw new Error('Не удалось удлаить опрос')
  // }
  // return response.data
}
