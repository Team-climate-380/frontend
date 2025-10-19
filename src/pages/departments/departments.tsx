import { useEffect, useState } from 'react'
import styles from './styles/departments.module.scss'
import { useContextMenu } from '@shared/hooks/use-context-menu'
import { ValuesFormGroups } from '@/entities/groups/forms/use-create-edit-form-group'
import { List, ScrollArea } from '@mantine/core'
import { Button } from '@/shared/ui/button'
import { DepartmentInfo, GroupForm, useDepartmentMutations, useDepartmentQuery } from '@/entities/groups'
import { Department } from '@/shared/ui/department'
import { Header } from '@/widgets/header/header'
import { PopupMenu } from '@/shared/ui/popup-menu'
import { departmentsContextMenu } from './configs/departments-context-menu.config'
import { Loader } from '@/shared/ui/loader'
import { SearchInput } from '@/widgets/search-input'
import { useQueryParams } from '@/shared/hooks/useQueryParams'

export const Departments: React.FC = () => {
  const [isCreateNewFormVisible, setIsCreateNewFormVisible] = useState(false)
  const [selectedForEdit, setSelectedForEdit] = useState<null | number>(null)
  const [filteredDepartments, setFilteredDepartments] = useState<DepartmentInfo[]>()

  const { contextMenu, setContextMenu, handleRightClick, handleContextMenuClose } = useContextMenu()
  const menuItems = departmentsContextMenu({
    handleEdit: handleEditClick,
    handleDelete: handleDeleteClick,
    id: contextMenu.selectedId
  })

  const { data, isPending, isError } = useDepartmentQuery()
  const { createDepartmentMutation, editDepartmentMutation, deleteDepartmentMutation } = useDepartmentMutations()

  const { getDecodedSearch } = useQueryParams()
  const searchQuery = getDecodedSearch().trim().toLowerCase()
  const searchDepartments = () => {
    if (searchQuery && data) {
      const filtered = data.filter(department => department.department_name.toLowerCase().includes(searchQuery))
      setFilteredDepartments(filtered)
      return
    }
    setFilteredDepartments(data)
  }

  useEffect(() => {
    if (!data) return
    searchDepartments()
  }, [data, searchQuery])

  const handleSubmit = (values: Partial<ValuesFormGroups>) => {
    if (!values.name) {
      return
    }
    if (selectedForEdit) {
      editDepartmentMutation.mutate({ id: selectedForEdit, new_name: values.name })
      setSelectedForEdit(null)
    } else {
      createDepartmentMutation.mutate(values.name)
      setIsCreateNewFormVisible(false)
    }
  }

  function handleEditClick(id: number | null | undefined) {
    if (!id) return
    setSelectedForEdit(id)
    setContextMenu({ ...contextMenu, isVisible: false, selectedId: null })
  }

  function handleDeleteClick(id: number | null | undefined) {
    if (!id) return
    deleteDepartmentMutation.mutate(id)
    setContextMenu({ ...contextMenu, isVisible: false, selectedId: null })
  }

  return (
    <div className={styles['page-wrapper']}>
      <Header
        title="Группы"
        actions={
          <>
            <SearchInput />
            <Button className={styles.header_button} onClick={() => setIsCreateNewFormVisible(!isCreateNewFormVisible)}>
              Создать группу
            </Button>
          </>
        }
      ></Header>
      <div className={styles.main}>
        <ScrollArea type="scroll">
          {isCreateNewFormVisible && <GroupForm onSubmit={handleSubmit} />}
          <List listStyleType="none">
            {isPending && <Loader />}
            {!data && isError && 'Ошибка загрузки данных о группах...'}
            {filteredDepartments &&
              filteredDepartments.map(department => {
                return (
                  <List.Item key={department.id}>
                    <Department
                      department={department}
                      onContextMenu={e => {
                        handleRightClick(e, department.id)
                      }}
                      isEdited={department.id === selectedForEdit ? true : false}
                      onSubmit={handleSubmit}
                    />
                  </List.Item>
                )
              })}
          </List>
        </ScrollArea>
      </div>
      {contextMenu.isVisible && (
        <PopupMenu
          items={menuItems}
          type="context"
          onClose={handleContextMenuClose}
          positionX={contextMenu.left}
          positionY={contextMenu.top}
        ></PopupMenu>
      )}
    </div>
  )
}

export default Departments
