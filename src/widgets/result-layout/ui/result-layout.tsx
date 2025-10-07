import { Suspense } from 'react'
import { Outlet } from 'react-router'
import { Loader } from '@shared/ui/loader'

import classes from '../styles/styles.module.scss'

export const ResultLayout: React.FC = () => {
  return (
    <div className={classes.container}>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  )
}
