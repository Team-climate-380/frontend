import { Employee } from '../type'
import style from './style.module.css'
import { PopupMenu, PopupMenuItem } from '@/shared/ui/popup-menu'
import { useContextMenu } from '@/shared/hooks/use-context-menu'
import { useState } from 'react'
import { EmployeeForm } from '@/features/employee-form'

//TODO: изменить {employee.id} на среднее время ответа на вопрос
interface EmployeesItemProps {
  employee: Employee
  onUpdate?: () => void
}

export const EmployeesItem: React.FC<EmployeesItemProps> = ({ employee, onUpdate }) => {
  const { contextMenu, handleRightClick, handleContextMenuClose } = useContextMenu(undefined, 500, 30)
  const [isEditedEmployee, setIsEditedEmployee] = useState<boolean>(false)
  const handleClickMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.button === 2) {
      handleRightClick(e, Number(employee.id))
    }
  }

  const handleEditEmployee = () => {
    setIsEditedEmployee(true)
  }

  const handleMenuClose = () => {
    handleContextMenuClose()
  }

  const popupMenuItems: PopupMenuItem[] = [
    {
      type: 'action',
      label: 'Редактировать',
      action: () => {
        handleEditEmployee()
      }
    },
    {
      type: 'divider'
    },
    {
      type: 'action',
      label: 'Удалить',
      important: true,
      action: () => {
        console.log('удалить сотрудника', employee.full_name)
      }
    }
  ]

  const cellClassName = style.employees_list__item_cell

  return (
    <>
      {isEditedEmployee ? (
        <EmployeeForm
          isCreateForm={false}
          isOpen={isEditedEmployee}
          closeForm={() => {
            setIsEditedEmployee(false)
          }}
          employeeFormData={employee}
          onSubmit={() => onUpdate?.()}
        />
      ) : (
        <>
          <div className={style.employees_list__item} onContextMenu={handleClickMouse}>
            <div className={cellClassName}>{employee.full_name}</div>
            <div className={cellClassName}>{employee.department_name}</div>
            <div className={cellClassName}>{employee.email}</div>
            <div className={cellClassName}>{employee.tg_username}</div>
            <div className={style.employees_list__item_cell}>{employee.id}</div>
          </div>
        </>
      )}
      {contextMenu.isVisible && (
        <PopupMenu
          type="context"
          items={popupMenuItems}
          onClose={handleMenuClose}
          positionX={contextMenu.left}
          positionY={contextMenu.top}
        />
      )}
    </>
  )
}
