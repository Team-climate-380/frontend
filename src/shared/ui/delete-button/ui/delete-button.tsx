import { SyntheticEvent } from 'react'
import { ActionIcon, Tooltip, ActionIconProps } from '@mantine/core'
import DeleteIcon from '../images/deleteIcon.svg'

export interface DeleteButtonProps {
  itemLabel: string
  onClick: (e: SyntheticEvent) => void
  className?: string
  styles?: ActionIconProps['styles']
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ className, itemLabel, onClick, styles }) => {
  return (
    <>
      <Tooltip label={`Отменить удаление ${itemLabel}`}>
        <ActionIcon
          aria-label={`Отменить удаление ${itemLabel}`}
          onClick={onClick}
          className={className}
          styles={styles}
        >
          <DeleteIcon />
        </ActionIcon>
      </Tooltip>
    </>
  )
}
