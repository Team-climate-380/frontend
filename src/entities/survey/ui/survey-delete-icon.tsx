import { SyntheticEvent } from 'react'
import { ActionIcon } from '@mantine/core'
import { DeleteIcon } from '@shared/ui/icons/delete-icon'

export interface SurveyDeleteIconProps {
  isAddedToDelete: boolean
  handleClick: (e: SyntheticEvent) => void
}

export const SurveyDeleteIcon: React.FC<SurveyDeleteIconProps> = ({ isAddedToDelete, handleClick }) => {
  if (isAddedToDelete)
    return (
      <>
        <ActionIcon
          aria-label="Отменить удаление опроса"
          onClick={e => handleClick(e)}
          styles={{
            root: {
              gridRow: '1/3',
              gridColumn: '2/3',
              backgroundColor: 'inherit'
            }
          }}
        >
          <DeleteIcon />
        </ActionIcon>
      </>
    )
  return null
}
