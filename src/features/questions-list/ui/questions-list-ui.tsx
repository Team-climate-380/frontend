import { Question } from '@/entities/question'
import { IQuestion } from '@/entities/question/type'
import { NotificationModal } from '@/shared/ui/notification-modal'
import { FC, useState } from 'react'

interface IQuestionsListUIProps {
  questions: IQuestion[]
  allowContextMenu?: boolean
  setQuestion?: (item: IQuestion | undefined) => void
}

export const QuestionsListUI: FC<IQuestionsListUIProps> = ({ questions, allowContextMenu, setQuestion }) => {
  const [deleteModalIsVisible, setDeleteModalIsVisible] = useState(false)
  return (
    <>
      {questions
        ? questions.map(question => {
            return (
              <div key={question.id}>
                <Question
                  numeration={question.numeration}
                  id={question.id}
                  text={question.text}
                  is_favorite={question.is_favorite}
                  surveys={question.surveys}
                  question_type={question.question_type}
                  allowContextMenu={allowContextMenu}
                  setQuestion={setQuestion}
                  to_delete={question.to_delete}
                  openDeleteErrorModal={() => setDeleteModalIsVisible(true)}
                />
              </div>
            )
          })
        : null}
      <NotificationModal
        type="error"
        opened={deleteModalIsVisible}
        onClose={() => {
          setDeleteModalIsVisible(false)
        }}
        title={'Невозможно удалить вопрос'}
        text={
          'Этот вопрос уже используется в существующих опросах. Чтобы удалить его, сначала удалите опросы, в которых он встречается.'
        }
      />
    </>
  )
}
