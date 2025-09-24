import clsx from 'clsx'
import { Button } from '../../button'
import styles from '../styles/popup-menu.module.scss'
import { Flex } from '@mantine/core'

type PopupMenuProps = {
  buttons: PopupMenuButton[]
  onClose: () => void
  positionX?: number
  positionY?: number
}

export type PopupMenuButton = {
  label: string
  action: (id?: number) => void
  isDeleteButton?: boolean
}

export const PopupMenu: React.FC<PopupMenuProps> = ({ buttons, onClose, positionX, positionY }) => {
  return (
    <>
      <Flex className={styles.menu} style={{ top: positionY, left: positionX }}>
        {buttons.map(button => {
          return (
            <Button
              onClick={() => button.action}
              className={clsx(styles.button, button.isDeleteButton ? styles.button_delete : '')}
            >
              {button.label}
            </Button>
          )
        })}
      </Flex>
      <div className={styles.backdrop} onClick={onClose} />
    </>
  )
}
