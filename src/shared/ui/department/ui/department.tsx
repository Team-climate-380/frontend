import { DepartmentInfo } from '@entities/groups/types/department-types'
import { SyntheticEvent } from 'react'
import { ValuesFormGroups } from '@/entities/groups/forms/use-create-edit-form-group'
import { GroupForm } from '@/entities/groups'
import { DepartmentListItem } from '@shared/ui/department-list-item/ui/department-list-item'

type DepartmentProps = {
  department: DepartmentInfo
  isEdited: boolean
  onContextMenu: (e: SyntheticEvent, id: number) => void
  onSubmit: (values: Partial<ValuesFormGroups>) => void
  handleCancelDelete: () => void
}

export const Department: React.FC<DepartmentProps> = ({
  department,
  isEdited,
  onContextMenu,
  onSubmit,
  handleCancelDelete
}) => {
  return isEdited ? (
    <GroupForm name={department.department_name} onSubmit={onSubmit} />
  ) : (
    <DepartmentListItem
      {...department}
      onContextMenu={e => onContextMenu(e, department.id)}
      handleCancelDelete={handleCancelDelete}
    />
  )
}
