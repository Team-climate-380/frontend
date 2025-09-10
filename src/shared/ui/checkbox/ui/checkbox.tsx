import { Checkbox as MantineCheckbox, CheckboxProps } from '@mantine/core'
import React from 'react'
import classes from '../styles/styles.module.scss'

export const Checkbox: React.FC<CheckboxProps> = props => {
  return (
    <MantineCheckbox
      {...props}
      classNames={{
        input: classes.input,
        label: classes.label
      }}
    />
  )
}
