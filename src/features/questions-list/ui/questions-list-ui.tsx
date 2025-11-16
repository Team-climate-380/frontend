import { Question } from '@/entities/question'
import { IQuestion } from '@/entities/question/type'
import { FC } from 'react'

interface IQuestionsListUIProps {
  questions: IQuestion[]
  allowContextMenu?: boolean
  setQuestion?: (item: IQuestion | undefined) => void
}

export const QuestionsListUI: FC<IQuestionsListUIProps> = ({ questions, allowContextMenu, setQuestion }) => {
  return (
    <>
      {questions
        ? questions.map((question, index) => {
            return (
              <div key={question.id}>
                <Question
                  numeration={index + 1}
                  id={question.id}
                  text={question.text}
                  is_favorite={question.is_favorite}
                  surveys={question.surveys}
                  question_type={question.question_type}
                  allowContextMenu={allowContextMenu}
                  setQuestion={setQuestion}
                  to_delete={question.to_delete}
                />
              </div>
            )
          })
        : null}
    </>
  )
}
