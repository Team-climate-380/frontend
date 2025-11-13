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
import { SearchInput } from '@/widgets/search-input'
import { useQueryParams } from '@/shared/hooks/useQueryParams'
import { Skeleton } from '@/shared/ui/skeleton'
import { TextNotification } from '@/shared/ui/text-notification'
import { useClickOutside } from '@mantine/hooks'
import { NotificationModal } from '@/shared/ui/notification-modal'

export const Departments: React.FC = () => {
  const [isCreateNewFormVisible, setIsCreateNewFormVisible] = useState(false)
  const [selectedForEdit, setSelectedForEdit] = useState<null | number>(null)
  const [isDeleteErrorVisible, setIsDeleteErrorVisible] = useState(false)
  const [filteredDepartments, setFilteredDepartments] = useState<DepartmentInfo[]>([])

  const editFormRef = useClickOutside(() => {
    setSelectedForEdit(null)
  })
  const createFormRef = useClickOutside(() => {
    setIsCreateNewFormVisible(false)
  })

  const { contextMenu, setContextMenu, handleRightClick, handleContextMenuClose } = useContextMenu()

  const { data, isPending, isError, isSuccess } = useDepartmentQuery()
  const { createDepartmentMutation, editDepartmentMutation, deleteDepartmentMutation } = useDepartmentMutations()

  const menuItems = departmentsContextMenu({
    handleEdit: handleEditClick,
    handleDelete: handleDeleteClick,
    id: contextMenu.selectedId
  })

  const { getDecodedSearch } = useQueryParams()
  const searchQuery = getDecodedSearch().trim().toLowerCase()
  const setDepartments = () => {
    if (isSuccess) {
      const filtered = searchQuery
        ? data.filter(department => department.department_name.toLowerCase().includes(searchQuery))
        : data
      setFilteredDepartments(filtered)
    }
  }

  useEffect(() => {
    if (!data) return
    setDepartments()
  }, [data, searchQuery])

  const handleSubmit = (values: Partial<ValuesFormGroups>) => {
    if (!values.name) {
      return
    }
    if (selectedForEdit) {
      editDepartmentMutation.mutate({
        id: selectedForEdit,
        new_name: values.name,
        onEditSuccess: () => setSelectedForEdit(null)
      })
    } else {
      createDepartmentMutation.mutate({
        newGroupName: values.name,
        onCreateSuccess: () => setIsCreateNewFormVisible(false)
      })
    }
  }

  function handleCreateClick() {
    setIsCreateNewFormVisible(true)
    setSelectedForEdit(null)
  }

  function handleEditClick(id: number | null | undefined) {
    if (!id) return
    setIsCreateNewFormVisible(false)
    setSelectedForEdit(id)
    setContextMenu({ ...contextMenu, isVisible: false, selectedId: null })
  }

  function handleDeleteClick(id: number | null | undefined) {
    if (!id) return
    deleteDepartmentMutation.mutate({ id, onFullDepartmentError: () => setIsDeleteErrorVisible(true) })
    setContextMenu({ ...contextMenu, isVisible: false, selectedId: null })
  }

  function handleCancelDelete(id: number | null | undefined) {
    if (!id) return
    editDepartmentMutation.mutate({ id: id, to_delete: false })
  }

  return (
    <div className={styles['page-wrapper']}>
      <Header
        title="Группы"
        actions={
          <>
            <SearchInput />
            <Button className={styles.header_button} onClick={handleCreateClick} disabled={isCreateNewFormVisible}>
              Создать группу
            </Button>
          </>
        }
      ></Header>
      <div className={styles.main}>
        <ScrollArea type="scroll">
          {isCreateNewFormVisible && (
            <GroupForm
              onSubmit={handleSubmit}
              closeForm={() => setIsCreateNewFormVisible(false)}
              formRef={createFormRef}
            />
          )}
          {isPending && <Skeleton />}
          {isError && <TextNotification variant="data_not_loaded" />}
          {isSuccess &&
            (searchQuery && filteredDepartments.length === 0 ? (
              <TextNotification variant="no_search_result" />
            ) : (
              <List listStyleType="none" aria-label="Список групп">
                {filteredDepartments.map(department => {
                  return (
                    <List.Item key={department.id}>
                      <Department
                        department={department}
                        onContextMenu={e => {
                          if (department.to_delete) return
                          handleRightClick(e, department.id)
                        }}
                        isEdited={department.id === selectedForEdit ? true : false}
                        onSubmit={handleSubmit}
                        handleCancelDelete={() => handleCancelDelete(department.id)}
                        closeGroupForm={() => setSelectedForEdit(null)}
                        formRef={editFormRef}
                      />
                    </List.Item>
                  )
                })}
              </List>
            ))}
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
      <NotificationModal
        type="error"
        opened={isDeleteErrorVisible}
        onClose={() => {
          setIsDeleteErrorVisible(false)
        }}
        title={'Невозможно удалить группу'}
        text={'Похоже, в этой группе ещё есть люди. Удалите или переместите их, и тогда группу можно будет удалить.'}
      />
    </div>
  )
}

export default Departments
