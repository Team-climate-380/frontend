import { useForm } from '@mantine/form'

export enum QuestionTypeEnum {
  RatingScale = 'Плохо-Прекрасно',
  Score = '1-9',
  ConsentGiven = 'Да-Нет'
}

export interface IQuestionForm {
  typeOfQuestion: QuestionTypeEnum
  question: string
}

export const useCreateEditQuestionForm = (initialValue?: IQuestionForm) => {
  const questionForm = useForm({
    mode: 'uncontrolled',
    initialValues: initialValue ?? {
      typeOfQuestion: QuestionTypeEnum.ConsentGiven,
      question: ''
    },

    validate: {
      typeOfQuestion: value => (value ? null : 'Выберите тип вопроса'),
      question: value => {
        if (!value || value.trim() === '') {
          return 'Введите текст вопроса'
        }
        return null
      }
    },
    validateInputOnChange: true
  })

  return questionForm
}
