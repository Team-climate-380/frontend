import { useForm } from '@mantine/form'

interface IInitialValues {
  participants: string[] // TODO: Вставить типы сущностей группа/участник
  beginDate: Date
  endDate: Date
  commentary?: string
}

export const useCreateSurvey = (initialValues: IInitialValues) => {
  const formSurveyData = useForm({
    mode: 'uncontrolled',
    initialValues,
    validate: {
      participants: value => {
        if (!value) return null
        return value.length < 1 ? 'Должно быть минимум 2 участника или группа' : null
      },
      beginDate: value => {
        if (!value) return null
        const selectedDate = new Date(value)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        selectedDate.setHours(0, 0, 0, 0)
        if (selectedDate < today) {
          return 'Нельзя выбрать дату в прошлом.'
        }
        return null
      },
      endDate: value => {
        if (!value) return null
        const beginValue = formSurveyData.getValues().beginDate as Date | null
        if (beginValue) {
          const end = new Date(value)
          const begin = new Date(beginValue)
          end.setHours(0, 0, 0, 0)
          begin.setHours(0, 0, 0, 0)
          if (end < begin) {
            return 'Дата завершения должна быть не раньше даты начала.'
          }
        }
        return null
      },
      commentary: value => {
        if (!value) return null
        if (value.length > 254) return 'Слишком длинный комментарий. Длина должна быть не больше 254 символов.'
      }
    }
  })

  return formSurveyData
}
