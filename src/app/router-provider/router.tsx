import { createBrowserRouter } from 'react-router'
import { routes } from '@shared/configs/routs'
import { LazyLoginPage } from '@pages/login'
import { LazyNotFound } from '@pages/not-found'
import { CommonLayout } from '@widgets/common-layout'
import { DashboardLayout } from '@widgets/dashboard-layout'

export const router = createBrowserRouter([
  {
    path: routes.home(),
    element: <CommonLayout />,
    children: [
      {
        index: true,
        element: <div>HomePage</div>
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
            element: <div>Questions</div>
          },

          {
            path: routes.surveys(),
            element: <div>Surveys</div>
          },

          {
            path: routes.new_surveys(),
            element: <div>Creating Surveys</div>
          },

          {
            path: routes.results_surveys(),
            element: <div>Results Surveys</div>
          }
        ]
      }
    ]
  }
])
