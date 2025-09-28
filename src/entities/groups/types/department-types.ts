export type EmployeeInfo = {
  id: string
  full_name: string
}

export type DepartmentInfo = {
  id: number
  department_name: string
  employees_count: number
  employees?: EmployeeInfo[]
}
