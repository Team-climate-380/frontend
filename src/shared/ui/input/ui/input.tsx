import { TextInput, TextInputProps } from '@mantine/core'
import { FC } from 'react'
import clsx from 'clsx'
import classes from '../styles/styles.module.scss'

interface InputProps extends TextInputProps {
  variant?: 'primary' | 'secondary'
}

export const Input: FC<InputProps> = ({ className, variant = 'primary', ...props }) => {
  return (
    <TextInput
      {...props}
      classNames={{
        input: clsx([className, classes.input, classes[variant]]),
        label: classes.label
      }}
    />
  )
}
