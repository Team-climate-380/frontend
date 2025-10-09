import { QuestionsListUI } from '../ui/questions-list-ui'
// import { ApiClient } from '@/shared/lib/api-client'
import { FC } from 'react'
import { IQuestion } from '@/entities/question/type'
export const QuestionsList: FC<{ questions: IQuestion[] }> = ({ questions }) => {
  // TODO: заменить на данные с API
  // example
  // const api = new ApiClient({})
  // const data = api.get(`${import.meta.env.VITE_API_DOMAIN}questions`)
  return <QuestionsListUI questions={questions} />
}
