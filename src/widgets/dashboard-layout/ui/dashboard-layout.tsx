import { Suspense } from 'react'
import { Outlet } from 'react-router'
import { Loader } from '@shared/ui/loader'

export const DashboardLayout: React.FC = () => {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  )
}
