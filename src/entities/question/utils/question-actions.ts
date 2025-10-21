import { updateQuestion } from '../api/update-question'
import { QuestionTypeEnum } from '../forms/use-create-edit-question-form'

export const toggleFavorite = async (id: number, currentState: boolean) => {
  alert(`You are click addToFavorite: id is ${id}`)
  const resp = await updateQuestion(id, { is_favorite: !currentState })
  alert(resp?.is_favorite)
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
