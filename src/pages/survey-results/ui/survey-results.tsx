import React from 'react'
import { QuestionsResult } from '@/widgets/questions-result/ui/questions-result'
import classes from '../styles/styles.module.scss'
import { useResultsQuery, useSurveyResultMutations } from '@/entities/survey-results/results-model'
import { useQueryParams } from '@/shared/hooks/useQueryParams'
import { CloseButton } from '@mantine/core'
import { MoreButton } from '@/shared/ui/more-button'
import { PopupMenu } from '@/shared/ui/popup-menu'
import { PopupMenuItem } from '@/shared/ui/popup-menu/types/types'
import { Skeleton } from '@/shared/ui/skeleton'
import { createSurvey, useToggleSurveyMutation } from '@/entities/survey/api/api'
import { useNavigate } from 'react-router'
import { QuestionResultProps } from '@/shared/ui/question-result/ui/question-result'

interface SurveyResultsProps {
  fullResults?: boolean
  withDropDownMenu?: boolean
}

const SurveyResults: React.FC<SurveyResultsProps> = ({ fullResults = true, withDropDownMenu = true }) => {
  const { getParam } = useQueryParams()
  const { deleteSurveyMutate } = useToggleSurveyMutation()
  const surveyId = Number(getParam('surveyId'))
  const { data, isPending, isError } = useResultsQuery(surveyId)
  const { editSurvey } = useSurveyResultMutations()
  const navigate = useNavigate()

  const payload = {
    name: data?.name,
    comment: data?.comment,
    department_name: data?.department.name,
    is_favorite: data?.is_favorite,
    started_at: data?.started_at,
    finished_at: data?.finished_at,
    questions: data?.questions.map((question: QuestionResultProps) => {
      return {
        text: question.text,
        type: question.type,
        answers: question.answer_options.map(answer => {
          return { text: answer.text, is_correct: answer.is_correct }
        })
      }
    })
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const startDateExpired = data ? new Date(data.started_at) < today : true

  const itemsDraft: PopupMenuItem[] = [
    {
      type: 'action',
      label: 'Запустить опрос',
      action: () => {
        editSurvey.mutate({ id: surveyId, surveyChange: { status: 'active' } })
      },
      disabled: startDateExpired
    },
    {
      type: 'action',
      label: 'Дублировать',
      action: () => {
        createSurvey(payload)
        navigate('/surveys')
      }
    },
    {
      type: 'action',
      label: 'В архив',
      action: () => {
        editSurvey.mutate({ id: surveyId, surveyChange: { status: 'archived' } })
      }
    },
    { type: 'divider' },
    {
      type: 'action',
      label: 'Удалить',
      action: () => {
        deleteSurveyMutate(surveyId)
        navigate('/surveys')
      },
      important: true
    }
  ]

  const itemsArchived: PopupMenuItem[] = [
    {
      type: 'action',
      label: 'Дублировать',
      action: () => {
        createSurvey(payload)
        navigate('/surveys')
      }
    },
    { type: 'link', label: 'Полные результаты', url: `/full-results?surveyId=${surveyId}` },
    { type: 'link', label: 'Агрегированные результаты', url: `/short-results?surveyId=${surveyId}` },
    { type: 'divider' },
    {
      type: 'action',
      label: 'Удалить',
      action: () => {
        deleteSurveyMutate(surveyId)
        navigate('/surveys')
      },
      important: true
    }
  ]

  const itemsActive: PopupMenuItem[] = [
    {
      type: 'action',
      label: 'Остановить опрос',
      action: () => {
        editSurvey.mutate({ id: surveyId, surveyChange: { status: 'completed' } })
      }
    },
    {
      type: 'action',
      label: 'Дублировать',
      action: () => {
        createSurvey(payload)
        navigate('/surveys')
      }
    },
    { type: 'link', label: 'Полные результаты', url: `/full-results?surveyId=${surveyId}` },
    { type: 'link', label: 'Агрегированные результаты', url: `/short-results?surveyId=${surveyId}` },
    {
      type: 'action',
      label: 'В архив',
      action: () => {
        editSurvey.mutate({ id: surveyId, surveyChange: { status: 'archived' } })
      }
    },
    { type: 'divider' },
    {
      type: 'action',
      label: 'Удалить',
      action: () => {
        deleteSurveyMutate(surveyId)
        navigate('/surveys')
      },
      important: true
    }
  ]

  const itemsCompleted: PopupMenuItem[] = [
    {
      type: 'action',
      label: 'Дублировать',
      action: () => {
        createSurvey(payload)
        navigate('/surveys')
      }
    },

    { type: 'link', label: 'Полные результаты', url: `/full-results?surveyId=${surveyId}` },
    { type: 'link', label: 'Агрегированные результаты', url: `/short-results?surveyId=${surveyId}` },
    {
      type: 'action',
      label: 'В архив',
      action: () => {
        editSurvey.mutate({ id: surveyId, surveyChange: { status: 'archived' } })
      }
    },
    { type: 'divider' },
    {
      type: 'action',
      label: 'Удалить',
      action: () => {
        deleteSurveyMutate(surveyId)
        navigate('/surveys')
      },
      important: true
    }
  ]

  const statusLabels: Record<string, string> = {
    draft: 'Черновик',
    active: 'Активный',
    completed: 'Завершён',
    archived: 'Архив'
  }

  const itemsByStatus: Record<string, PopupMenuItem[]> = {
    active: itemsActive,
    completed: itemsCompleted,
    draft: itemsDraft,
    archived: itemsArchived
  }

  const currentItems = data?.status ? itemsByStatus[data.status] : []

  function formatDate(dateString: string) {
    const date = new Date(dateString)
    const day = ('0' + date.getDate()).slice(-2)
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const year = date.getFullYear()

    return `${day}.${month}.${year}`
  }

  return (
    <div className={classes.wrapper}>
      {isPending && (
        <div className={classes.skeleton}>
          <Skeleton />
        </div>
      )}
      {!data && isError && 'Ошибка при загрузке результатов...'}
      {data && (
        <>
          <div className={classes.header}>
            {withDropDownMenu ? (
              <div className={classes.buttons}>
                <PopupMenu type="dropdown" items={currentItems} position="bottom-end">
                  <div className={classes.moreButton}>
                    <MoreButton />
                  </div>
                </PopupMenu>
                <CloseButton onClick={() => navigate('/surveys')} />
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
              <div>{statusLabels[data.status]}</div>
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
