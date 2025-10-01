import { ContextMenuProps, DropdownMenuProps } from '../types/types'
import { ContextMenu } from './context-menu'
import { DropdownMenu } from './dropdown-menu'

type PopupMenuProps = ({ type: 'dropdown' } & DropdownMenuProps) | ({ type: 'context' } & ContextMenuProps)

export const PopupMenu: React.FC<PopupMenuProps> = props => {
  return (
    <>
      {props.type === 'dropdown' && <DropdownMenu {...props} />}
      {props.type === 'context' && <ContextMenu {...props} />}
    </>
  )
}
