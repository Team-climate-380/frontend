import { deleteEmployee } from '@/entities/employees/api/api-employees'
import { Employee } from '@/entities/employees/type'
import { PopupMenuItem } from '@/shared/ui/popup-menu'

export const getPopupMenuItems = (
  employee: Employee,
  setEditingEmployee: (e: Employee | null) => void,
  handleMenuClose: () => void,
  handleEmployeesUpdate: () => void
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
    action: async () => {
      await deleteEmployee(employee.id)
      handleMenuClose()
      handleEmployeesUpdate()
    }
  }
]
