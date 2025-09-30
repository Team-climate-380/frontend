import { FC } from 'react'
import { QuestionUI } from '../ui/question-ui'
import { TQuestion } from '../types/question-type'

export const Question: FC<TQuestion> = questions => {
  // Здесь код для работы с данными вопроса.
  const action = (id: number) => {
    alert(id)
  }
  return (
    <QuestionUI
      id={questions.id}
      is_favorite={questions.is_favorite}
      text={questions.text}
      question_type={questions.question_type}
      action={action}
    />
  )
}
