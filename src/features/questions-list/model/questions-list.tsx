import { QuestionsListUI } from '../ui/questions-list-ui'
import { QuestionTypeEnum } from '@/entities/question/forms/use-create-edit-question-form'
import { TQuestion } from '@/entities/question/types/question-type'
import { FC } from 'react'

interface IQuestionsListResponce {
  count: number
  next: string
  previous: string
  results: TQuestion[]
}

export const QuestionsList: FC = () => {
  // TODO: заменить на данные с API
  const mockData: IQuestionsListResponce = {
    count: 3,
    next: 'url',
    previous: 'url',
    results: [
      {
        id: 25,
        is_favorite: true,
        text: 'Как вы оцениваете открытость команды для обсуждения новых идей?',
        question_type: QuestionTypeEnum.ConsentGiven
      },
      {
        id: 24,
        is_favorite: false,
        text: 'Как вы оценили бы уровень морального состояния в команде?',
        question_type: QuestionTypeEnum.RatingScale
      },
      {
        id: 23,
        is_favorite: true,
        text: 'Насколько вы удовлетворены коммуникацией в команде?',
        question_type: QuestionTypeEnum.Score
      }
    ]
  }

  return <QuestionsListUI questions={mockData.results} />
}
