import { useForm } from '@mantine/form'
import { InitialFormData } from '../ui/login-form'

export function useFormData(initialValues?: InitialFormData) {
  const formData = useForm({
    mode: 'controlled',
    initialValues: initialValues ?? {
      email: '',
      password: '',
      rememberMy: false
    },
    validate: {
      email: value => {
        if (!value) {
          return 'Почта не может быть пустой'
        }
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          return 'Неверный формат почты'
        }
        if (value.length > 256) {
          return 'Почта должна быть не более 256 символов'
        }
        return null
      },
      password: value => {
        if (!value) {
          return 'Пароль не может быть пустым'
        }
        if (value.length < 8) {
          return 'Пароль должен быть не менее 8 символов'
        }
        if (/^\d+$/.test(value)) {
          return 'Пароль не должен состоять только из цифр'
        }
        if (value.length > 128) {
          return 'Пароль должен быть не более 128 символов'
        }
        return null
      }
    },
    validateInputOnChange: true
  })
  return formData
}
