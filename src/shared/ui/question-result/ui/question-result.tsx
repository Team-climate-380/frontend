import React from 'react'
import classes from '../styles/styles.module.scss'

export interface QuestionResultProps {
  id: number
  text: string
  question_type: string
  to_delete: boolean
  user_answers: {
    id: number
    result: string | string[] | number
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

  const time: Record<number, number> = {}

  if (employees) {
    employees.forEach(employee => {
      if (employee.survey_sec > 0) {
        time[employee.employee] = employee.survey_sec
      }
    })
  }

  const counts: Record<string, number> = {}

  question.user_answers.forEach(answer => {
    const incrementCount = (key: string) => {
      if (Object.prototype.hasOwnProperty.call(counts, key)) {
        counts[key]++
      } else {
        counts[key] = 1
      }
    }

    if (typeof answer.result === 'string') {
      incrementCount(answer.result)
    } else if (Array.isArray(answer.result)) {
      answer.result.forEach(item => {
        incrementCount(item)
      })
    } else if (typeof answer.result === 'number') {
      const resultStr = String(answer.result)
      incrementCount(resultStr)
    }
  })

  const sortedCounts = Object.entries(counts).sort((a, b) => b[1] - a[1])

  const groupedAnswers: Record<string, Array<Employer>> = {}

  question.user_answers.forEach(answer => {
    const result = answer.result
    const employer = answer.employer

    const ensureArray = (key: string) => {
      if (!groupedAnswers[key]) {
        groupedAnswers[key] = []
      }
    }

    if (typeof result === 'string') {
      ensureArray(result)
      groupedAnswers[result].push(employer)
    } else if (Array.isArray(result)) {
      result.forEach(item => {
        ensureArray(item)
        groupedAnswers[item].push(employer)
      })
    } else if (typeof result === 'number') {
      const resStr = String(result)
      ensureArray(resStr)
      groupedAnswers[resStr].push(employer)
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
