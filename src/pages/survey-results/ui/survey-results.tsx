import React from 'react'
import { QuestionsResult } from '@/widgets/questions-result/ui/questions-result'
import classes from '../styles/styles.module.scss'
import { useResultsQuery } from '@/entities/survey-results/results-model'
import { useQueryParams } from '@/shared/hooks/useQueryParams'
import { Loader } from '@mantine/core'

interface SurveyResultsProps {
  fullResults?: boolean
}

const SurveyResults: React.FC<SurveyResultsProps> = ({ fullResults = true }) => {
  const { getParam } = useQueryParams()
  const surveyId = Number(getParam('surveyId'))
  const { data, isPending, isError } = useResultsQuery(surveyId)

  return (
    <div className={classes.wrapper}>
      {isPending && <Loader />}
      {!data && isError && 'Ошибка при загрузки результатов...'}
      {data && (
        <>
          <div className={classes.header}>
            <h1 className={classes.name}>{data.name}</h1>
            <div className={classes.subtitle}>
              <div className={classes.departments}>{data.department.name}</div>
              <div className={classes.date}>
                {data.started_at} - <span>{data.finished_at}</span>
              </div>
            </div>
            {fullResults ? (
              <>
                <div>Комментарий</div>
                <div className={classes.comments}>{data.comment}</div>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className={classes.content}>
            <QuestionsResult questions={data.questions} fullResults={fullResults} />
          </div>
        </>
      )}
    </div>
  )
}

export default SurveyResults
