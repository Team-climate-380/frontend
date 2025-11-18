import style from '../styles/question.module.scss'
import { Text } from '@mantine/core'
import { FavoriteIconFilled } from '@shared/ui/icons/favorite-icon-filled'
import { FC, useState } from 'react'
import { IQuestion } from '../type'
import { ContextMenu } from '@/shared/ui/popup-menu/ui/context-menu'
import { toggleFavorite } from '../utils/question-actions'
import { cancelDeleteQuestion, deleteQuestion } from '../api/delete-question'
import { QuestionForm } from '@/features/question-form'
import { QuestionTypeEnum, QuestionTypeEnum as QTE } from '../forms/use-create-edit-question-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import { CancelDeleteButton } from '@/shared/ui/cancel-delete-button'

export const QuestionUI: FC<
  IQuestion & { allowContextMenu?: boolean; setQuestion?: (item: IQuestion | undefined) => void }
> = ({ numeration, id, is_favorite, text, question_type, allowContextMenu, setQuestion, to_delete }) => {
  const QuestionTypeLabels: Record<QTE, string> = {
    [QuestionTypeEnum.ratingScale]: 'Плохо-Прекрасно',
    [QuestionTypeEnum.score]: '1-9',
    [QuestionTypeEnum.consentGiven]: 'Да-Нет'
  }
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [isFavorite, setIsFavorite] = useState(is_favorite)
  const MENUSIZEWIDTH: number = 290 // px
  const MENUSIZEHEIGHT: number = 250 // px
  const queryClient = useQueryClient()
  const deleteQuestionMutate = useMutation({
    mutationFn: () => deleteQuestion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] })
    },
    onError: error => {
      console.error(`Ошибка при удалении: ${error.message}`)
    }
  })
  const cancelDeteleQuestionMutate = useMutation({
    mutationFn: () => cancelDeleteQuestion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] })
    },
    onError: error => {
      console.error(`Ошибка при отмене удаления: ${error.message}`)
    }
  })
  const handleContextMenu = (e: React.MouseEvent) => {
    if (!allowContextMenu) return
    e.preventDefault()
    const { innerWidth: w, innerHeight: h } = window
    let posX = e.clientX
    if (posX + MENUSIZEWIDTH > w) {
      posX = Math.max(0, w - MENUSIZEWIDTH - 80) // отступ 80px от края
    } // Если меню выступает за нижний край, подвинем вверх
    let posY = e.clientY
    if (posY + MENUSIZEHEIGHT > h) {
      posY = Math.max(0, h - MENUSIZEHEIGHT - 30)
    }
    setPosition({ x: posX, y: posY })
    setDropdownVisible(prev => !prev)
  }
  const close = () => {
    setDropdownVisible(false)
  }

  const selectQuestion = () => {
    if (setQuestion) setQuestion({ id, text, question_type, is_favorite })
  }

  return (
    <>
      <div
        className={clsx(style.question, to_delete && style.to_delete)}
        onClick={allowContextMenu ? close : selectQuestion}
        onContextMenu={handleContextMenu}
      >
        <span className={style.id}>{numeration}</span>
        <div className={style.isFavorite}>{isFavorite && <FavoriteIconFilled width={11} height={11} />}</div>
        <Text size="md" className={style.text}>
          {text} <span className={style.question_type}> ({QuestionTypeLabels[question_type as QuestionTypeEnum]})</span>
        </Text>
        <>
          {to_delete && (
            <CancelDeleteButton
              onClick={() => cancelDeteleQuestionMutate.mutate()}
              itemLabel="вопроса"
              className={style.delete_button}
            />
          )}
        </>

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
              {
                type: 'action',
                label: 'Удалить',
                action: async () => {
                  deleteQuestionMutate.mutate()
                },
                important: true
              }
            ]}
            onClose={close}
            positionX={position.x}
            positionY={position.y}
          />
        )}
      </div>
      {isEditing && (
        <QuestionForm
          isOpen
          isCreateForm={false}
          closeForm={() => setIsEditing(false)}
          formData={{ text, id, question_type: question_type }}
        />
      )}
    </>
  )
}
