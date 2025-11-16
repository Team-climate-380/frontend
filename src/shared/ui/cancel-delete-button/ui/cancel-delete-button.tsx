import { clsx } from 'clsx'
import { SyntheticEvent } from 'react'
import { ActionIcon, Tooltip, ActionIconProps } from '@mantine/core'
import { CancelDeleteIcon } from '../images/cancel-delete-icon'
import style from './style.module.css'

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
          onClick={(e: SyntheticEvent) => {
            e.stopPropagation()
            onClick(e)
          }}
          className={clsx([className, style])}
          styles={styles}
        >
          <CancelDeleteIcon />
        </ActionIcon>
      </Tooltip>
    </>
  )
}
