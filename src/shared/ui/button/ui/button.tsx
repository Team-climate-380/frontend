import { ButtonProps as MantineButtonProps } from '@mantine/core'
import { Button as MantineButton } from '@mantine/core'
import classes from '../styles/styles.module.scss'
import clsx from 'clsx'

type ButtonProps = { variant?: 'ghost' | 'primary'; size?: 'md' | 'lg' } & MantineButtonProps &
  React.ComponentPropsWithoutRef<'button'>
export const Button: React.FC<ButtonProps> = props => {
  const { className, children, variant = 'primary', size = 'lg', ...otherProps } = props
  return (
    <MantineButton className={clsx(classes.button, classes[variant], classes[size], className)} {...otherProps}>
      {children}
    </MantineButton>
  )
}
