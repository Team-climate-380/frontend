import ChevronDown from '../images/ChevronDown.svg'

export interface DropdownIconProps {
  isOpenDropdown: boolean
}

export const DropdownIcon: React.FC<DropdownIconProps> = ({ isOpenDropdown }) => {
  return (
    <img
      src={ChevronDown}
      aria-hidden={true}
      style={{
        blockSize: 16,
        inlineSize: 14,
        transition: 'transform 150ms ease',
        transform: isOpenDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
        pointerEvents: 'none'
      }}
    />
  )
}
