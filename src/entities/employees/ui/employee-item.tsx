import { Employee } from '../type'
import style from './style.module.css'

//TODO:  изменить {employee.id} на среднее время ответа на вопрос
interface EmployeesItemProps {
  employee: Employee
  onContextMenu: (e: React.MouseEvent, employee: Employee) => void
}

export const EmployeesItem: React.FC<EmployeesItemProps> = ({ employee, onContextMenu }) => {
  const cellClassName = style.employees_list__item_cell

  return (
    <div className={style.employees_list__item} onContextMenu={e => onContextMenu(e, employee)}>
      <div className={cellClassName}>{employee.full_name}</div>
      <div className={cellClassName}>{employee.department_name}</div>
      <div className={cellClassName}>{employee.email}</div>
      <div className={cellClassName}>{employee.tg_username}</div>
      <div className={style.employees_list__item_cell}>{employee.id}</div>
    </div>
  )
}
