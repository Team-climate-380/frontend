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
      question: value => (value === undefined ? 'Введите вопрос' : null)
    }
  })

  return questionForm
}
