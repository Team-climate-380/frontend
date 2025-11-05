import { NavLink } from '@mantine/core'
import styles from '../styles/menu-link.module.scss'
import clsx from 'clsx'
import { TMenuLink } from '../types/menu-link-type'
import { useQueryParams } from '@/shared/hooks/useQueryParams'
import { useNavigate } from 'react-router-dom'

export const MenuLink: React.FC<TMenuLink> = ({ id, link, name, children }: TMenuLink) => {
  const navigate = useNavigate()
  const setParams = useQueryParams().setParams
  const getParam = useQueryParams().getParam
  const isActive = window.location.pathname.includes(link)
  const onChildClick = (queryKey: string, queryValue: string) => {
    setParams({ [queryKey]: `${queryValue}` }, false)
  }
  const hasChildren = children && children.length > 1

  return (
    <NavLink
      href={link}
      label={name}
      key={id}
      childrenOffset="0"
      opened={isActive}
      className={clsx(styles.link, styles[`link_active-${isActive}`])}
      rightSection={null}
      onClick={() => navigate(link)}
    >
      {hasChildren && (
        <div className={styles.childLinksContainer}>
          {children.map(child => {
            const isActiveChild = getParam(child.queryKey) === child.queryValue
            return (
              <NavLink
                label={child.name}
                key={child.id}
                className={clsx(styles.link, styles.link_child, styles[`link_active-${isActiveChild}`])}
                onClick={() => {
                  onChildClick(child.queryKey, child.queryValue)
                }}
              />
            )
          })}
        </div>
      )}
    </NavLink>
  )
}
