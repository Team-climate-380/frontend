import clsx from 'clsx'
import classes from '../styles/styles.module.scss'
import { Menu } from '@mantine/core'
import { DropdownMenuProps } from '../types/types'

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ items, children, position, offset, classname }) => {
  return (
    <Menu width={296} withinPortal={false} position={position} offset={offset}>
      <Menu.Target>{children}</Menu.Target>
      <Menu.Dropdown className={clsx(classes.menu, classname)}>
        {items.map((item, index) => {
          const label = !(item.type === 'divider') ? item.label[0].toUpperCase() + item.label.slice(1) : ''
          return (
            <div key={label ? label : index}>
              {item.type === 'action' && (
                <Menu.Item
                  onClick={item.action}
                  className={clsx(classes.button, { [classes.button_important]: item.important })}
                >
                  {label}
                </Menu.Item>
              )}
              {item.type === 'link' && (
                <Menu.Item
                  component="a"
                  href={item.url}
                  className={clsx(classes.button, { [classes.button_important]: item.important })}
                >
                  {label}
                </Menu.Item>
              )}
              {item.type === 'divider' && <Menu.Divider className={(classes.divider, classes.divider_dropdown)} />}
            </div>
          )
        })}
      </Menu.Dropdown>
    </Menu>
  )
}
