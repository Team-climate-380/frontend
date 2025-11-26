import clsx from 'clsx'
import { ButtonHTMLAttributes, FC } from 'react'
import close from '../images/close.svg'
import classes from '../styles/styles.module.scss'

export interface CloseButtonProps {
  className?: string
}

export const CloseButton: FC<ButtonHTMLAttributes<HTMLButtonElement> & CloseButtonProps> = props => {
  return (
    <button className={clsx([classes.closeButton, props.className])} {...props}>
      <img src={close} aria-hidden="true" />
    </button>
  )
}
