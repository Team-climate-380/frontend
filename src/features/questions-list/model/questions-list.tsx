import { QuestionsListUI } from '../ui/questions-list-ui'
import { QuestionType, TQuestion } from '@/entities/question/types/question-type'
// import { ApiClient } from '@/shared/lib/api-client'
import { FC } from 'react'

export interface IQuestionResponce {
  data: TQuestion[]
  page: number
  per_page: number
  total?: number
  num_pages: number
  has_next: boolean
  has_previous: boolean
}

export const QuestionsList: FC = () => {
  // TODO: заменить на данные с API
  // example
  // const api = new ApiClient({})
  // const data = api.get(`${import.meta.env.VITE_API_DOMAIN}questions`)

  const mockData: IQuestionResponce = {
    data: [
      {
        id: 24,
        text: 'Как вы оцениваете уровень доверия между членами команды?',
        question_type: QuestionType.RATING_SCALE,
        is_favorite: false,
        surveys: []
      },
      {
        id: 25,
        text: 'Вы довольны своей работой?',
        question_type: QuestionType.RATING_SCALE,
        is_favorite: false,
        surveys: []
      },
      {
        id: 26,
        text: 'Согласны ли вы с тем, что ваша работа ценится в команде?',
        question_type: QuestionType.CONSENT_GIVEN,
        is_favorite: false,
        surveys: []
      },
      {
        id: 27,
        text: 'Считаете ли вы свою работу эффективной',
        question_type: QuestionType.RATING_SCALE,
        is_favorite: false,
        surveys: []
      },
      {
        id: 28,
        text: 'Как вы оценили бы уровень морального состояния в команде?',
        question_type: QuestionType.RATING_SCALE,
        is_favorite: false,
        surveys: []
      }
    ],
    page: 1,
    per_page: 20,
    total: 5,
    num_pages: 1,
    has_next: false,
    has_previous: false
  }

  return <QuestionsListUI questions={mockData.data} />
}
