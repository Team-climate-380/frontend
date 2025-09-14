import { PasswordInput as MantinePasswordInput, PasswordInputProps } from '@mantine/core'
import { FC } from 'react'
import clsx from 'clsx'
import classes from '../../input/styles/styles.module.scss'

interface Props extends PasswordInputProps {
  variant?: 'primary' | 'secondary'
}

export const PasswordInput: FC<Props> = ({ className, variant = 'primary', ...props }) => {
  return (
    <MantinePasswordInput
      {...props}
      classNames={{
        input: clsx(classes.input, classes[variant], className),
        innerInput: clsx(classes.input, classes[variant]),
        label: classes.label
      }}
    />
  )
}
