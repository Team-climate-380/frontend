import { FC, useState } from 'react'
import { MultiSelect, MultiSelectProps } from '@mantine/core'
import { DropdownIcon } from '@shared/ui/dropdown-icon'
import classes from '../styles/styles.module.scss'

export const MultySelect: FC<MultiSelectProps> = props => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)

  return (
    <>
      <MultiSelect
        {...props}
        rightSection={<DropdownIcon isOpenDropdown={isOpenDropdown} />}
        onDropdownOpen={() => setIsOpenDropdown(true)}
        onDropdownClose={() => setIsOpenDropdown(false)}
        classNames={{ input: classes.input, label: classes.label, pill: classes.pill }}
      />
    </>
  )
}
