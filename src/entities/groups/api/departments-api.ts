import { DepartmentInfo } from '@/entities/groups/types/department-types'
import { ApiClient } from '@/shared/lib/api-client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const apiClient = new ApiClient()

export const getDepartments = async () => {
  const response = await apiClient.get<DepartmentInfo[]>(`/api/departments/`)
  if (response.status === 'success' && 'data' in response) return response.data
  if (response.status === 'error' && 'message' in response) throw new Error(response.message)
  throw new Error('Ошибка получения данных о группах')
}

export const createDepartment = async (name: string) => {
  const response = await apiClient.post<Pick<DepartmentInfo, 'id' | 'department_name'>>('/api/departments/', {
    department_name: name
  })
  if (response.status === 'error' && 'error' in response) {
    throw new Error(response.message)
  }
  return response
}

export const editDepartment = async (id: number, toEdit: { department_name?: string; to_delete?: boolean }) => {
  const response = await apiClient.patch<Pick<DepartmentInfo, 'id' | 'department_name'>>(
    `/api/departments/${id}/`,
    toEdit
  )
  if (response.status === 'success' && 'data' in response) return response.data
  if (response.status === 'error' && 'error' in response) {
    throw new Error(response.message)
  }
  return response
}

export const deleteDepartment = async (id: number) => {
  const response = await apiClient.delete(`/api/departments/${id}/`)
  if (response.status === 'error' && 'error' in response) {
    const error = new Error(response.message) as Error & { status?: number }
    error.status = response.statusCode
    throw error
  }
  return response
}

export const useDepartmentQuery = () =>
  useQuery({
    queryKey: ['departments'],
    queryFn: getDepartments
  })

export const useDepartmentMutations = () => {
  const queryClient = useQueryClient()
  const handleSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ['departments'] })
  }
  const handleError = (error: Error) => console.error(error)

  const createDepartmentMutation = useMutation({
    mutationFn: (newGroupName: string) => {
      return createDepartment(newGroupName)
    },
    onSuccess: handleSuccess,
    onError: handleError
  })

  const editDepartmentMutation = useMutation({
    mutationFn: ({ id, new_name, to_delete }: { id: number; new_name?: string; to_delete?: boolean }) => {
      return editDepartment(id, { department_name: new_name, to_delete: to_delete })
    },
    onSuccess: handleSuccess,
    onError: handleError
  })

  const deleteDepartmentMutation = useMutation<
    unknown,
    Error & { status?: number },
    { id: number; onFullDepartmentError?: () => void }
  >({
    mutationFn: ({ id }: { id: number; onError?: () => void }) => {
      return deleteDepartment(id)
    },
    onSuccess: handleSuccess,
    onError: (error, variables) => {
      const status = error?.status
      if (status === 400) {
        variables.onFullDepartmentError?.()
      } else {
        console.error(error)
      }
    }
  })

  return { createDepartmentMutation, editDepartmentMutation, deleteDepartmentMutation }
}
