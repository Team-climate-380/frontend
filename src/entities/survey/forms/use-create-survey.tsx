import { useForm } from '@mantine/form'

// TODO: Поменять типы группа/участник на реальные
type TGroup = 'groupTest'
type TMember = 'memberTest'
type ParticipantsValue = (TGroup | TMember)[]

interface IInitialValues {
  participants: ParticipantsValue | []
  beginDate: Date | null
  endDate: Date | null
  commentary?: string
}

export const useCreateSurvey = (initialValues: IInitialValues) => {
  const formSurveyData = useForm({
    mode: 'uncontrolled',
    initialValues,
    validateInputOnChange: true,
    validate: {
      participants: value => {
        if (value?.length < 1) return 'Необходимо выбрать участников или группу'
        if (value.length === 1 && value[0] === 'memberTest') {
          return 'Выберите больше одного участника опроса либо группу'
        }
      },
      beginDate: (value, values) => {
        if (!value) return 'Выберите дату начала опроса'
        const selectedDate = new Date(value)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        selectedDate.setHours(0, 0, 0, 0)
        if (selectedDate < today) {
          return 'Нельзя выбрать дату начала опроса в прошлом.'
        }
        if (values.endDate && new Date(values.endDate) < selectedDate) {
          return 'Дата начала не может быть позже завершения опроса.'
        }
        return null
      },
      endDate: (value, values) => {
        if (!value) return 'Выберите дату завершения опроса'
        if (values.beginDate) {
          const selectedDate = new Date(value)
          const begin = new Date(values.beginDate)
          selectedDate.setHours(0, 0, 0, 0)
          begin.setHours(0, 0, 0, 0)
          if (selectedDate < begin) {
            return 'Дата завершения должна быть позже даты начала.'
          }
        }
        if (!values.beginDate) {
          const today = new Date()
          today.setHours(0, 0, 0, 0)
          const selectedDate = new Date(value)
          if (selectedDate < today) {
            return 'Нельзя выбрать дату завершения опроса в прошлом.'
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
