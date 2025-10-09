import { Question } from '@/entities/question'
import { IQuestion } from '@/entities/question/type'
import { FC } from 'react'

interface IQProp {
  questions: IQuestion[]
}

export const QuestionsListUI: FC<IQProp> = ({ questions }) => {
  return (
    <>
      {questions
        ? Object.entries(questions).map(question => {
            return (
              <>
                <Question
                  key={question[1].id}
                  id={question[1].id}
                  text={question[1].text}
                  is_favorite={question[1].is_favorite}
                  surveys={question[1].surveys}
                  question_type={question[1].question_type}
                />
              </>
            )
          })
        : null}
    </>
  )
}
