import { useMutation, useQueryClient } from '@tanstack/react-query'
import { DepartmentInfo } from '@/entities/groups'
import { SurveyResults } from '@/entities/survey-results/results-model'
import { ApiClient } from '@/shared/lib/api-client'
import { ISurveysResponse, TSurveyUpdate } from '../types'

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
  //   const employeeOptions = employeesRes.data.map(emp => emp.full_name)
  //   return [...departmentOptions /*, ...employeeOptions */]
  // }
}

export const createSurvey = async (surveyPayload: Record<string, unknown>) => {
  const response = await api.post('/api/surveys/', surveyPayload, {})
  if ('data' in response) {
    return response.data
  }
  throw new Error('Не удалось создать опрос')
}

export const updateSurvey = async (surveyPayload: Partial<TSurveyUpdate>, id: number) => {
  const response = await api.patch<SurveyResults>(`/api/surveys/${id}/`, surveyPayload, {})
  if ('data' in response) {
    return response.data
  }
  throw new Error('Не удалось обновить опрос')
}

export const fetchSurveyById = async (id: number) => {
  const response = await api.get<SurveyResults>(`/api/surveys/${id}/`)
  if (response.status === 'success' && 'data' in response) return response.data
  throw new Error('Не удалось получить данные опроса')
}

export const getAllSurveys = async (
  pageParam: number,
  currentFilter: string,
  currentDepartment: string,
  searchQuery: string
) => {
  // Строим параметры запроса явно, чтобы не терять фильтры
  const params = new URLSearchParams()

  params.set('page', String(pageParam))

  if (currentFilter) params.set('status', currentFilter)

  if (currentDepartment) {
    params.set('department', currentDepartment)
  }

  const trimmedSearch = (searchQuery ?? '').trim()
  if (trimmedSearch) {
    params.set('search', trimmedSearch)
  }

  const url = `/api/surveys/?${params.toString()}`
  const response = await api.get<ISurveysResponse>(url)

  if (response.status === 'success' && 'data' in response) {
    return response.data
  }
  throw new Error('Ошибка при получении данных')
}

export const deleteSurvey = async (id: number) => {
  const response = await api.delete(`/api/surveys/${id}/`)

  if ('error' in response) {
    throw new Error('Ошибка при удалении опроса')
  }

  return null
}

export const useToggleSurveyMutation = () => {
  const queryClient = useQueryClient()

  const getOnSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['surveys'] })
  }

  const getOnError = (error: Error) => {
    console.error('Ошибка мутации:', error)
  }

  const { mutate: deleteSurveyMutate } = useMutation({
    mutationFn: deleteSurvey,
    onSuccess: getOnSuccess,
    onError: getOnError
  })

  const { mutate: cancelDeleteSurveyMutate } = useMutation({
    mutationFn: (updatedSurvey: SurveyResults) => {
      return updateSurvey(updatedSurvey, updatedSurvey.id)
    },
    onSuccess: getOnSuccess,
    onError: getOnError
  })

  const { mutate: toggleFavoriteMutate } = useMutation({
    mutationFn: (updatedSurvey: SurveyResults) => {
      const toggleFavoriteSurvey = { is_favorite: !updatedSurvey.is_favorite }
      return updateSurvey(toggleFavoriteSurvey, updatedSurvey.id)
    },
    onSuccess: getOnSuccess,
    onError: getOnError
  })

  return { deleteSurveyMutate, cancelDeleteSurveyMutate, toggleFavoriteMutate }
}
