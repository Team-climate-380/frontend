export type EmployeeInfo = {
  id: string
  full_name: string
  to_inactivate: boolean
}

export type DepartmentInfo = {
  id: number
  department_name: string
  to_delete: boolean
  employees_count: number
  employees?: EmployeeInfo[]
}
