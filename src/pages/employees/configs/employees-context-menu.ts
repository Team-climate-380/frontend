import { Employee } from '@/entities/employees/type'
import { PopupMenuItem } from '@/shared/ui/popup-menu'

export const getPopupMenuItems = (
  employee: Employee,
  setEditingEmployee: (e: Employee | null) => void,
  handleMenuClose: () => void
): PopupMenuItem[] => [
  {
    type: 'action',
    label: 'Редактировать',
    action: () => {
      setEditingEmployee(employee)
      handleMenuClose()
    }
  },
  { type: 'divider' },
  {
    type: 'action',
    label: 'Удалить',
    important: true,
    action: () => {
      console.log('Удалить сотрудника:', employee.full_name)
      handleMenuClose()
    }
  }
]
