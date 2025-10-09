import { ButtonHTMLAttributes, FC } from 'react'
import close from '../images/close.svg'
import classes from '../styles/styles.module.scss'

export const CloseButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = props => {
  return (
    <button className={classes.closeButton} {...props}>
      <img src={close} aria-hidden="true" />
    </button>
  )
}
