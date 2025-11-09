import { QuestionTypeEnum } from './forms/use-create-edit-question-form'

export interface IQuestion {
  id: number
  text: string
  question_type: QuestionTypeEnum
  is_favorite: boolean
  surveys?: [] // TODO: понять как и где отображать
  to_delete: boolean
}
