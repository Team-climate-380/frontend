import { SyntheticEvent } from 'react'
import { DeleteButton } from '@shared/ui/delete-button/index'

export interface SurveyDeleteIconProps {
  isAddedToDelete: boolean
  handleClick: (e: SyntheticEvent) => void
}

export const SurveyDeleteIcon: React.FC<SurveyDeleteIconProps> = ({ isAddedToDelete, handleClick }) => {
  if (isAddedToDelete)
    return (
      <>
        <DeleteButton
          styles={{
            root: {
              gridRow: '1/3',
              gridColumn: '2/3',
              backgroundColor: 'inherit'
            }
          }}
          itemLabel={'опроса'}
          onClick={handleClick}
        />
      </>
    )

  return null
}
