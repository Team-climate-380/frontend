import { Suspense, ReactNode } from 'react'
import { Outlet } from 'react-router'
import { Loader } from '@shared/ui/loader'
import { AppShell } from '@mantine/core'
import classes from './dashboard-layout.module.css'
import sidebarImage from './images/sidebarImage.svg'
import logo from './images/logo.svg'
import { Menu } from '@/widgets/menu/ui/menu'

const linksInfo = [
  {
    id: '1',
    name: 'Опросы',
    link: '',
    children: [
      { id: '41', name: 'тест', queryParam: 'marketing' },
      { id: '42', name: 'тест', queryParam: 'sales' },
      { id: '43', name: 'тест', queryParam: 'dev' }
    ]
  },
  {
    id: '2',
    name: 'Люди',
    link: ''
  },
  {
    id: '3',
    name: 'Команды',
    link: '',
    children: [
      { id: '21', name: 'Бухгалтерия', queryParam: 'marketing' },
      { id: '22', name: 'Продажи', queryParam: 'sales' },
      { id: '23', name: 'Разработка', queryParam: 'dev' }
    ]
  },
  {
    id: '4',
    name: 'Вопросы',
    link: ''
  }
]

interface DashboardLayoutProps {
  contentSidebar?: ReactNode
}

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
        <Menu linksInfo={linksInfo} />
        {/* {contentSidebar} */}
      </AppShell>
      <img src={sidebarImage} aria-hidden="true" className={classes.sidebar} />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  )
}
