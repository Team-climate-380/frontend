import { ApiClient } from '@/shared/lib/api-client'

const client = new ApiClient()

export const login = async () => {
  const response = await client.post('/auth/login', {}, { email: 'admin@admin.mail', password: 'xPKHPWgx7EQNFeF' })
  console.log(response)
}

export const getDepartments = async () => {
  const response = await client.get('/departments/')
  console.log(response)
  return response
}

export const createDepartment = async (name: string) => {
  const response = await client.post('/departments/', {}, { department_name: name })
  if (response.status === 'success') return response.data
  return response.message
}

export const editDepartment = async (id: number) => {
  const response = await client.patch(`/departments/${id}`, {}, { id: id })
  if (response.status === 'success') return response.data
  return response.message
}

export const deleteDepartment = async (id: number) => {
  const response = await client.delete(`/departments/${id}`)
  if (response.status === 'success') return response.data
  return response.message
}
