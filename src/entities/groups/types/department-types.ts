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

export type TDepartmentsPerPage = {
  data: DepartmentInfo[]
  page: number
  per_page: number
  total: number
  num_pages: number
  has_next: boolean
  has_previous: boolean
}
