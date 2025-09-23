import { useState } from 'react'
import DepartmentsUI from './ui/departments-ui'
import { useDepartmentContextMenu } from './ui/department-context-menu'
import { ValuesFormGroups } from '@/entities/groups/forms/use-create-edit-form-group'

const mockData = [
  {
    id: 100,
    department_name: 'Маркетинг',
    employees_count: 3,
    employees: [
      {
        id: '101',
        name: 'маркетолог'
      },
      {
        id: '102',
        name: 'еще один'
      },
      {
        id: '103',
        name: 'и еще один'
      }
    ]
  },
  {
    id: 200,
    department_name: 'Новая группа',
    employees_count: 0,
    employees: []
  }
]

export const Departments: React.FC = () => {
  const [departments, setDepartments] = useState(mockData)
  const [isCreateNewFormVisible, setIsCreateNewFormVisible] = useState(false)
  const [selectedForEdit, setSelectedForEdit] = useState<null | number>(null)
  const { contextMenu, setContextMenu, handleRightClick, handleContextMenuClose } = useDepartmentContextMenu()

  const onNewGroupClick = () => {
    setIsCreateNewFormVisible(!isCreateNewFormVisible)
  }

  const handleSubmit = (values: Partial<ValuesFormGroups>) => {
    if (!values.name) {
      return
    }
    if (selectedForEdit) {
      const edited = departments.find(department => department.id === selectedForEdit)
      if (edited) {
        edited.department_name = values.name
      }
      setSelectedForEdit(null)
    } else {
      const newId = departments[departments.length - 1].id + 100
      departments.push({
        id: newId,
        department_name: values.name,
        employees_count: 0,
        employees: []
      })
      setIsCreateNewFormVisible(false)
    }
  }

  const handleEditClick = (id: number) => {
    setSelectedForEdit(id)
    setContextMenu({ ...contextMenu, isVisible: false, selectedId: null })
  }

  const handleDeleteClick = (id: number) => {
    setDepartments(departments.filter(department => department.id !== id))
    setContextMenu({ ...contextMenu, isVisible: false, selectedId: null })
  }

  return (
    <DepartmentsUI
      departments={departments}
      isCreateNewFormVisible={isCreateNewFormVisible}
      contextMenu={contextMenu}
      selectedForEdit={selectedForEdit}
      onNewGroupClick={onNewGroupClick}
      handleSubmit={handleSubmit}
      handleRightClick={handleRightClick}
      handleEditClick={handleEditClick}
      handleDeleteClick={handleDeleteClick}
      handleContextMenuClose={handleContextMenuClose}
    />
  )
}

export default Departments
