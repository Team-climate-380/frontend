import { DepartmentListItem } from '@/shared/ui/department-list-item'
import { DepartmentInfo } from '../../types/types'
import { SyntheticEvent } from 'react'
import { ValuesFormGroups } from '@/entities/groups/forms/use-create-edit-form-group'
import { GroupForm } from '@/entities/groups'

type DepartmentProps = {
  department: DepartmentInfo
  isEdited: boolean
  onContextMenu: (e: SyntheticEvent, id: number) => void
  onSubmit: (values: Partial<ValuesFormGroups>) => void
}

export const Department: React.FC<DepartmentProps> = ({ department, isEdited, onContextMenu, onSubmit }) => {
  return isEdited ? (
    <GroupForm name={department.department_name} onSubmit={onSubmit} />
  ) : (
    <DepartmentListItem {...department} onContextMenu={e => onContextMenu(e, department.id)} />
  )
}
