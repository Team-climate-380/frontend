import React from 'react'
import { QuestionsResult } from '@/widgets/questions-result/ui/questions-result'
import classes from '../styles/styles.module.scss'
import { useResultsQuery } from '@/entities/survey-results/results-model'
import { useQueryParams } from '@/shared/hooks/useQueryParams'
import { CloseButton, Loader } from '@mantine/core'
import { MoreButton } from '@/shared/ui/more-button'
import { PopupMenu } from '@/shared/ui/popup-menu'
import { PopupMenuItem } from '@/shared/ui/popup-menu/types/types'

interface SurveyResultsProps {
  fullResults?: boolean
  withDropDownMenu?: boolean
}

const SurveyResults: React.FC<SurveyResultsProps> = ({ fullResults = true, withDropDownMenu = true }) => {
  const { getParam } = useQueryParams()
  const surveyId = Number(getParam('surveyId'))
  const { data, isPending, isError } = useResultsQuery(surveyId)

  const itemsActive: PopupMenuItem[] = [
    { type: 'action', label: 'Остановить опрос', action: () => {} },
    { type: 'action', label: 'Дублировать', action: () => {} },
    { type: 'link', label: 'Полные результаты', url: `/full-results?surveyId=${surveyId}` },
    { type: 'link', label: 'Агрегированные результаты', url: `/short-results?surveyId=${surveyId}` },
    { type: 'action', label: 'В архив', action: () => {} },
    { type: 'divider' },
    { type: 'action', label: 'Удалить', action: () => {}, important: true }
  ]

  const itemsComplited: PopupMenuItem[] = [
    { type: 'action', label: 'Дублировать', action: () => {} },
    { type: 'link', label: 'Полные результаты', url: `/full-results?surveyId=${surveyId}` },
    { type: 'link', label: 'Агрегированные результаты', url: `/short-results?surveyId=${surveyId}` },
    { type: 'action', label: 'В архив', action: () => {} },
    { type: 'divider' },
    { type: 'action', label: 'Удалить', action: () => {}, important: true }
  ]

  function formatDate(dateString: string) {
    const date = new Date(dateString)
    const day = ('0' + date.getDate()).slice(-2)
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const year = date.getFullYear()

    return `${day}.${month}.${year}`
  }

  return (
    <div className={classes.wrapper}>
      {isPending && <Loader />}
      {!data && isError && 'Ошибка при загрузке результатов...'}
      {data && (
        <>
          <div className={classes.header}>
            {withDropDownMenu ? (
              <div className={classes.buttons}>
                {data.status === 'active' ? (
                  <PopupMenu type="dropdown" items={itemsActive} position="bottom-end">
                    <div className={classes.moreButton}>
                      <MoreButton />
                    </div>
                  </PopupMenu>
                ) : (
                  <PopupMenu type="dropdown" items={itemsComplited} position="bottom-end">
                    <div className={classes.moreButton}>
                      <MoreButton />
                    </div>
                  </PopupMenu>
                )}
                <CloseButton />
              </div>
            ) : (
              <></>
            )}
            <h1 className={classes.name}>{data.name}</h1>
            <div className={classes.subtitle}>
              <div className={classes.departments}>{data.department.name}</div>
              <div className={classes.date}>
                {formatDate(data.started_at)} - {formatDate(data.finished_at)}
              </div>
              {data.status === 'active' ? <div>Активный</div> : <div>Завершен</div>}
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
            <QuestionsResult questions={data.questions} fullResults={fullResults} employees={data.employees} />
          </div>
        </>
      )}
    </div>
  )
}

export default SurveyResults
