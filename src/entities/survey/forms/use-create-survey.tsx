import { TQuestion } from '@/entities/question/model/types'
import { useForm } from '@mantine/form'

// type TMember = 'memberTest'
// type ParticipantsValue = (TDepartment | TMember)[]

interface IInitialValues {
  name: string
  // participants: ParticipantsValue | []
  department?: string[]
  startedAt?: Date | null
  finishedAt?: Date | null
  comment?: string
  questions: TQuestion[]
  isFavorite?: boolean
}

export const useCreateSurvey = (initialValues: IInitialValues) => {
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
        if (value?.length > 1) {
          return 'Нужно выбрать только один отдел'
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
        if (!value) return null
        if (value.length > 254) return 'Слишком длинный комментарий. Длина должна быть не больше 254 символов.'
      },
      questions: {
        text: value => (value.trim() === '' ? 'Введите текст вопроса' : null),
        type: value => (value ? null : 'Выберите тип вопроса')
      }
    }
  })

  return formSurveyData
}

// NOTES
// This is a test stand
// <DatePickerInput /> required mantine 8.3.0!
//
//
// <form onSubmit={formSurveyData.onSubmit(console.log)}>
//   <MultiSelect
//     label="Кто участвует"
//     key={formSurveyData.key('participants')}
//     clearable
//     nothingFoundMessage="Ничего не найдено"
//     {...formSurveyData.getInputProps('participants')}
//   />
//   <DatePickerInput
//     label="Начало"
//     clearable
//     // value={value}
//     // onChange={setValue}
//     {...formSurveyData.getInputProps('beginDate')}
//   />
//   <DatePickerInput
//     label="Завершение"
//     clearable
//     //   value={value}
//     // onChange={setValue}
//     {...formSurveyData.getInputProps('endDate')}
//   />
//   <TextInput radius="xs" label="Комментарий" {...formSurveyData.getInputProps('commentary')} />
// </form>
