import { useState } from 'react'
import DepartmentsUI from './ui/departments-ui'
import { useContextMenu } from '@shared/hooks/use-context-menu'
import { ValuesFormGroups } from '@/entities/groups/forms/use-create-edit-form-group'
import {
  createDepartment,
  deleteDepartment,
  editDepartment,
  getDepartments
} from '@/entities/groups/api/departments-api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { DepartmentInfo } from '../../entities/groups/types/department-types'

export const Departments: React.FC = () => {
  const [isCreateNewFormVisible, setIsCreateNewFormVisible] = useState(false)
  const [selectedForEdit, setSelectedForEdit] = useState<null | number>(null)
  const { contextMenu, setContextMenu, handleRightClick, handleContextMenuClose } = useContextMenu()

  const queryClient = useQueryClient()
  const { data, isPending } = useQuery({
    queryKey: ['departments'],
    queryFn: getDepartments
  })

  const createNewGroup = useMutation({
    mutationFn: (newGroupName: string) => {
      return createDepartment(newGroupName)
    },
    onSuccess: async () => {
      setIsCreateNewFormVisible(false)
      await queryClient.invalidateQueries({ queryKey: ['departments'] })
    }
  })

  const editGroupName = useMutation({
    mutationFn: ({ id, new_name }: { id: number; new_name: string }) => {
      return editDepartment(id, new_name)
    },
    onSuccess: res => {
      setSelectedForEdit(null)
      queryClient.setQueryData(['departments'], (data: DepartmentInfo[]) => {
        if (!res) return data

        return data.map(department => (department.id === res?.id ? { ...department, ...res } : department))
      })
    }
  })

  const deleteGroup = useMutation({
    mutationFn: (id: number) => {
      return deleteDepartment(id)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['departments'] })
    }
  })

  const onNewGroupClick = () => {
    setIsCreateNewFormVisible(!isCreateNewFormVisible)
  }

  const handleSubmit = (values: Partial<ValuesFormGroups>) => {
    if (!values.name) {
      return
    }
    if (selectedForEdit) {
      editGroupName.mutate({ id: selectedForEdit, new_name: values.name })
    } else {
      createNewGroup.mutate(values.name)
    }
  }

  const handleEditClick = (id: number) => {
    setSelectedForEdit(id)
    setContextMenu({ ...contextMenu, isVisible: false, selectedId: null })
  }

  const handleDeleteClick = (id: number) => {
    deleteGroup.mutate(id)
    setContextMenu({ ...contextMenu, isVisible: false, selectedId: null })
  }

  return (
    <DepartmentsUI
      departments={data}
      isCreateNewFormVisible={isCreateNewFormVisible}
      contextMenu={contextMenu}
      selectedForEdit={selectedForEdit}
      onNewGroupClick={onNewGroupClick}
      handleSubmit={handleSubmit}
      handleRightClick={handleRightClick}
      handleEditClick={handleEditClick}
      handleDeleteClick={handleDeleteClick}
      handleContextMenuClose={handleContextMenuClose}
      isDepartmentDataLoading={isPending}
    />
  )
}

export default Departments
