import style from '../styles/question.module.scss'
import { Text } from '@mantine/core'
import { FavoriteIconFilled } from '@shared/ui/icons/favorite-icon-filled'
import { FC, useState } from 'react'
import { IQuestion } from '../type'
import { ContextMenu } from '@/shared/ui/popup-menu/ui/context-menu'
import { toggleFavorite } from '../utils/question-actions'
import { deleteQuestion } from '../api/delete-question'
import { QuestionForm } from '@/features/question-form'
import { QuestionTypeEnum, QuestionTypeEnum as QTE } from '../forms/use-create-edit-question-form'

export const QuestionUI: FC<IQuestion & { allowContextMenu?: boolean }> = ({
  id,
  is_favorite,
  text,
  question_type,
  allowContextMenu
}) => {
  const QuestionTypeLabels: Record<QTE, string> = {
    [QuestionTypeEnum.ratingScale]: 'Плохо-Прекрасно',
    [QuestionTypeEnum.score]: '1-9',
    [QuestionTypeEnum.consentGiven]: 'Да-Нет'
  }
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [isFavorite, setIsFavorite] = useState(is_favorite)
  const handleContextMenu = (e: React.MouseEvent) => {
    if (!allowContextMenu) return
    e.preventDefault()
    setPosition({ x: e.clientX, y: e.clientY })
    setDropdownVisible(prev => !prev)
  }
  const close = () => setDropdownVisible(false)
  return (
    <>
      <div className={style.question} onClick={close} onContextMenu={handleContextMenu}>
        <span className={style.id}>{id}</span>
        <div className={style.isFavorite}>{isFavorite && <FavoriteIconFilled width={11} height={11} />}</div>
        <Text size="md" className={style.text}>
          {text} <span className={style.question_type}> ({QuestionTypeLabels[question_type as QuestionTypeEnum]})</span>
        </Text>
        {dropdownVisible && allowContextMenu && (
          <ContextMenu
            items={[
              {
                type: 'action',
                label: `${isEditing ? 'Отменить редактирование' : 'Редактировать'}`,
                action: () => {
                  setIsEditing(prev => !prev)
                }
              },
              {
                type: 'action',
                label: `${isFavorite ? 'Убрать из избранного' : 'Избранное'}`,
                action: async () => {
                  const resp = await toggleFavorite(id, isFavorite)
                  setIsFavorite(prev => (resp ? resp.is_favorite : prev))
                }
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
      {isEditing && (
        <QuestionForm
          isOpen
          isCreateForm={false}
          closeForm={() => setIsEditing(false)}
          formData={{ text, id, question_type }}
        />
      )}
    </>
  )
}
