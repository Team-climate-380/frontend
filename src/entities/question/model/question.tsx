import { FC, useState } from 'react'
import { QuestionUI } from '../ui/question-ui'
import { ApiClient } from '@/shared/lib/api-client'
import { IQuestion } from '../type'

export const Question: FC<IQuestion> = questions => {
  // Здесь код для работы с данными вопроса.

  // START TEST ACTION
  const api = new ApiClient({}) // create api&use
  const [isFavorite, setIsFavorite] = useState(false)
  const action = (id: number) => {
    setIsFavorite(prev => !prev)
    api.patch(`${id}`)
  }
  // ENDN TEST ACTION
  // const question_type =

  return (
    <QuestionUI
      id={questions.id}
      is_favorite={isFavorite}
      text={questions.text}
      question_type={questions.question_type}
      action={action}
    />
  )
}
