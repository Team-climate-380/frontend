import { SyntheticEvent, useState } from 'react'

export type TContextMenu = {
  isVisible: boolean
  selectedId: null | number
  left: number
  top: number
}

export const useDepartmentContextMenu = () => {
  const initialState = {
    isVisible: false,
    selectedId: null,
    left: 350,
    top: 200
  }

  const [contextMenu, setContextMenu] = useState<TContextMenu>(initialState)

  const handleRightClick = (e: SyntheticEvent, id: number) => {
    e.preventDefault()
    const { right, top } = e.currentTarget.getBoundingClientRect()
    setContextMenu({ isVisible: true, selectedId: id, left: right, top: top })
  }

  const handleContextMenuClose = () => {
    setContextMenu({ ...contextMenu, isVisible: false, selectedId: null })
  }

  return { contextMenu, setContextMenu, handleRightClick, handleContextMenuClose }
}
