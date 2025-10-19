import { FC } from 'react'
import { QuestionUI } from '../ui/question-ui'
import { IQuestion } from '../type'

export const Question: FC<IQuestion & { allowContextMenu?: boolean }> = question => {
  return (
    <QuestionUI
      id={question.id}
      is_favorite={question.is_favorite}
      text={question.text}
      question_type={question.question_type}
      allowContextMenu={question.allowContextMenu}
    />
  )
}
