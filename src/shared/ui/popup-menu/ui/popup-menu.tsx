import clsx from 'clsx'
import { Button } from '../../button'
import classes from '../styles/popup-menu.module.scss'
import { Flex } from '@mantine/core'

type PopupMenuProps = {
  buttons: PopupMenuButton[]
  onClose: () => void
  positionX?: number
  positionY?: number
  menuClassName?: string
  buttonClassName?: string
}

export type PopupMenuButton = {
  label: string
  action: () => void
  isDeleteButton?: boolean
}

export const PopupMenu: React.FC<PopupMenuProps> = ({
  buttons,
  onClose,
  positionX,
  positionY,
  menuClassName,
  buttonClassName
}) => {
  return (
    <>
      <Flex className={clsx(menuClassName, classes.menu)} style={{ top: positionY, left: positionX }}>
        {buttons.map(button => {
          return (
            <Button
              onClick={button.action}
              className={clsx(buttonClassName, classes.button, { [classes.button_delete]: button.isDeleteButton })}
            >
              {button.label}
            </Button>
          )
        })}
      </Flex>
      <div className={classes.backdrop} onClick={onClose} />
    </>
  )
}
