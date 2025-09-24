import React from 'react'
import classes from '../styles/styles.module.scss'

export interface QuestionResultProps {
  id: number
  text: string
  type: string
  user_answers: {
    id: number
    result: string
    employer: {
      id: number
      email: string
      full_name: string
    }
  }[]
  answer_options: { id: number; text: string; is_correct: boolean }[]
}

interface Props {
  question: QuestionResultProps
}

export const QuestionResult: React.FC<Props> = ({ question }) => {
  const counts: Record<string, number> = {}

  question.answer_options.forEach(answer => {
    counts[answer.text] = 0
  })

  question.user_answers.forEach(answer => {
    if (typeof answer.result === 'string' && Object.prototype.hasOwnProperty.call(counts, answer.result)) {
      counts[answer.result]++
    }
  })

  const sortedCounts = Object.entries(counts).sort((a, b) => b[1] - a[1])

  const groupedAnswers: Record<string, string[]> = {}

  question.answer_options.forEach(option => {
    groupedAnswers[option.text] = []
  })

  question.user_answers.forEach(answer => {
    const result = answer.result

    if (typeof result === 'string' && groupedAnswers[result]) {
      groupedAnswers[result].push(answer.employer.full_name)
    }
  })

  return (
    <div className={classes.wrapper}>
      <h2 className={classes.title}>{question.text}</h2>
      <ul className={classes.results__list}>
        {sortedCounts.map(([answerText, count]) => (
          <li key={answerText} className={classes.results__element}>
            {answerText} — {count}
          </li>
        ))}
      </ul>
      <div>
        {sortedCounts.map(([answerText]) => {
          const employees = groupedAnswers[answerText] || []
          return (
            <div className={classes.user__list}>
              {employees.map(employer => (
                <div>
                  {employer} - {answerText}
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
