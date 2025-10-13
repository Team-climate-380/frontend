import style from '../styles/question.module.scss'
import { Text } from '@mantine/core'
import { FC } from 'react'
import { FavoriteIconFlled } from '../ui/favorite-icon-filled'
import { QuestionType, TQuestionUIProps } from '../type'
import { ContextMenu } from '@/shared/ui/popup-menu/ui/context-menu'
import { addToFavorite, deleteQuestion, editQuestion } from '../utils/quetion-actions'
import { QuestionForm } from '@/features/question-form'

export const QuestionUI: FC<TQuestionUIProps> = ({
  id,
  is_favorite,
  text,
  question_type,
  action,
  dropdownActive,
  editMenuVisible
}) => {
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
    <div className={style.question} onClick={action}>
      <span className={style.id}>{id}</span>
      <div className={style.isFavorite}>{is_favorite && <FavoriteIconFlled width={11} height={11} />}</div>
      <Text size="md" className={style.text}>
        {text} <span className={style.question_type}> ({QuestionTypeDisplay(question_type)})</span>
      </Text>
      {dropdownActive && (
        <ContextMenu
          items={[
            { type: 'action', label: 'Редактировать', action: editQuestion },
            { type: 'action', label: 'Избранное', action: (e: MouseEvent | undefined) => addToFavorite(e) },
            { type: 'divider' },
            { type: 'action', label: 'Удалить', action: deleteQuestion, important: true }
          ]}
          onClose={close}
          classname={style.dropdown}
        />
      )}
      {editMenuVisible && <QuestionForm isOpen={editMenuVisible} isCreateForm={true} closeForm={() => {}} />}
    </div>
  )
}
