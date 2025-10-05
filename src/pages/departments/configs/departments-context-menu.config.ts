import { PopupMenuItem } from '@/shared/ui/popup-menu'

type TDepartmentsContextMenu = {
  handleEdit: (id: number | null | undefined) => void
  handleDelete: (id: number | null | undefined) => void
  id: number | null | undefined
}

export const departmentsContextMenu = ({ handleEdit, handleDelete, id }: TDepartmentsContextMenu): PopupMenuItem[] => [
  {
    type: 'action',
    label: 'Переименовать',
    action: () => handleEdit(id)
  },
  {
    type: 'divider'
  },
  {
    type: 'action',
    label: 'Удалить',
    action: () => handleDelete(id)
  }
]
