import { TQuestion } from '@/entities/question/model/types'
import { useForm } from '@mantine/form'

// type TMember = 'memberTest'
// type ParticipantsValue = (TDepartment | TMember)[]

export interface IInitialValues {
  name: string
  // participants: ParticipantsValue | []
  department?: string | null
  startedAt?: Date | null
  finishedAt?: Date | null
  comment?: string
  questions: TQuestion[]
  isFavorite?: boolean
}

export const useSurvey = (initialValues: IInitialValues) => {
  const formSurveyData = useForm({
    initialValues,
    validateInputOnChange: true,
    validate: {
      name: value => {
        if (value.length < 1) return 'Необходимо указать название опроса'
      },
      // participants: value => {
      //   if (value?.length < 1) return 'Необходимо выбрать участников или группу'
      //   if (value.length === 1 && value[0] === 'memberTest') {
      //     return 'Выберите больше одного участника опроса либо группу'
      //   }
      // },
      department: value => {
        if (!value) {
          return 'Необходимо выбрать департамент'
        }
        return null
      },
      startedAt: (value, values) => {
        if (!value) return 'Выберите дату начала опроса'
        const selectedDate = new Date(value)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        selectedDate.setHours(0, 0, 0, 0)
        if (selectedDate < today) {
          return 'Нельзя выбрать дату начала опроса в прошлом.'
        }
        if (values.finishedAt && new Date(values.finishedAt) < selectedDate) {
          return 'Дата начала не может быть позже завершения опроса.'
        }
        return null
      },
      finishedAt: (value, values) => {
        if (!value) return 'Выберите дату завершения опроса'
        if (values.startedAt) {
          const selectedDate = new Date(value)
          const begin = new Date(values.startedAt)
          selectedDate.setHours(0, 0, 0, 0)
          begin.setHours(0, 0, 0, 0)
          if (selectedDate < begin) {
            return 'Дата завершения должна быть позже даты начала.'
          }
        }
        if (!values.startedAt) {
          const today = new Date()
          today.setHours(0, 0, 0, 0)
          const selectedDate = new Date(value)
          if (selectedDate < today) {
            return 'Нельзя выбрать дату завершения опроса в прошлом.'
          }
        }
        return null
      },
      comment: value => {
        if (!value) return 'Обязательное поле'
        if (value.length > 254) return 'Слишком длинный комментарий. Длина должна быть не больше 254 символов.'
        return null
      },
      questions: {
        text: (value, values, path) => {
          const allTextValues = values.questions.map(v => v.text.trim())
          const trimmed = value.trim()
          if (trimmed === '') return 'Выберите или удалите вопрос'
          if (allTextValues.filter(text => text.trim() === trimmed).length > 1) {
            const currentIndex = Number(path.split('.')[1])
            const firstIndex = allTextValues.indexOf(trimmed)
            return currentIndex === firstIndex ? null : 'Такой вопрос уже есть, выберите другой'
          }
          return null
        }
      }
    }
  })

  return formSurveyData
}
