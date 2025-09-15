import { useForm } from '@mantine/form'

export interface IQuestionForm {
  typeOfQuestion: string
  question: string
}

export const useCreateEditQuestionForm = (initialValue?: IQuestionForm) => {
  const questionForm = useForm({
    mode: 'uncontrolled',
    initialValues: initialValue ?? {
      typeOfQuestion: 'Тип вопроса',
      question: ''
    },

    validate: {
      typeOfQuestion: value => (value ? null : 'Выберите тип вопроса'),
      question: value => {
        if (!value || value.trim() === '') {
          return 'Введите вопрос'
        }
        return null
      }
    }
  })

  return questionForm
}
