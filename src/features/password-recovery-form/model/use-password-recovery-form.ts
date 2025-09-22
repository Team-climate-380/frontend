import { useForm } from '@mantine/form'
import { InitialRestorePassword } from '../ui/password-recovery-form'

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
