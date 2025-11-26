import React from 'react'
import classes from '../styles/styles.module.scss'
import { QuestionResult } from '@/shared/ui/question-result'
import { employeesProps, QuestionResultProps } from '@/shared/ui/question-result/ui/question-result'

interface QuestionsResultProps {
  questions: QuestionResultProps[]
  fullResults: boolean
  employees: employeesProps[] | undefined
}

export const QuestionsResult: React.FC<QuestionsResultProps> = props => {
  return (
    <div className={classes.container}>
      {props.questions.map(question => (
        <QuestionResult
          key={question.id}
          question={question}
          fullResults={props.fullResults}
          employees={props.employees}
        />
      ))}
    </div>
  )
}
