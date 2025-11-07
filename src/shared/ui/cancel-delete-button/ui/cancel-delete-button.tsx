import { SyntheticEvent } from 'react'
import { ActionIcon, Tooltip, ActionIconProps } from '@mantine/core'
import { CancelDeleteIcon } from '../images/cancel-delete-icon'

export interface CancelDeleteButtonProps {
  itemLabel: string
  onClick: (e: SyntheticEvent) => void
  className?: string
  styles?: ActionIconProps['styles']
}

export const CancelDeleteButton: React.FC<CancelDeleteButtonProps> = ({ className, itemLabel, onClick, styles }) => {
  return (
    <>
      <Tooltip label={`Отменить удаление ${itemLabel}`}>
        <ActionIcon
          aria-label={`Отменить удаление ${itemLabel}`}
          onClick={onClick}
          className={className}
          styles={styles}
        >
          <CancelDeleteIcon />
        </ActionIcon>
      </Tooltip>
    </>
  )
}
