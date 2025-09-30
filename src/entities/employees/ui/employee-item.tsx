import { Employee } from '../type'
import style from './style.module.css'
//TODO: изменить {employee.id} на среднее время ответа на вопрос
interface EmployeesItemProps {
  employee: Partial<Employee>
}

export const EmployeesItem: React.FC<EmployeesItemProps> = ({ employee }) => {
  return (
    <div className={style.employees_list__item}>
      <div>{employee.full_name}</div>
      <div>{employee.department_name}</div>
      <div>{employee.email}</div>
      <div>{employee.tg_username}</div>
      <div>{employee.id}</div>
    </div>
  )
}
