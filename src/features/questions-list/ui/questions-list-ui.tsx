import { Question } from '@/entities/question'
import { IQuestion } from '@/entities/question/type'
import { FC } from 'react'

interface IQuestionsListUIProps {
  questions: IQuestion[]
  allowContextMenu?: boolean
}

export const QuestionsListUI: FC<IQuestionsListUIProps> = ({ questions, allowContextMenu }) => {
  return (
    <>
      {questions
        ? questions.map(question => {
            return (
              <div key={question.id}>
                <Question
                  id={question.id}
                  text={question.text}
                  is_favorite={question.is_favorite}
                  surveys={question.surveys}
                  question_type={question.question_type}
                  allowContextMenu={allowContextMenu}
                />
              </div>
            )
          })
        : null}
    </>
  )
}
