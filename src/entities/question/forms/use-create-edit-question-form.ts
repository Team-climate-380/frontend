import { useForm } from '@mantine/form'

export enum QuestionTypeEnum {
  RatingScale = 'Плохо-Прекрасно',
  Score = '1-9',
  ConsentGiven = 'Да-Нет'
}

export interface IQuestionForm {
  text: string
  question_type: string
  isfavorite?: boolean
}

export const useCreateEditQuestionForm = (initialValue?: IQuestionForm) => {
  const questionForm = useForm({
    mode: 'uncontrolled',
    initialValues: initialValue ?? {
      question_type: QuestionTypeEnum.ConsentGiven,
      text: ''
    },

    validate: {
      question_type: (value: string) => (value ? null : 'Выберите тип вопроса'),
      text: (value: string) => {
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
