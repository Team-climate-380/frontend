import { Suspense, ReactNode } from 'react'
import { Outlet } from 'react-router'
import { Loader } from '@shared/ui/loader'
import { AppShell } from '@mantine/core'
import classes from './dashboard-layout.module.css'
import sidebarImage from './images/sidebarImage.svg'
import logo from './images/logo.svg'
import { Menu } from '@/widgets/menu'

interface DashboardLayoutProps {
  contentSidebar?: ReactNode
}

//TODO: delete after add func API
const menuItem = [
  {
    id: '1',
    link: '',
    name: 'Опросы'
  },
  {
    id: '2',
    link: '',
    name: 'Люди'
  },
  {
    id: '3',
    link: '',
    name: 'Команды',
    children: [
      {
        id: '11',
        queryParam: '',
        name: 'Бухгалтерия'
      }
    ]
  }
]

export const DashboardLayout: React.FC<DashboardLayoutProps> = () => {
  return (
    <div className={classes.container}>
      <img src={logo} alt="Логотип" className={classes.logo} />
      <AppShell
        navbar={{
          width: 193,
          breakpoint: 'sm'
        }}
        className={classes.navbar}
      >
        <Menu linksInfo={menuItem} />
      </AppShell>
      <img src={sidebarImage} aria-hidden="true" className={classes.sidebar} />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  )
}
