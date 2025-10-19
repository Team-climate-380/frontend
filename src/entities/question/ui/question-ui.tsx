import style from '../styles/question.module.scss'
import { Text } from '@mantine/core'
import { FC, useState } from 'react'
import { FavoriteIconFlled } from '../ui/favorite-icon-filled'
import { IQuestion, QuestionType } from '../type'
import { ContextMenu } from '@/shared/ui/popup-menu/ui/context-menu'
import { editQuestion, toggleFavorite } from '../utils/question-actions'
import { deleteQuestion } from '../api/delete-question'

export const QuestionUI: FC<IQuestion & { allowContextMenu?: boolean }> = ({
  id,
  is_favorite,
  text,
  question_type,
  allowContextMenu
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const handleContextMenu = (e: React.MouseEvent) => {
    if (!allowContextMenu) return
    e.preventDefault()
    setPosition({ x: e.clientX, y: e.clientY })
    setDropdownVisible(prev => !prev)
  }
  const close = () => setDropdownVisible(false)
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
    <div className={style.question} onClick={close} onContextMenu={handleContextMenu}>
      <span className={style.id}>{id}</span>
      <div className={style.isFavorite}>{is_favorite && <FavoriteIconFlled width={11} height={11} />}</div>
      <Text size="md" className={style.text}>
        {text} <span className={style.question_type}> ({QuestionTypeDisplay(question_type)})</span>
      </Text>
      {dropdownVisible && allowContextMenu && (
        <ContextMenu
          items={[
            { type: 'action', label: 'Редактировать', action: () => editQuestion(id) },
            {
              type: 'action',
              label: `${is_favorite ? 'Убрать из избранного' : 'Избранное'}`,
              action: () => toggleFavorite(id, is_favorite)
            },
            { type: 'divider' },
            { type: 'action', label: 'Удалить', action: () => deleteQuestion(id), important: true }
          ]}
          onClose={close}
          positionX={position?.x}
          positionY={position?.y}
        />
      )}
    </div>
  )
}
