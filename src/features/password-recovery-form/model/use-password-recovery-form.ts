import { useForm } from '@mantine/form'
import { InitialRestorePassword } from '../ui/password-recovery-form'
import { apiClient } from '@/shared/lib/api-client'
import { useMutation } from '@tanstack/react-query'

export const useRestorePasswordData = (initialValues?: InitialRestorePassword) => {
  const restorePasswordData = useForm({
    mode: 'controlled',
    initialValues: initialValues ?? { email: '' },

    validate: {
      email: value => {
        if (!value || value.trim().length === 0) {
          return 'Почта не может быть пустой'
        }
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          return 'Неверный формат почты'
        }
        return null
      }
    },
    validateInputOnChange: true
  })
  return restorePasswordData
}

export const postRestorePassword = async (email: string) => {
  const response = await apiClient.post('/api/password-recovery', { email })
  if (response.status === 'success') return response.status
  if (response.status === 'error' && 'message' in response) throw Error(response.message)
  throw Error('Произошла ошибка при сбросе пароля')
}

export const useRestorePasswordMutation = () => {
  return useMutation({
    mutationFn: (email: string) => postRestorePassword(email)
  })
}
