import { clsx } from 'clsx'
import { ReactNode } from 'react'
import { Title, TitleOrder } from '@mantine/core'
import styles from './styles/styles.module.scss'

type THeaderProps = {
  title: string
  order?: TitleOrder
  children?: ReactNode
  actions?: ReactNode
  isDrawerHeader?: boolean
}

export const Header: React.FC<THeaderProps> = ({ children, actions, title, order = 1, isDrawerHeader = false }) => {
  return (
    <header className={clsx([styles.header, isDrawerHeader && styles.drawerHeader])}>
      <div className={styles.headerTop}>
        <Title order={order}>{title}</Title>
        <div className={styles['buttons-block']}>{actions}</div>
      </div>
      {children && <div className={styles.headerBottom}>{children}</div>}
    </header>
  )
}
