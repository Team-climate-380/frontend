import { createBrowserRouter } from 'react-router'
import { routes } from '@shared/configs/routs'
import { LazyLoginPage } from '@pages/login'
import { LazyNotFound } from '@/pages/not-found'
import { DashboardLayout } from '@widgets/dashboard-layout'
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
import { ResultLayout } from '@/widgets/result-layout'
import { LazyEditSurvey } from '@/pages/edit-survey'

stateInitialization()

export const router = createBrowserRouter([
  {
    element: <DashboardLayout contentSidebar={<Menu />} />,
    children: [
      {
        path: routes.home(),
        element: (
          <ProtectedRoute>
            <LazySurveys />
          </ProtectedRoute>
        )
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
        path: routes.edit_survey_path(),
        element: (
          <ProtectedRoute>
            <LazyEditSurvey />
          </ProtectedRoute>
        )
      },

      {
        path: routes.results_survey_path(),
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
    element: <ResultLayout />,
    children: [
      {
        path: routes.full_results_path(),
        element: (
          <ProtectedRoute>
            <LazySurveyResults withDropDownMenu={false} />
          </ProtectedRoute>
        )
      },
      {
        path: routes.short_results_path(),
        element: (
          <ProtectedRoute>
            <LazySurveyResults fullResults={false} withDropDownMenu={false} />
          </ProtectedRoute>
        )
      }
    ]
  },

  {
    path: '*',
    element: <LazyNotFound />
  }
])
