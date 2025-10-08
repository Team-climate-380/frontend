import style from '../styles/question.module.scss'
import { Text } from '@mantine/core'
import { FC } from 'react'
import { FavoriteIconFlled } from '../ui/favorite-icon-filled'
import { QuestionType, TQuestionUIProps } from '../type'

export const QuestionUI: FC<TQuestionUIProps> = ({ id, is_favorite, text, question_type, action }) => {
  const QuestionTypeDisplay = (question_type: QuestionType) => {
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
  return (
    <div className={style.question} onClick={() => action(id)}>
      <span className={style.id}>{id}</span>
      <div className={style.isFavorite}>{is_favorite && <FavoriteIconFlled width={11} height={11} />}</div>
      <Text size="md" className={style.text}>
        {text} <span className={style.question_type}> ({QuestionTypeDisplay(question_type)})</span>
      </Text>
    </div>
  )
}
