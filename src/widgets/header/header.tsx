import { ReactNode } from 'react'
import { Title } from '@mantine/core'

import styles from './styles/styles.module.scss'

type THeaderProps = {
  title: string
  order?: number
  children?: ReactNode
  actions?: ReactNode
}

export const Header: React.FC<THeaderProps> = ({ children, actions, title, order = 1 }) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        {/* <h1 className={styles.header_title}>{title}</h1>
         */}
        <Title order={order}>{title}</Title>
        <div className={styles['buttons-block']}>{actions}</div>
      </div>
      {children && <div className={styles.headerBottom}>{children}</div>}
    </header>
  )
}
