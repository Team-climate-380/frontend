import { DepartmentInfo } from '@/entities/groups/types/department-types'
import { ApiClient } from '@/shared/lib/api-client'

const apiClient = new ApiClient()

export const getDepartments = async () => {
  const response = await apiClient.get<DepartmentInfo[]>('/api/departments/')
  if (response.status === 'success' && 'data' in response) return response.data
  if (response.status === 'error' && 'message' in response) {
    console.log(`Ошибка загрузки данных о группах: ${response.message}`)
  }
}

export const createDepartment = async (name: string) => {
  const response = await apiClient.post<Pick<DepartmentInfo, 'id' | 'department_name'>>(
    '/api/departments/',
    {},
    { department_name: name }
  )
  if (response.status === 'success' && 'data' in response) return response.data
  if (response.status === 'error' && 'message' in response) {
    console.log(`Ошибка создания новой группы: ${response.message}`)
  }
}

export const editDepartment = async (id: number, name: string) => {
  const response = await apiClient.patch<Pick<DepartmentInfo, 'id' | 'department_name'>>(
    `/api/departments/${id}/`,
    {},
    { department_name: name }
  )
  if (response.status === 'success' && 'data' in response) return response.data
  if (response.status === 'error' && 'message' in response) {
    console.log(`Ошибка редактирования группы: ${response.message}`)
  }
}

export const deleteDepartment = async (id: number) => {
  const response = await apiClient.delete(`/api/departments/${id}/`)
  if (response.status === 'success' && 'data' in response) return response.data
  if (response.status === 'error' && 'message' in response) {
    console.log(`Ошибка удаления группы: ${response.message}`)
  }
}
