import React from 'react'
import classes from '../styles/styles.module.scss'

export interface QuestionResultProps {
  id: number
  text: string
  type: string
  to_delete: boolean
  user_answers: {
    id: number
    result: string | string[]
    employer: Employer
  }[]
  answer_options: { id: number; text: string; is_correct: boolean }[]
  surveys: number[]
}

export interface employeesProps {
  employee: number
  survey_sec: number
}

interface Employer {
  id: number
  email: string
  full_name: string
}

interface Props {
  question: QuestionResultProps
  fullResults: boolean
  employees: employeesProps[] | undefined
}

export const QuestionResult: React.FC<Props> = ({ question, fullResults, employees }) => {
  function formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60
    const parts = []
    if (hours > 0) {
      parts.push(`${hours} ч`)
    }
    if (minutes > 0) {
      parts.push(`${minutes} мин`)
    }
    if (remainingSeconds > 0 && hours === 0) {
      parts.push(`${remainingSeconds} сек`)
    }

    return parts.join(' ')
  }

  const counts: Record<string, number> = {}

  question.answer_options.forEach(answer => {
    counts[answer.text] = 0
  })

  const time: Record<number, number> = {}

  if (employees) {
    employees.forEach(employee => {
      if (employee.survey_sec > 0) {
        time[employee.employee] = employee.survey_sec
      }
    })
  }

  question.user_answers.forEach(answer => {
    if (typeof answer.result === 'string' && Object.prototype.hasOwnProperty.call(counts, answer.result)) {
      counts[answer.result]++
    } else if (Array.isArray(answer.result)) {
      answer.result.forEach(item => {
        if (Object.prototype.hasOwnProperty.call(counts, item)) {
          counts[item]++
        }
      })
    }
  })

  const sortedCounts = Object.entries(counts).sort((a, b) => b[1] - a[1])

  const groupedAnswers: Record<string, Array<Employer>> = {}

  question.answer_options.forEach(option => {
    groupedAnswers[option.text] = []
  })

  question.user_answers.forEach(answer => {
    const result = answer.result

    if (typeof result === 'string' && groupedAnswers[result]) {
      groupedAnswers[result].push(answer.employer)
    } else if (Array.isArray(result)) {
      result.forEach(item => {
        if (groupedAnswers[item]) {
          groupedAnswers[item].push(answer.employer)
        }
      })
    }
  })

  return (
    <div className={classes.wrapper}>
      <h2 className={classes.title}>{question.text}</h2>
      {sortedCounts && sortedCounts.length > 0 ? (
        <>
          <ul className={classes.results__list}>
            {sortedCounts.map(([answerText, count], index) =>
              count ? (
                <li key={index} className={classes.results__element}>
                  {answerText} — {count}
                </li>
              ) : null
            )}
          </ul>
          {fullResults ? (
            <div>
              {sortedCounts.map(([answerText], index) => {
                if (counts[answerText] !== 0) {
                  const employees = groupedAnswers[answerText] || []
                  return (
                    <div className={classes.user__list} key={index}>
                      {employees.map((employer, index) => (
                        <div key={index}>
                          {employer.full_name} - {answerText}
                          {time[employer.id] ? <>({formatTime(time[employer.id])})</> : <></>}
                        </div>
                      ))}
                    </div>
                  )
                }
              })}
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  )
}
