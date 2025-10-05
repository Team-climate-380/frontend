import { ActionIcon } from '@mantine/core'
import Check from '../images/CheckIcon.svg'
import classes from './submit-button.module.scss'

export interface ISubmitButton {
  className?: string
}

export const SubmitButton: React.FC<ISubmitButton> = ({ className }) => {
  return (
    <ActionIcon className={`${classes.iconCheck} ${className}`} variant="default" aria-label="Сохранить" type="submit">
      <img src={Check} />
    </ActionIcon>
  )
}
