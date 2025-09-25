import { ReactNode } from 'react'
import styles from './styles/styles.module.scss'

type THeaderProps = {
  title: string
  children?: ReactNode
  actions?: ReactNode
} & React.HTMLAttributes<HTMLHeadingElement>

export const Header: React.FC<THeaderProps> = ({ children, actions, title, ...otherProps }) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <h1 {...otherProps}>{title}</h1>
        <div className={styles['buttons-block']}>{actions}</div>
      </div>
      {children && <div className={styles.headerBottom}>{children}</div>}
    </header>
  )
}
