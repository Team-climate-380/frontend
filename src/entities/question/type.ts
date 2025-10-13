export interface IQuestion {
  id: number
  text: string
  question_type: QuestionType
  is_favorite: boolean
  surveys?: [] // TODO: понять как и где отображать
  dropdownActive: boolean
  editMenuVisible: boolean
}

export type QuestionType = 'ratingScale' | 'score' | 'consentGiven'

export type TQuestionUIProps = IQuestion & {
  action: () => void
}
