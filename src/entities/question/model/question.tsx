import { FC } from 'react'
import { QuestionUI } from '../ui/question-ui'
import { IQuestion } from '../type'

export const Question: FC<IQuestion> = questions => {
  return (
    <QuestionUI
      id={questions.id}
      is_favorite={questions.is_favorite}
      text={questions.text}
      question_type={questions.question_type}
    />
  )
}
