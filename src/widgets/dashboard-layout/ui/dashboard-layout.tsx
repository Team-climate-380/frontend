import { Suspense, ReactNode } from 'react'
import { Outlet } from 'react-router'
import { Loader } from '@shared/ui/loader'
import { ScrollArea } from '@mantine/core'
import classes from './dashboard-layout.module.css'
import Logo from './images/logo.svg?react'
import SidebarImage from './images/sidebar-image.svg?react'

interface DashboardLayoutProps {
  contentSidebar: ReactNode
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ contentSidebar }) => {
  return (
    <div className={classes.container}>
      <Logo role="img" aria-label="Логотип" className={classes.logo} />
      <nav className={classes.navbar}>
        <ScrollArea type={'auto'} className={classes.scrollArea}>
          {contentSidebar}
        </ScrollArea>
      </nav>
      <SidebarImage aria-hidden="true" className={classes.sidebar} />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  )
}
