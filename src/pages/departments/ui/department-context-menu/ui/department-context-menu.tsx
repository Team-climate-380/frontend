import { Button } from '@/shared/ui/button'
import styles from '../styles/styles.module.scss'
import { Flex } from '@mantine/core'
import clsx from 'clsx'

type DepartmentContextMenuProps = {
  id: number
  onEditClick: (id: number) => void
  onDeleteClick: (id: number) => void
  onClose: () => void
  positionX: number
  positionY: number
}

export const DepartmentContextMenu: React.FC<DepartmentContextMenuProps> = ({
  id,
  onEditClick,
  onDeleteClick,
  onClose,
  positionX,
  positionY
}) => {
  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <Flex className={styles.menu} style={{ top: positionY, left: positionX }}>
        <Button onClick={() => onEditClick(id)} className={styles['menu-button']}>
          Переименовать
        </Button>
        <Button onClick={() => onDeleteClick(id)} className={clsx(styles['menu-button'], styles['menu-button_delete'])}>
          Удалить
        </Button>
      </Flex>
    </>
  )
}
