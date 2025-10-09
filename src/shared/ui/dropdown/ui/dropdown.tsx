import { useState } from 'react'
import { Select, SelectProps } from '@mantine/core'
import ChevronDown from '../images/ChevronDown.svg'
import classes from './dropdown.module.scss'

export interface IDropdown extends Partial<SelectProps> {
  className?: string
}

export const Dropdown: React.FC<IDropdown> = ({ className, ...props }) => {
  const [openedDropdown, setOpenedDropdown] = useState(false)

  return (
    <Select
      rightSection={
        <img
          src={ChevronDown}
          aria-hidden={true}
          style={{
            blockSize: 16,
            inlineSize: 14,
            transition: 'transform 150ms ease',
            transform: openedDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
            pointerEvents: 'none'
          }}
        />
      }
      className={`${classes.select} ${className}`}
      withCheckIcon={false}
      onDropdownOpen={() => setOpenedDropdown(true)}
      onDropdownClose={() => setOpenedDropdown(false)}
      allowDeselect={false}
      {...props}
    />
  )
}
