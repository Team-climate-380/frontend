import { useForm } from '@mantine/form'

export interface ValuesFormGroups {
  name: string
}

export const useCreateEditFormGroup = (initialValues: Partial<ValuesFormGroups>) => {
  const formGroupData = useForm({
    mode: 'uncontrolled',
    initialValues: initialValues ?? { name: '' },

    validate: {
      name: value => {
        if (!value || value.trim().length === 0) {
          return 'Название группы не может быть пустым.'
        }
        if (value.length > 254) {
          return 'Слишком длинное название. Длина должна быть не больше 254 символов.'
        }
        return null
      }
    }
  })
  return formGroupData
}
