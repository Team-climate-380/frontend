import { Suspense, ReactNode } from 'react'
import { Outlet } from 'react-router'
import { Loader } from '@shared/ui/loader'
import { AppShell } from '@mantine/core'
import Logo from '../images/Logo.svg'
import SidebarImage from '../images/sidebarImage.svg'
import classes from './dashboard-layout.module.css'

interface DashboardLayoutProps {
  contentSidebar: ReactNode
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ contentSidebar }) => {
  return (
    <>
      <AppShell
        withBorder={false}
        navbar={{
          width: 201
        }}
        styles={{
          navbar: {
            position: 'relative',
            top: 0,
            minHeight: '100%',
            height: 'auto',
            overflow: 'hidden',
            background:
              'linear-gradient(180deg, #0085ca 0%, #69a1e0 50.96%, #9094b8 66.35%, #d36400 100%), linear-gradient(179.02deg, #230840 18.58%, #2c8ea9 99.16%), #06121e',
            backgroundAttachment: 'fixed'
          },
          main: {
            minHeight: '100%',
            height: '100%',
            flex: 1,
            padding: 0
          }
        }}
        className={classes.container}
      >
        <AppShell.Navbar>
          <img src={Logo} alt="Логотип" className={classes.logo} />
          <AppShell.Section className={classes.contentSidebar} grow>
            {contentSidebar}
          </AppShell.Section>
          <img src={SidebarImage} aria-hidden="true" className={classes.sidebarImage} />
        </AppShell.Navbar>

        <AppShell.Main>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </AppShell.Main>
      </AppShell>
    </>
  )
}
