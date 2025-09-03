import { Suspense } from 'react'
import { Outlet } from 'react-router'
import { Loader } from '@shared/ui/loader'
import { ScrollArea } from '@mantine/core'
import classes from './dashboard-layout.module.css'
import Logo from './images/logo.svg?react'
import SidebarImage from './images/sidebar-image.svg?react'

export const DashboardLayout: React.FC = ({ contentSidebar }: ReactNode) => {
  return (
    <div className={classes.container}>
      <Suspense fallback={<Loader />}>
        <nav className={classes.navbar}>
          <Logo alt="логотип" className={classes.logo} />
          <ScrollArea type={'auto'} className={classes.scrollArea}>
            {contentSidebar}
          </ScrollArea>
          <SidebarImage alt="девушка сидит на столе" className={classes.sidebar} />
        </nav>

        <Outlet />
      </Suspense>
    </div>
  )
}
