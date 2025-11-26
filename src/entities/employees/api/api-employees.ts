import { ApiClient } from '@/shared/lib/api-client'
import { Employee } from '../type'
import { TEmployeeForm } from '../forms/use-create-employee-edit-form'

const apiClient = new ApiClient()

const handleUserAlreadyExistsError = (response: {
  status: string
  error: unknown
  message: string
  statusCode?: number | undefined
}) => {
  if (response.statusCode === 400 && typeof response.error === 'object' && response.error !== null) {
    let errormessage = ''
    if ('email' in response.error && Array.isArray(response.error.email)) {
      errormessage += response.error.email[0]
    }
    if ('tg_username' in response.error && Array.isArray(response.error.tg_username)) {
      errormessage += ` ${response.error.tg_username[0]}`
    }
    if (errormessage !== '') {
      throw new Error(errormessage.trim())
    }
    throw new Error('Ошибка при добавлении сотрудника или Ошибка при изменении данных сотрудника')
  }
}

export const getEmployees = async (params: string): Promise<Employee[] | null> => {
  const response = await apiClient.get<Employee[]>(`/api/employees${params}`)
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
    handleUserAlreadyExistsError(response)
    throw new Error('Ошибка при добавлении сотрудника')
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
    handleUserAlreadyExistsError(response)
    throw new Error('Ошибка при изменении данных сотрудника')
  }
  return null
}

export const deleteEmployee = async (idEmployee: number) => {
  const response = await apiClient.delete(`/api/employees/${idEmployee}`)
  if (response.status === 'success' && 'data' in response) {
    return response.data
  } else if ('message' in response) {
    console.error('Ошибка при удалении сотрудника', response.message)
  }
  return null
}

export const cancelDeleteEmployee = async (idEmployee: number): Promise<Employee | null> => {
  const response = await apiClient.patch<Employee>(`/api/employees/${idEmployee}`, {
    to_inactivate: false
  })
  if (response.status === 'success' && 'data' in response) {
    return response.data
  } else if ('message' in response) {
    console.error('Ошибка при удалении сотрудника', response.message)
  }
  return null
}
