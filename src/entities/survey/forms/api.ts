import { TDepartment } from '@/entities/departament/model/types'
import { TEmployee } from '@/entities/employee/model/types'
import { ApiClient } from '@/shared/lib/api-client'

const api = new ApiClient({})
export const fetchParticipants = async (): Promise<string[]> => {
  // TODO: сейчас department принимает объект, а не массив, также сервер не принимает список пользователей

  const [departmentsRes, employeesRes] = await Promise.all([
    api.get<TDepartment[]>('/api/departments/'),
    api.get<TEmployee[]>('/api/employees/')
  ])
  if ('data' in departmentsRes && 'data' in employeesRes) {
    const departmentOptions = departmentsRes.data.map(dep => dep.department_name)
    // const employeeOptions = employeesRes.data.map(emp => emp.full_name)
    return [...departmentOptions /*, ...employeeOptions */]
  }
  return []
}

export const createSurvey = async (surveyPayload: Record<string, unknown>) => {
  const response = await api.post('/api/surveys/', {}, surveyPayload)
  if ('data' in response) {
    return response.data
  }
  throw new Error('Не удалось создать опрос')
}
