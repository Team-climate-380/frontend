import { TEmployee } from '@/entities/employee/model/types'

export type TDepartment = { id: string; department_name: string; employees_count: string; employees: TEmployee[] }
