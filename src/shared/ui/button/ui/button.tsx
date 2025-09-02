import { ButtonProps } from '@mantine/core'
import { Button as MantineButton } from '@mantine/core'
import classes from '../styles/styles.module.scss'
import clsx from 'clsx'

export const Button: React.FC<ButtonProps> = props => {
  const { className, children, ...otherProps } = props
  return (
    <MantineButton className={clsx(classes.button, className)} {...otherProps}>
      {children}
    </MantineButton>
  )
}
