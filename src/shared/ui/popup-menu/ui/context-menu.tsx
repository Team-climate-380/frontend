import { ContextMenuProps } from '../types/types'
import classes from '../styles/styles.module.scss'
import { Flex } from '@mantine/core'
import clsx from 'clsx'
import { Button } from '../../button/ui/button'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

export const ContextMenu: React.FC<ContextMenuProps> = ({ items, onClose, positionX, positionY, classname }) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const [adjustedPosition, setAdjustedPosition] = useState({
    x: positionX || 0,
    y: positionY || 0
  })

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    const handleEscKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && onClose()

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscKeyDown)
    }
  }, [onClose])

  useLayoutEffect(() => {
    if (!menuRef.current) return

    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const menuWidth = 296
    const margin = 10

    // Учитываем скролл страницы
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft
    const scrollY = window.pageYOffset || document.documentElement.scrollTop

    const originalX = (positionX || 0) + scrollX
    const originalY = (positionY || 0) + scrollY

    const menuHeight = menuRef.current.offsetHeight

    let newX = originalX
    let newY = originalY

    // Логика для ширины
    if (originalX + menuWidth > viewportWidth + scrollX) {
      newX = originalX - menuWidth
    }
    if (newX < scrollX + margin) {
      newX = scrollX + margin
    }

    // Логика для высоты
    if (originalY + menuHeight > viewportHeight + scrollY) {
      newY = originalY - menuHeight
    }
    if (newY < scrollY + margin) {
      newY = scrollY + margin
    }
    setAdjustedPosition({ x: newX, y: newY })
  }, [positionX, positionY])
  return (
    <>
      <Flex
        ref={menuRef}
        className={clsx(classes.menu, classname)}
        style={{ top: adjustedPosition.y, left: adjustedPosition.x }}
      >
        {items.map((item, index) => {
          const label = !(item.type === 'divider') ? item.label[0].toUpperCase() + item.label.slice(1) : ''
          return (
            <div key={label ? label : index}>
              {item.type === 'action' && (
                <Button
                  onClick={e => {
                    e.stopPropagation()
                    item.action(e)
                  }}
                  className={clsx(classes.button, { [classes.button_important]: item.important })}
                  disabled={item.disabled}
                >
                  {label}
                </Button>
              )}
              {item.type === 'link' && (
                <a
                  href={`${item.url}`}
                  onClick={e => e.stopPropagation()}
                  className={clsx(classes.button, classes.menu_link, { [classes.button_important]: item.important })}
                >
                  {label}
                </a>
              )}
              {item.type === 'divider' && <hr className={classes.divider} />}
            </div>
          )
        })}
      </Flex>
    </>
  )
}
