export type TQuestion = {
  id: number
  text: string
  question_type: QuestionType
  is_favorite?: boolean
  surveys?: []
}

export const enum QuestionType {
  RATING_SCALE = 'ratingScale',
  SCORE = 'score',
  CONSENT_GIVEN = 'consentGiven'
}

export const QuestionTypeDisplay = (question_type: QuestionType) => {
  switch (question_type) {
    case QuestionType.RATING_SCALE:
      return 'Плохо-Прекрасно'
      break
    case QuestionType.CONSENT_GIVEN:
      return 'Да-Нет'
      break
    case QuestionType.SCORE:
      return '1-9'
      break
    default:
      return 'Без оценки'
  }
}
export type TQuestionUIProps = TQuestion & {
  action: (id: number) => void
}
