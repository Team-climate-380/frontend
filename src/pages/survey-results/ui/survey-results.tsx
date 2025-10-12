import React from 'react'
import { QuestionsResult } from '@/widgets/questions-result/ui/questions-result'
import classes from '../styles/styles.module.scss'
//import { useResultsQuery } from '@/entities/survey-results/results-model'
//import { useQueryParams } from '@/shared/hooks/useQueryParams'
import { CloseButton } from '@mantine/core'
import { MoreButton } from '@/shared/ui/more-button'
import { PopupMenu } from '@/shared/ui/popup-menu'
import { PopupMenuItem } from '@/shared/ui/popup-menu/types/types'

const mockSurveyResults = {
  id: 1,
  name: 'Опрос по удовлетворенности сотрудников',
  status: 'active',
  comment: 'Общая удовлетворенность на уровне 75%.',
  started_at: '2024-04-01T09:00:00Z',
  finished_at: '2024-04-10T18:00:00Z',
  is_favorite: false,
  question_count: 2,
  finished_count: 10,
  department: {
    id: 101,
    name: 'Отдел маркетинга'
  },
  employees: [
    { employee: 1001, survey_sec: 120 },
    { employee: 1002, survey_sec: 180 },
    { employee: 1003, survey_sec: 150 },
    { employee: 1004, survey_sec: 200 }
  ],
  questions: [
    {
      id: 1,
      text: 'Насколько вы удовлетворены текущими условиями труда?',
      type: 'single_choice',
      user_answers: [
        {
          id: 1,
          result: 'Удовлетворен',
          employer: { id: 1001, email: 'ivanov@example.com', full_name: 'Иван Иванов' }
        },
        {
          id: 2,
          result: 'Не удовлетворен',
          employer: { id: 1002, email: 'petrov@example.com', full_name: 'Петр Петров' }
        },
        {
          id: 3,
          result: 'Удовлетворен',
          employer: { id: 1003, email: 'sidorov@example.com', full_name: 'Сидор Сидоров' }
        },
        {
          id: 4,
          result: 'Не удовлетворен',
          employer: { id: 1004, email: 'smirnov@example.com', full_name: 'Сергей Смирнов' }
        }
      ],
      answer_options: [
        { id: 1, text: 'Удовлетворен', is_correct: false },
        { id: 2, text: 'Не удовлетворен', is_correct: false },
        { id: 3, text: 'Не знаю', is_correct: false }
      ]
    },
    {
      id: 2,
      text: 'Как вы оцениваете качество коммуникации в команде?',
      type: 'single_choice',
      user_answers: [
        {
          id: 5,
          result: 'Отлично',
          employer: { id: 1005, email: 'kuznetsov@example.com', full_name: 'Алексей Кузнецов' }
        },
        {
          id: 6,
          result: 'Плохо',
          employer: { id: 1006, email: 'fedorov@example.com', full_name: 'Денис Федоров' }
        },
        {
          id: 7,
          result: 'Хорошо',
          employer: { id: 1001, email: 'ivanov@example.com', full_name: 'Иван Иванов' }
        }
      ],
      answer_options: [
        { id: 4, text: 'Отлично', is_correct: false },
        { id: 5, text: 'Хорошо', is_correct: false },
        { id: 6, text: 'Плохо', is_correct: false }
      ]
    },
    {
      id: 3,
      text: 'Что бы вы хотели улучшить в своей рабочей среде?',
      type: 'multi_choice',
      user_answers: [
        {
          id: 8,
          result: 'Лучшая техника',
          employer: { id: 1002, email: 'petrov@example.com', full_name: 'Петр Петров' }
        },
        {
          id: 9,
          result: 'Больше командных мероприятий',
          employer: { id: 1003, email: 'sidorov@example.com', full_name: 'Сидор Сидоров' }
        },
        {
          id: 10,
          result: 'Гибкий график',
          employer: { id: 1004, email: 'smirnov@example.com', full_name: 'Сергей Смирнов' }
        }
      ],
      answer_options: [
        { id: 7, text: 'Лучшая техника', is_correct: false },
        { id: 8, text: 'Больше командных мероприятий', is_correct: false },
        { id: 9, text: 'Гибкий график', is_correct: false },
        { id: 10, text: 'Другое', is_correct: false }
      ]
    },
    {
      id: 4,
      text: 'Оцените общее удовлетворение от работы в компании.',
      type: 'single_choice',
      user_answers: [
        {
          id: 11,
          result: 'Высокое',
          employer: { id: 1005, email: 'kuznetsov@example.com', full_name: 'Алексей Кузнецов' }
        },
        {
          id: 12,
          result: 'Среднее',
          employer: { id: 1006, email: 'fedorov@example.com', full_name: 'Денис Федоров' }
        },
        {
          id: 13,
          result: 'Низкое',
          employer: { id: 1001, email: 'ivanov@example.com', full_name: 'Иван Иванов' }
        }
      ],
      answer_options: [
        { id: 11, text: 'Высокое', is_correct: false },
        { id: 12, text: 'Среднее', is_correct: false },
        { id: 13, text: 'Низкое', is_correct: false }
      ]
    }
  ]
}

interface SurveyResultsProps {
  fullResults?: boolean
  withDropDownMenu?: boolean
}

const SurveyResults: React.FC<SurveyResultsProps> = ({ fullResults = true, withDropDownMenu = true }) => {
  // const { getParam } = useQueryParams()
  //const surveyId = Number(getParam('surveyId'))
  //const { data, isPending, isError } = useResultsQuery(surveyId)
  const surveyId = 5
  const data = mockSurveyResults

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
    const date = new Date(dateString) // создаем объект Date из строки
    const day = ('0' + date.getDate()).slice(-2) // день с ведущим нулем
    const month = ('0' + (date.getMonth() + 1)).slice(-2) // месяц +1, с ведущим нулем
    const year = date.getFullYear()

    return `${day}.${month}.${year}`
  }

  return (
    <div className={classes.wrapper}>
      {/*   {isPending && <Loader />}
      {!data && isError && 'Ошибка при загрузке результатов...'} */}
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
