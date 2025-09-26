import { ApiClient } from '@/shared/lib/api-client'
import { Employee } from '../employees/type'

export const getEmployees = async (param: string): Promise<Employee[] | null> => {
  const apiClient = new ApiClient()
  const response = await apiClient.get<Employee[]>(`/api/employees${param}`)
  if (response.status === 'success' && 'data' in response) {
    return response.data
  } else {
    if ('message' in response) console.error('Ошибка при загрузке сотрудников:', response.message)
    return null
  }
}
