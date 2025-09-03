import { createBrowserRouter } from 'react-router'
import { routes } from '@shared/configs/routs'
import { LazyLoginPage } from '@pages/login'
import { LazyNotFoundPage } from '@pages/not-found'
import { CommonLayout } from '@widgets/common-layout'
import { DashboardLayout } from '@widgets/dashboard-layout'

export const router = createBrowserRouter([
  {
    path: routes.home(),
    element: <CommonLayout />,
    children: [
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
            element: <LazyNotFoundPage />
          }
        ]
      }
    ]
  }
])
