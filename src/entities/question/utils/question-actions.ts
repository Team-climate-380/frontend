import { updateQuestion } from '../api/update-question'
import { QuestionTypeEnum } from '../forms/use-create-edit-question-form'

export const toggleFavorite = async (id: number, currentState: boolean) => {
  const responce = await updateQuestion(id, { is_favorite: !currentState })
  return responce
}

export const QuestionTypeDisplay = (question_type: QuestionTypeEnum) => {
  switch (question_type) {
    case 'ratingScale':
      return 'Плохо-Прекрасно'
      break
    case 'consentGiven':
      return 'Да-Нет'
      break
    case 'score':
      return '1-9'
      break
    default:
      return 'Без оценки'
  }
}

export const QuestionTypeData = (question_type: string): QuestionTypeEnum => {
  switch (question_type) {
    case 'Плохо-Прекрасно':
      return QuestionTypeEnum.ratingScale
      break
    case 'Да-Нет':
      return QuestionTypeEnum.consentGiven
      break
    case '1-9':
      return QuestionTypeEnum.score
      break
    default:
      return QuestionTypeEnum.consentGiven
  }
}
