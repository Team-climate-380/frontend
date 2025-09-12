import { Suspense, ReactNode } from 'react'
import { Outlet } from 'react-router'
import { Loader } from '@shared/ui/loader'
import { AppShell } from '@mantine/core'
import classes from './dashboard-layout.module.css'

interface DashboardLayoutProps {
  contentSidebar?: ReactNode
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ contentSidebar }) => {
  return (
    <div className={classes.container}>
      <img src="./images/logo.svg" alt="Логотип" className={classes.logo} />
      <AppShell
        navbar={{
          width: 193,
          breakpoint: 'sm'
        }}
        className={classes.navbar}
      >
        {contentSidebar}
      </AppShell>
      <img src="./images/sidebarImage.svg" aria-hidden="true" className={classes.sidebar} />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  )
}
