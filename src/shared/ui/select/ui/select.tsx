import { useState } from 'react'
import { Select, SelectProps } from '@mantine/core'
import { DropdownIcon } from '@shared/ui/dropdown-icon'

export const SelectWithDropdownIcon: React.FC<SelectProps> = props => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)

  return (
    <Select
      rightSection={<DropdownIcon isOpenDropdown={isOpenDropdown} />}
      withCheckIcon={false}
      onDropdownOpen={() => setIsOpenDropdown(true)}
      onDropdownClose={() => setIsOpenDropdown(false)}
      allowDeselect={false}
      {...props}
    />
  )
}
