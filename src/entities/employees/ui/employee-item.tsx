import clsx from 'clsx'
import { Employee } from '../type'
import style from './style.module.css'
import { DeleteIcon } from '@/shared/ui/icons/delete-icon'

//TODO:  изменить {employee.id} на среднее время ответа на вопрос
interface EmployeesItemProps {
  employee: Employee
  onContextMenu: (e: React.MouseEvent, employee: Employee) => void
  isDeleted: boolean
  onCancelDelete: (employeeId: number) => void
}

export const EmployeesItem: React.FC<EmployeesItemProps> = ({ employee, onContextMenu, isDeleted, onCancelDelete }) => {
  const cellClassName = style.employees_list__item_cell
  const classNameEmployeesList = clsx(style.employees_list__item, {
    [style.deleted]: isDeleted
  })

  const handleCancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onCancelDelete(employee.id)
  }
  return (
    <div className={classNameEmployeesList} onContextMenu={e => onContextMenu(e, employee)}>
      <div className={cellClassName}>{employee.full_name}</div>
      <div className={cellClassName}>{employee.department_name}</div>
      <div className={cellClassName}>{employee.email}</div>
      <div className={cellClassName}>{employee.tg_username}</div>
      <div className={style.employees_list__item_cell}>{employee.id}</div>
      {isDeleted && <DeleteIcon onClick={handleCancelDelete} className={style.delete_icon} />}
    </div>
  )
}
