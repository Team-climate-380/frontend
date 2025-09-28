import { Flex, List, ScrollArea } from '@mantine/core'
import { Department } from './department/department'
import { Button } from '@/shared/ui/button'
import styles from '../styles/departments-ui.module.scss'
import { DepartmentContextMenu } from './department-context-menu/ui/department-context-menu'
import { DepartmentInfo } from '../../../entities/groups/types/department-types'
import { SyntheticEvent } from 'react'
import { TContextMenu } from '../../../shared/hooks/use-context-menu'
import { ValuesFormGroups } from '@/entities/groups/forms/use-create-edit-form-group'
import { GroupForm } from '@/entities/groups'
import { Loader } from '@/shared/ui/loader'

type DepartmentsUIProps = {
  departments: DepartmentInfo[] | undefined
  isCreateNewFormVisible: boolean
  contextMenu: TContextMenu
  selectedForEdit: number | null
  onNewGroupClick: () => void
  handleSubmit: (values: Partial<ValuesFormGroups>) => void
  handleRightClick: (e: SyntheticEvent, id: number) => void
  handleEditClick: (id: number) => void
  handleDeleteClick: (id: number) => void
  handleContextMenuClose: () => void
  isDepartmentDataLoading: boolean
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
  handleContextMenuClose,
  isDepartmentDataLoading
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
      <ScrollArea type="scroll">
        <main className={styles.main}>
          {isCreateNewFormVisible && <GroupForm onSubmit={handleSubmit} />}
          <List listStyleType="none">
            {isDepartmentDataLoading && <Loader />}
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
        </main>
      </ScrollArea>
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
    </div>
  )
}

export default DepartmentsUI
