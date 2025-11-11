import { DepartmentInfo } from '@/entities/groups/types/department-types'
import { ApiClient } from '@/shared/lib/api-client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { groupFormActions } from '../forms/use-create-edit-form-group'

const apiClient = new ApiClient()

export const getDepartments = async () => {
  const response = await apiClient.get<DepartmentInfo[]>(`/api/departments/`)
  if (response.status === 'success' && 'data' in response) return response.data
  if (response.status === 'error' && 'message' in response) throw new Error(response.message)
}

export const createDepartment = async (name: string) => {
  const response = await apiClient.post<Pick<DepartmentInfo, 'id' | 'department_name'>>('/api/departments/', {
    department_name: name
  })
  if ('error' in response) {
    if (
      response.error instanceof Object &&
      'department_name' in response.error &&
      Array.isArray(response.error.department_name)
    ) {
      const message = response.error.department_name[0]
      throw new Error(message)
    }
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
  if ('error' in response) {
    if (
      response.error instanceof Object &&
      'department_name' in response.error &&
      Array.isArray(response.error.department_name)
    ) {
      const message = response.error.department_name[0]
      throw new Error(message)
    }
    throw new Error(response.message)
  }
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

  const createDepartmentMutation = useMutation<unknown, Error, { newGroupName: string; onCreateSuccess?: () => void }>({
    mutationFn: ({ newGroupName }) => {
      return createDepartment(newGroupName)
    },
    onSuccess: (_, variables) => {
      variables.onCreateSuccess?.()
      handleSuccess()
    },
    onError: (error: Error) => {
      if (error.message.includes('This department name already exists')) {
        groupFormActions.setErrors({ name: 'Группа с таким названием уже существует, выберите другое.' })
      } else {
        groupFormActions.setErrors({ name: 'Не удалось создать группу. Попробуйте позднее.' })
      }
    }
  })

  const editDepartmentMutation = useMutation<
    unknown,
    Error,
    { id: number; new_name?: string; to_delete?: boolean; onEditSuccess?: () => void }
  >({
    mutationFn: ({ id, new_name, to_delete }) => {
      return editDepartment(id, { department_name: new_name, to_delete: to_delete })
    },
    onSuccess: (_, variables) => {
      variables.onEditSuccess?.()
      handleSuccess()
    },
    onError: (error: Error) => {
      if (error.message.includes('This department name already exists')) {
        groupFormActions.setErrors({ name: 'Группа с таким названием уже существует, выберите другое.' })
      } else {
        groupFormActions.setErrors({ name: 'Не удалось изменить название группы. Попробуйте позднее.' })
      }
    }
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
