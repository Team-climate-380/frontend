import React from 'react'
import { QuestionsResult } from '@/widgets/questions-result/ui/questions-result'
import classes from '../styles/styles.module.scss'
import { useSurveyResultsStore } from '@/entities/survey-results/results-model'
import { useEffect } from 'react'
import { useQueryParams } from '@/shared/hooks/useQueryParams'

interface SurveyResultsProps {
  shortResults?: boolean
}

const SurveyResults: React.FC<SurveyResultsProps> = ({ shortResults = true }) => {
  const { getParam } = useQueryParams()

  const { results, loading, error, fetchResults } = useSurveyResultsStore()
  const surveyId = Number(getParam('surveyId'))

  useEffect(() => {
    fetchResults(surveyId)
  }, [surveyId])

  if (loading) return <div>Загрузка...</div>
  if (error) return <div>Ошибка: {error}</div>
  if (!results) return <div>Нет данных</div>

  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <h1 className={classes.name}>{results.name}</h1>
        <div className={classes.subtitle}>
          <div className={classes.departments}>{results.department.name}</div>
          <div className={classes.date}>
            {results.started_at} - <span>{results.finished_at}</span>
          </div>
        </div>
        {shortResults ? (
          <>
            <div>Комментарий</div>
            <div className={classes.comments}>{results.comment}</div>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className={classes.content}>
        <QuestionsResult questions={results.questions} shortResults={shortResults} />
      </div>
    </div>
  )
}

export default SurveyResults
