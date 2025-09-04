import { NavLink } from '@mantine/core'
import styles from '../styles/menu-link.module.scss'
import clsx from 'clsx'
import { TMenuLink } from '../types/menu-link-type'

export const MenuLink: React.FC<TMenuLink> = ({ id, link, name, children }: TMenuLink) => {
  const isActive = window.location.pathname === link
  const isChildrenActive = children?.some(child => child.link === window.location.pathname)

  return (
    <NavLink
      href={link}
      label={name}
      key={id}
      childrenOffset="3"
      defaultOpened={isActive || isChildrenActive}
      className={clsx(styles.link, styles.pageLink, styles[`link_active-${isActive}`])}
      rightSection={null}
    >
      {children && (
        <div className={styles.childLinksContainer}>
          {children.map(child => {
            const isActiveChild = window.location.pathname === child.link
            return (
              <NavLink
                href={child.link}
                label={child.name}
                key={child.id}
                className={clsx(styles.childLink, styles.link, styles[`link_active-${isActiveChild}`])}
              />
            )
          })}
        </div>
      )}
    </NavLink>
  )
}
