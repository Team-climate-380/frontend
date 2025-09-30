import { QuestionTypeEnum } from '../forms/use-create-edit-question-form'

export type TQuestion = {
  id: number
  text: string
  question_type: QuestionTypeEnum
  is_favorite?: boolean
}

export type TQuestionUIProps = TQuestion & {
  action: (id: number) => void
}
