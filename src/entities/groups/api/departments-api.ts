import { DepartmentInfo } from '@/entities/groups/types/department-types'
import { ApiClient } from '@/shared/lib/api-client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const apiClient = new ApiClient()

export const getDepartments = async () => {
  const response = await apiClient.get<DepartmentInfo[]>('/api/departments/')
  if (response.status === 'success' && 'data' in response) return response.data
  if (response.status === 'error' && 'message' in response) console.error(response.message)
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

export const editDepartment = async (id: number, name: string) => {
  const response = await apiClient.patch<Pick<DepartmentInfo, 'id' | 'department_name'>>(
    `/api/departments/${id}/`,
    {},
    { department_name: name }
  )
  if (response.status === 'success' && 'data' in response) return response.data
  if (response.status === 'error' && 'error' in response) {
    throw new Error(response.message)
  }
}

export const deleteDepartment = async (id: number) => {
  const response = await apiClient.delete(`/api/departments/${id}/`)
  if (response.status === 'error' && 'error' in response) {
    throw new Error(response.message)
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
  const handleError = (err: Error) => console.error(err)
  const createDepartmentMutation = useMutation({
    mutationFn: (newGroupName: string) => {
      return createDepartment(newGroupName)
    },
    onSuccess: handleSuccess,
    onError: handleError
  })
  const editDepartmentMutation = useMutation({
    mutationFn: ({ id, new_name }: { id: number; new_name: string }) => {
      return editDepartment(id, new_name)
    },
    onSuccess: res => {
      queryClient.setQueryData(['departments'], (data: DepartmentInfo[]) => {
        if (!res) return data
        return data.map(department => (department.id === res?.id ? { ...department, ...res } : department))
      })
    },
    onError: handleError
  })
  const deleteDepartmentMutation = useMutation({
    mutationFn: (id: number) => {
      return deleteDepartment(id)
    },
    onSuccess: handleSuccess,
    onError: handleError
  })

  return { createDepartmentMutation, editDepartmentMutation, deleteDepartmentMutation }
}
