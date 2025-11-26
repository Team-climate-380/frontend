import { ButtonProps as MantineButtonProps } from '@mantine/core'
import { Button as MantineButton } from '@mantine/core'
import classes from '../styles/styles.module.scss'
import clsx from 'clsx'

type ButtonProps = { variant?: 'ghost' | 'primary'; size?: 'md' | 'lg' } & MantineButtonProps &
  React.ComponentPropsWithoutRef<'button'>
export const Button: React.FC<ButtonProps> = props => {
  const { className, children, variant = 'primary', size = 'lg', ...otherProps } = props
  return (
    <MantineButton data-variant={variant} data-size={size} className={clsx(classes.root, className)} {...otherProps}>
      {children}
    </MantineButton>
  )
}
