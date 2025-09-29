import { SyntheticEvent, useState } from 'react'

export type TContextMenu = {
  isVisible: boolean
  selectedId?: null | number
  left: number
  top: number
}

const initialState = {
  isVisible: false,
  selectedId: null,
  left: 0,
  top: 0
}

export const useContextMenu = (
  customInitialState: TContextMenu = initialState,
  leftShift?: number,
  topShift?: number
) => {
  const [contextMenu, setContextMenu] = useState<TContextMenu>(customInitialState)

  const handleRightClick = (e: SyntheticEvent, id?: number) => {
    e.preventDefault()
    const { left, right, top } = e.currentTarget.getBoundingClientRect()
    const leftPosition = leftShift ? left + leftShift : right
    const topPosition = topShift ? top + topShift : top
    setContextMenu({ isVisible: true, selectedId: id, left: leftPosition, top: topPosition })
  }

  const handleContextMenuClose = () => {
    setContextMenu({ ...contextMenu, isVisible: false, selectedId: null })
  }

  return { contextMenu, setContextMenu, handleRightClick, handleContextMenuClose }
}
