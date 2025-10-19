import { ApiClient } from '@/shared/lib/api-client'
import { Employee } from '../type'
import { TEmployeeForm } from '../forms/use-create-employee-edit-form'

const apiClient = new ApiClient()

export const getEmployees = async (param: string): Promise<Employee[] | null> => {
  const response = await apiClient.get<Employee[]>(`/api/employees${param}`)
  if (response.status === 'success' && 'data' in response) {
    return response.data
  } else if ('message' in response) {
    console.error('Ошибка при загрузке сотрудников:', response.message)
  }
  return null
}

export const addEmployee = async (employee: TEmployeeForm): Promise<Employee | null> => {
  const response = await apiClient.post<Employee>('/api/employees', employee)
  if (response.status === 'success' && 'data' in response) {
    return response.data
  } else if ('message' in response) {
    console.error('Ошибка при добавлении сотрудника', response.message)
  }
  return null
}

export const changeEmployee = async (
  employeeChange: Partial<TEmployeeForm>,
  idEmployee: number
): Promise<Employee | null> => {
  const response = await apiClient.patch<Employee>(`/api/employees/${idEmployee}`, employeeChange)
  if (response.status === 'success' && 'data' in response) {
    return response.data
  } else if ('message' in response) {
    console.error('Ошибка при изменении данных сотрудника', response.message)
  }
  return null
}
