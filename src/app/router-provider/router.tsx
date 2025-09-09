import { createBrowserRouter } from 'react-router'
import { routes } from '@shared/configs/routs'
import { LazyLoginPage } from '@pages/login'
import { LazyNotFound } from '@pages/not-found'
import { CommonLayout } from '@widgets/common-layout'
import { DashboardLayout } from '@widgets/dashboard-layout'
import { LazyHomePage } from '@/pages/home-page'
import { LazyQuestions } from '@/pages/questions'
import { LazySurveys } from '@/pages/surveys'
import { LazyCreatingSurvey } from '@/pages/creating-survey'
import { LazySurveyResults } from '@/pages/survey-results'
import { LazyEmployees } from '@/pages/employees'
import { LazyDepartments } from '@/pages/departments'

export const router = createBrowserRouter([
  {
    path: routes.home(),
    element: <CommonLayout />,
    children: [
      {
        index: true,
        element: <LazyHomePage />
      },

      {
        path: routes.login(),
        element: <LazyLoginPage />
      },

      {
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <div>Dashboard</div>
          },
          {
            path: '*',
            element: <LazyNotFound />
          },
          {
            path: routes.questions(),
            element: <LazyQuestions />
          },

          {
            path: routes.surveys(),
            element: <LazySurveys />
          },

          {
            path: routes.new_survey(),
            element: <LazyCreatingSurvey />
          },

          {
            path: routes.results_survey(),
            element: <LazySurveyResults />
          },

          {
            path: routes.employees(),
            element: <LazyEmployees />
          },

          {
            path: routes.departments(),
            element: <LazyDepartments />
          }
        ]
      }
    ]
  }
])
