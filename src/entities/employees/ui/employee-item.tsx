import clsx from 'clsx'
import { Employee } from '../type'
import style from './style.module.css'
import { ReactNode } from 'react'

interface EmployeesItemProps {
  employee: Employee
  onContextMenu: (e: React.MouseEvent, employee: Employee) => void
  isDeleted: boolean
  children: ReactNode
}

export const EmployeesItem: React.FC<EmployeesItemProps> = ({ employee, onContextMenu, isDeleted, children }) => {
  const cellClassName = style.employees_list__item_cell
  const classNameEmployeesList = clsx(style.employees_list__item, {
    [style.deleted]: isDeleted
  })

  return (
    <div className={classNameEmployeesList} onContextMenu={e => onContextMenu(e, employee)}>
      <div className={cellClassName}>{employee.full_name}</div>
      <div className={cellClassName}>{employee.department_name}</div>
      <div className={cellClassName}>{employee.email}</div>
      <div className={cellClassName}>{employee.tg_username}</div>
      <div className={style.employees_list__item_cell}>
        {!employee.average_answer_sec ? '-' : employee.average_answer_sec}
      </div>
      {children}
    </div>
  )
}
