import { ButtonHTMLAttributes, FC } from 'react'
import moreButtons from '../images/more-buttons.svg'
import classes from '../styles/styles.module.scss'

export const MoreButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = props => {
  return (
    <button className={classes.moreButtons} {...props}>
      <img src={moreButtons} aria-hidden="true" />
    </button>
  )
}
