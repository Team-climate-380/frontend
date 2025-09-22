import { useForm } from '@mantine/form'

type TInitialValues = {
  name: string
  department: string[]
  email: string
  telegram_id: string
}

export const useCreateEmployeeEditForm = (initialValues?: TInitialValues) => {
  const formEmployeeData = useForm({
    mode: 'uncontrolled',
    initialValues: initialValues ?? {
      name: '',
      department: [],
      email: '',
      telegram_id: ''
    },
    validate: {
      name: value => {
        if (!value || value.trim() === '') {
          return 'Имя не может быть пустым'
        }
        if (value.length > 256) {
          return 'Слишком длинное имя. Длина должна быть не больше 256 символов.'
        }
        return null
      },
      email: value => {
        if (!value) {
          return 'Почта не может быть пустой'
        }
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          return 'Неверный формат почты'
        }
        return null
      },
      telegram_id: value => {
        if (value && !/[0-9]+/.test(value)) {
          return 'Неверный формат Telegram ID'
        }
        if (value && value.length > 19) {
          return 'Слишком длинный Telegram ID. Длина должна быть не больше 19 символов.'
        }
        return null
      }
    },
    validateInputOnChange: true
  })
  return formEmployeeData
}
