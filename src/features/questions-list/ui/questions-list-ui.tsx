import { Question } from '@/entities/question/model/question'
import { TQuestion } from '@/entities/question/types/question-type'
import { FC } from 'react'

interface IQuestionsListUIProps {
  questions: TQuestion[]
}

export const QuestionsListUI: FC<IQuestionsListUIProps> = ({ questions }) => {
  const questionlist = questions.map(question => {
    return (
      <Question
        key={question.id}
        id={question.id}
        is_favorite={question.is_favorite}
        text={question.text}
        question_type={question.question_type}
      ></Question>
    )
  })
  return questionlist.length ? questionlist : 'Нет активных вопросов'
}
