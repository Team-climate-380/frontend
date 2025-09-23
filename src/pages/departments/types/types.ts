export type EmployeeInfo = {
  id: string
  name: string
}

export type DepartmentInfo = {
  id: number
  department_name: string
  employees_count: number
  employees?: EmployeeInfo[]
}
