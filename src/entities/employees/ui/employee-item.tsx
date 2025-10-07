import { useState } from 'react'
import { Employee } from '../type'
import style from './style.module.css'
import { PopupMenu, PopupMenuItem } from '@/shared/ui/popup-menu'
//TODO: изменить {employee.id} на среднее время ответа на вопрос
interface EmployeesItemProps {
  employee: Partial<Employee>
}

const popupMenuItems: PopupMenuItem[] = [
  {
    type: 'action',
    label: 'Редактировать',
    action: () => {
      console.log('edit')
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
      console.log('edit')
    }
  }
]

export const EmployeesItem: React.FC<EmployeesItemProps> = ({ employee }) => {
  const [isVisiblePopupMenu, setIsVisiblePopupMenu] = useState(false)
  const handleClickEmployee = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button === 2) {
      e.preventDefault()
      setIsVisiblePopupMenu(true)
    }
  }
  return (
    <div className={style.employees_list__item} onContextMenu={handleClickEmployee}>
      <div>{employee.full_name}</div>
      <div>{employee.department_name}</div>
      <div>{employee.email}</div>
      <div>{employee.tg_username}</div>
      <div>{employee.id}</div>

      {isVisiblePopupMenu && <PopupMenu type="context" items={popupMenuItems} onClose={() => {}} />}
    </div>
  )
}
