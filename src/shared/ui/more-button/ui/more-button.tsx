import { ButtonHTMLAttributes, FC } from 'react'
import moreButtons from '../images/more-buttons.svg'
import styles from '../styles/styles.module.css'
import clsx from 'clsx'

export interface MoreButtonProps {
  className?: string
}

export const MoreButton: FC<ButtonHTMLAttributes<HTMLButtonElement> & MoreButtonProps> = props => {
  const { className, ...restProps } = props
  return (
    <button className={clsx([styles.moreButtons, className])} {...restProps}>
      <img src={moreButtons} aria-hidden="true" />
    </button>
  )
}
