import { DepartmentInfo } from '@entities/groups/types/department-types'
import { RefObject, SyntheticEvent } from 'react'
import { ValuesFormGroups } from '@/entities/groups/forms/use-create-edit-form-group'
import { GroupForm } from '@/entities/groups'
import { DepartmentListItem } from '@shared/ui/department-list-item/ui/department-list-item'

type DepartmentProps = {
  department: DepartmentInfo
  isEdited: boolean
  onContextMenu: (e: SyntheticEvent, id: number) => void
  onSubmit: (values: Partial<ValuesFormGroups>) => void
  handleCancelDelete: () => void
  formRef?: RefObject<HTMLFormElement>
}

export const Department: React.FC<DepartmentProps> = ({
  department,
  isEdited,
  onContextMenu,
  onSubmit,
  handleCancelDelete,
  formRef
}) => {
  return isEdited ? (
    <GroupForm name={department.department_name} onSubmit={onSubmit} formRef={formRef} />
  ) : (
    <DepartmentListItem
      {...department}
      onContextMenu={e => onContextMenu(e, department.id)}
      handleCancelDelete={handleCancelDelete}
    />
  )
}
