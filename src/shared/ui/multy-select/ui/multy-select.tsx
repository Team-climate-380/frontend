import { FC } from 'react'
import { MultiSelect, MultiSelectProps } from '@mantine/core'
import angle from '../images/angle.svg'
import classes from '../styles/styles.module.scss'

export const MultySelect: FC<MultiSelectProps> = props => {
  return (
    <>
      <MultiSelect
        {...props}
        rightSection={<img src={angle} width={12} height={7} />}
        classNames={{ input: classes.input, label: classes.label, pill: classes.pill }}
      />
    </>
  )
}
