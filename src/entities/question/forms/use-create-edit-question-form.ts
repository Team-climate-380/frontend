import { useForm } from '@mantine/form'
import { QuestionTypeDisplay } from '../utils/question-actions'

export enum QuestionTypeEnum {
  ratingScale = 'ratingScale',
  score = 'score',
  consentGiven = 'consentGiven'
}

export interface IQuestionForm {
  id: number
  text: string
  question_type: string
  isfavorite?: boolean
}

export const useCreateEditQuestionForm = (initialValue?: IQuestionForm) => {
  const questionForm = useForm({
    mode: 'uncontrolled',
    initialValues: initialValue ?? {
      id: 0,
      question_type: QuestionTypeDisplay(QuestionTypeEnum.consentGiven),
      text: '',
      isfavorite: false
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
