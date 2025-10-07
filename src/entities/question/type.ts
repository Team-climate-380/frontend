export interface Question {
  id: number
  text: string
  question_type: QuestionType
  is_favorite: boolean
}

export const enum QuestionType {
  RATING_SCALE = 'ratingScale',
  SCORE = 'score',
  CONSENT_GIVEN = 'consentGiven'
}
