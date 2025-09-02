import { Suspense } from 'react'
import { Outlet } from 'react-router'
import { Loader } from '@shared/ui/loader'

export const CommonLayout: React.FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Outlet />
    </Suspense>
  )
}
