import { useForm } from '@mantine/form'
import { getDepartments } from '@entities/groups'

export type TEmployeeForm = {
  name: string
  department: (string | undefined)[]
  email: string
  tgUsername: string
}

export const departmentsData = await getDepartments()

export const departmentsNames = departmentsData?.map(item => item.department_name)

export const useCreateEmployeeEditForm = (initialValues?: TEmployeeForm) => {
  const formEmployeeData = useForm({
    mode: 'uncontrolled',
    initialValues: initialValues ?? {
      name: '',
      department: [departmentsNames?.find(item => item[0])],
      email: '',
      tgUsername: ''
    },
    validate: {
      name: value => {
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
        return null
      },
      tgUsername: value => {
        if (value[0] !== '@') {
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
