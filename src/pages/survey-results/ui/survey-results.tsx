import { QuestionsResult } from '@/widgets/questions-result/ui/questions-result'
import classes from '../styles/styles.module.scss'
import { QuestionResultProps } from '@/shared/ui/question-result/ui/question-result'
import { ApiClient } from '@/shared/lib/api-client'

const client = new ApiClient()

export const login = async () => {
  const response = await client.post('/auth/login', {}, { email: 'admin@admin.mail', password: 'xPKHPWgx7EQNFeF' })
  console.log(response)
}

const testQuestions: QuestionResultProps[] = [
  {
    id: 201,
    text: 'Какой ваш любимый цвет?',
    type: 'single',
    answer_options: [
      { id: 1, text: 'Красный', is_correct: false },
      { id: 2, text: 'Зеленый', is_correct: false },
      { id: 3, text: 'Синий', is_correct: false }
    ],
    user_answers: [
      {
        id: 301,
        result: 'Красный',
        employer: { id: 2, email: 'user1@example.com', full_name: 'Иванов Иван' }
      },
      {
        id: 302,
        result: 'Синий',
        employer: { id: 2, email: 'user2@example.com', full_name: 'Петров Петр' }
      },
      {
        id: 303,
        result: 'Зеленый',
        employer: { id: 3, email: 'user3@example.com', full_name: 'Смирнова Мария' }
      }
    ]
  },
  {
    id: 202,
    text: 'Выберите ваши любимые фрукты.',
    type: 'multiple',
    answer_options: [
      { id: 4, text: 'Яблоки', is_correct: false },
      { id: 5, text: 'Бананы', is_correct: false },
      { id: 6, text: 'Апельсины', is_correct: false }
    ],
    user_answers: [
      {
        id: 304,
        result: 'Яблоки, Бананы',
        employer: { id: 4, email: 'user4@example.com', full_name: 'Алексей Смирнов' }
      },
      {
        id: 305,
        result: 'Бананы, Апельсины',
        employer: { id: 5, email: 'user5@example.com', full_name: 'Елена Иванова' }
      }
    ]
  },
  {
    id: 203,
    text: 'Как часто вы путешествуете?',
    type: 'single',
    answer_options: [
      { id: 7, text: 'Ежемесячно', is_correct: false },
      { id: 8, text: 'Раз в год', is_correct: false },
      { id: 9, text: 'Редко', is_correct: false }
    ],
    user_answers: [
      {
        id: 306,
        result: 'Раз в год',
        employer: { id: 6, email: 'user6@example.com', full_name: 'Николай Петров' }
      }
    ]
  },
  {
    id: 205,
    text: 'Как часто вы путешествуете?',
    type: 'single',
    answer_options: [
      { id: 7, text: 'Ежемесячно', is_correct: false },
      { id: 8, text: 'Раз в год', is_correct: false },
      { id: 9, text: 'Редко', is_correct: false }
    ],
    user_answers: [
      {
        id: 306,
        result: 'Раз в год',
        employer: { id: 6, email: 'user6@example.com', full_name: 'Николай Петров' }
      }
    ]
  },
  {
    id: 204,
    text: 'Как часто вы путешествуете?',
    type: 'single',
    answer_options: [
      { id: 7, text: 'Ежемесячно', is_correct: false },
      { id: 8, text: 'Раз в год', is_correct: false },
      { id: 9, text: 'Редко', is_correct: false }
    ],
    user_answers: [
      {
        id: 306,
        result: 'Раз в год',
        employer: { id: 6, email: 'user6@example.com', full_name: 'Николай Петров' }
      }
    ]
  }
]

/* interface Survey {
  id: number;
  name:string;
  comment: string;
  started_at:string;
  finished_at:string;
  is_favorite:boolean;
  question_count: number;
  finished_count: number;
  questions:QuestionResultProps[];
  department: {
    id: number;
    name: string;
  }
} */

const SurveyResults: React.FC = () => {
  // const { getParam } = useQueryParams();
  // Получаем 'surveyId' из URL-параметров
  /*   const surveyId = getParam('surveyId'); */

  login()

  /*     apiClient.post('https://teamclimate.rassokha.pro:8000/admin/', undefined, {
    email: 'admin@admin.mail',
    password: 'xPKHPWgx7EQNFeF'
  }); */

  // apiClient.get<Survey>(`/api/surveys/${surveyId}/`)

  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <h1 className={classes.name}>name</h1>
        <div className={classes.subtitle}>
          <div className={classes.departments}>departments</div>
          <div className={classes.date}>date</div>
        </div>
        <div>Комментарий</div>
        <div className={classes.comments}>comments</div>
      </div>
      <div className={classes.content}>
        <QuestionsResult questions={testQuestions} />
      </div>
    </div>
  )
}

export default SurveyResults
