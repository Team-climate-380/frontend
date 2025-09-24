import { ContextMenuProps } from '../types/types'
import classes from '../styles/styles.module.scss'
import { Flex } from '@mantine/core'
import clsx from 'clsx'
import { Button } from '../../button/ui/button'

export const ContextMenu: React.FC<ContextMenuProps> = ({ items, onClose, positionX, positionY, classname }) => {
  return (
    <>
      <Flex className={clsx(classes.menu, classname)} style={{ top: positionY, left: positionX }}>
        {items.map((item, index) => {
          const label = !(item.type === 'divider') ? item.label[0].toUpperCase() + item.label.slice(1) : ''
          return (
            <div key={index}>
              {item.type === 'action' && (
                <Button
                  onClick={item.action}
                  className={clsx(classes.button, { [classes.button_important]: item.important })}
                >
                  {label}
                </Button>
              )}
              {item.type === 'link' && (
                <a
                  href={`${item.url}`}
                  className={clsx(classes.button, classes.menu_link, { [classes.button_important]: item.important })}
                >
                  {label}
                </a>
              )}
              {item.type === 'divider' && <hr className={classes.divider} />}
            </div>
          )
        })}
      </Flex>
      <div className={classes.backdrop} onClick={onClose} />
    </>
  )
}
