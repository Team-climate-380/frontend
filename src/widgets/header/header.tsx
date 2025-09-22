import { ReactNode } from 'react'
import styles from './styles/styles.module.scss'

type THeaderProps = {
  title: string
  children?: ReactNode
  actions?: ReactNode
}

export const Header: React.FC<THeaderProps> = ({ children, actions, title }) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <h1>{title}</h1>
        <div className={styles['buttons-block']}>{actions}</div>
      </div>
      {children && <div className={styles.headerBottom}>{children}</div>}
    </header>
  )
}
