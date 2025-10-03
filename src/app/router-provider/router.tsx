import { createBrowserRouter } from 'react-router'
import { routes } from '@shared/configs/routs'
import { LazyLoginPage } from '@pages/login'
import { LazyNotFound } from '@/pages/not-found'
import { CommonLayout } from '@widgets/common-layout'
import { DashboardLayout } from '@widgets/dashboard-layout'
import { LazyHomePage } from '@/pages/home-page'
import { LazyQuestions } from '@/pages/questions'
import { LazySurveys } from '@/pages/surveys'
import { LazyCreatingSurvey } from '@/pages/creating-survey'
import { LazySurveyResults } from '@/pages/survey-results'
import { LazyEmployees } from '@/pages/employees'
import { LazyDepartments } from '@/pages/departments'
import { stateInitialization } from '@/features/session/model/store'
import { ProtectedRoute } from '@/features/auth/index'
import { LazyPasswordRecovery } from '@/pages/password-recovery'
import { Menu } from '@/widgets/menu/ui/menu'

// TODO: заменить на данные с бэка
const mockData = [
  {
    id: '1',
    link: 'Опросы',
    name: 'Опросы',
    children: [
      {
        id: '12',
        queryParam: 'string',
        name: 'Маркетинг'
      },
      {
        id: '13',
        queryParam: 'string',
        name: 'Бухгалтерия'
      },
      {
        id: '14',
        queryParam: 'string',
        name: 'Технологии'
      }
    ]
  },
  {
    id: '2',
    link: 'Люди',
    name: 'Люди'
  },
  {
    id: '3',
    link: 'Команды',
    name: 'Команды'
  },
  {
    id: '4',
    link: 'Вопросы',
    name: 'Вопросы'
  }
]

stateInitialization()

export const router = createBrowserRouter([
  {
    path: routes.home(),
    element: <CommonLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <LazyHomePage />
          </ProtectedRoute>
        )
      },

      {
        path: routes.login(),
        element: (
          <ProtectedRoute onlyUnAuth={true}>
            <LazyLoginPage />
          </ProtectedRoute>
        )
      },

      {
        path: routes.password_recovery(),
        element: (
          <ProtectedRoute onlyUnAuth={true}>
            <LazyPasswordRecovery />
          </ProtectedRoute>
        )
      },

      {
        element: <DashboardLayout contentSidebar={<Menu linksInfo={mockData} />} />,
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <div>Dashboard</div>
              </ProtectedRoute>
            )
          },
          {
            path: '*',
            element: <LazyNotFound />
          },
          {
            path: routes.questions(),
            element: (
              <ProtectedRoute>
                <LazyQuestions />
              </ProtectedRoute>
            )
          },

          {
            path: routes.surveys(),
            element: (
              <ProtectedRoute>
                <LazySurveys />
              </ProtectedRoute>
            )
          },

          {
            path: routes.new_survey(),
            element: (
              <ProtectedRoute>
                <LazyCreatingSurvey />
              </ProtectedRoute>
            )
          },

          {
            path: routes.results_survey(),
            element: (
              <ProtectedRoute>
                <LazySurveyResults />
              </ProtectedRoute>
            )
          },

          {
            path: routes.employees(),
            element: (
              <ProtectedRoute>
                <LazyEmployees />
              </ProtectedRoute>
            )
          },

          {
            path: routes.departments(),
            element: (
              <ProtectedRoute>
                <LazyDepartments />
              </ProtectedRoute>
            )
          }
        ]
      }
    ]
  }
])
