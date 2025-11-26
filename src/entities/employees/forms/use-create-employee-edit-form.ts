import { useForm } from '@mantine/form'
import { getDepartments } from '@entities/groups'

export type TEmployeeForm = {
  full_name: string
  department_name: string | undefined
  email: string
  tg_username: string
  id?: number
}

export const departmentsData = await getDepartments()

export const departmentsNames = departmentsData
  ?.filter(item => item.to_delete === false)
  ?.map(item => item.department_name)

export const useCreateEmployeeEditForm = (initialValues?: TEmployeeForm) => {
  const formEmployeeData = useForm({
    mode: 'uncontrolled',
    initialValues: initialValues ?? {
      full_name: '',
      department_name: departmentsNames?.find(item => item[0]),
      email: '',
      tg_username: ''
    },
    validate: {
      full_name: value => {
        if (!value || value.trim() === '') {
          return 'Поле должно быть заполнено'
        }
        if (value.length > 256) {
          return 'Максимум 256 символов.'
        }
        return null
      },
      email: value => {
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          return 'Почта в формате mail@mail.ru'
        }
        if (value.length > 256) {
          return 'Максимум 256 символов.'
        }
        return null
      },
      tg_username: value => {
        if (value && value[0] !== '@') {
          return 'Введите имя в формате @telegram'
        }
        if (value && !/^@[A-Za-z0-9][A-Za-z0-9_]+$/.test(value)) {
          return 'Неверный формат для имени в telegram'
        }
        if (value && value.length < 6) {
          return 'Минимум 6 символов.'
        }
        if (value && value.length > 33) {
          return 'Максимум 33 символа.'
        }
        return null
      }
    },
    validateInputOnChange: true
  })
  return formEmployeeData
}
