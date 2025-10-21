import { QuestionsListUI } from '../ui/questions-list-ui'
import { FC } from 'react'
import { IQuestion } from '@/entities/question/type'

interface IQuestionsListProps {
  questions: IQuestion[]
  allowContextMenu?: boolean
}

export const QuestionsList: FC<IQuestionsListProps> = ({ questions, allowContextMenu = true }) => {
  return <QuestionsListUI questions={questions} allowContextMenu={allowContextMenu} />
}
