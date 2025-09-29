import { MenuProps } from '@mantine/core'

export type DropdownMenuProps = {
  items: PopupMenuItem[]
  children: React.ReactNode
  position?:
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end'
  offset?: number
  classname?: 'string'
} & MenuProps

export type ContextMenuProps = {
  items: PopupMenuItem[]
  onClose: () => void
  positionX?: number
  positionY?: number
  classname?: 'string'
}

export type PopupMenuItem =
  | {
      type: 'action'
      label: string
      important?: boolean
      action: () => void
    }
  | {
      type: 'link'
      label: string
      important?: boolean
      url: string
    }
  | {
      type: 'divider'
    }
