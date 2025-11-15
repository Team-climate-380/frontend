export const QuestionEnum = {
  ratingScale: 'ratingScale',
  score: 'score',
  consentGiven: 'consentGiven'
} as const
export type QuestionType = keyof typeof QuestionEnum

export interface IQuestionCreate {
  text: string
  type?: QuestionType
}

export interface TQuestion {
  id?: string | number
  text: string
  question_type?: string
  is_favorite?: boolean
  answers?: TAnswer[]
}

export interface TAnswer {
  text: string
  is_correct: boolean
}
