import { NavLink } from '@mantine/core'
import styles from '../styles/menu-link.module.scss'
import clsx from 'clsx'
import { TMenuLink } from '../types/menu-link-type'
import { useNavigate, useSearchParams } from 'react-router'

export const MenuLink: React.FC<TMenuLink> = ({ id, link, name, children }: TMenuLink) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const isActive = window.location.pathname === link
  const onChildClick = (queryParam: string) => {
    if (!isActive) {
      navigate(link)
    }
    setSearchParams({ department: `${queryParam}` })
  }

  return (
    <NavLink
      href={link}
      label={name}
      key={id}
      childrenOffset="3"
      defaultOpened={isActive}
      className={clsx(styles.link, styles.pageLink, styles[`link_active-${isActive}`])}
      rightSection={null}
    >
      {children && (
        <div className={styles.childLinksContainer}>
          {children.map(child => {
            const isActiveChild = searchParams.get('department') === child.queryParam
            return (
              <NavLink
                label={child.name}
                key={child.id}
                className={clsx(styles.childLink, styles.link, styles[`link_active-${isActiveChild}`])}
                onClick={() => {
                  onChildClick(child.queryParam)
                }}
              />
            )
          })}
        </div>
      )}
    </NavLink>
  )
}
