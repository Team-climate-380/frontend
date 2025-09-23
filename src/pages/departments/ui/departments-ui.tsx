import { Flex, List } from '@mantine/core'
import { Department } from './department'
import { Button } from '@/shared/ui/button'
import styles from '../styles/departments.module.scss'
import { DepartmentContextMenu } from './department-context-menu'
import { DepartmentInfo } from '../types/types'
import { SyntheticEvent } from 'react'
import { TContextMenu } from './department-context-menu/use-department-context-menu'
import { ValuesFormGroups } from '@/entities/groups/forms/use-create-edit-form-group'
import { GroupForm } from '@/entities/groups'

type DepartmentsUIProps = {
  departments: DepartmentInfo[]
  isCreateNewFormVisible: boolean
  contextMenu: TContextMenu
  selectedForEdit: number | null
  onNewGroupClick: () => void
  handleSubmit: (values: Partial<ValuesFormGroups>) => void
  handleRightClick: (e: SyntheticEvent, id: number) => void
  handleEditClick: (id: number) => void
  handleDeleteClick: (id: number) => void
  handleContextMenuClose: () => void
}

const DepartmentsUI: React.FC<DepartmentsUIProps> = ({
  departments,
  isCreateNewFormVisible,
  contextMenu,
  selectedForEdit,
  onNewGroupClick,
  handleSubmit,
  handleRightClick,
  handleEditClick,
  handleDeleteClick,
  handleContextMenuClose
}) => {
  return (
    <div className={styles['page-wrapper']}>
      <header className={styles.header}>
        <h1 className={styles.header_title}>Группы</h1>
        <Flex className={styles['header_button-section']}>
          <div>здесь будет поиск</div>
          <Button onClick={onNewGroupClick}>Создать группу</Button>
        </Flex>
      </header>
      <main className={styles.main}>
        {isCreateNewFormVisible && <GroupForm onSubmit={handleSubmit} />}
        <List listStyleType="none">
          {departments &&
            departments.map(department => {
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
        {contextMenu.isVisible && contextMenu.selectedId && (
          <DepartmentContextMenu
            id={contextMenu.selectedId}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
            onClose={handleContextMenuClose}
            positionX={contextMenu.left}
            positionY={contextMenu.top}
          />
        )}
      </main>
    </div>
  )
}

export default DepartmentsUI
