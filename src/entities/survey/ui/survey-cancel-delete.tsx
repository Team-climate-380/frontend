import { SyntheticEvent } from 'react'
import { CancelDeleteButton } from '@shared/ui/cancel-delete-button/index'

export interface SurveyCancelDeleteProps {
  isAddedToDelete: boolean
  handleClick: (e: SyntheticEvent) => void
}

export const SurveyCancelDelete: React.FC<SurveyCancelDeleteProps> = ({ isAddedToDelete, handleClick }) => {
  if (isAddedToDelete)
    return (
      <>
        <CancelDeleteButton
          styles={{
            root: {
              gridRow: '1/3',
              gridColumn: '2/3',
              backgroundColor: 'inherit'
            }
          }}
          itemLabel={'опроса'}
          onClick={(e: SyntheticEvent) => {
            e.stopPropagation()
            handleClick(e)
          }}
        />
      </>
    )

  return null
}
