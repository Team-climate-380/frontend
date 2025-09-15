import { Drawer, ScrollArea, useMantineTheme } from '@mantine/core'
import { ReactNode } from 'react'
import React from 'react'
import classes from '../styles/styles.module.scss'
import { CloseIcon } from './close'

interface QuestionsDrawerProps {
  opened: boolean
  onClose: () => void
  content: ReactNode
  header: ReactNode
}

export const RightPanel: React.FC<QuestionsDrawerProps> = ({ opened, onClose, content, header }) => {
  const theme = useMantineTheme()
  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title={<div className={classes.wrapper}>{header}</div>}
      position="right"
      size="37%"
      offset={8}
      radius={8}
      scrollAreaComponent={ScrollArea.Autosize}
      overlayProps={{ backgroundOpacity: 0 }}
      closeButtonProps={{
        icon: <CloseIcon />
      }}
      styles={{
        close: {
          top: 13,
          right: 13,
          position: 'absolute',
          padding: 0
        },
        header: {
          backgroundColor: theme.colors.black[1],
          padding: 18,
          flex: '0 0 auto'
        }
      }}
    >
      {content}
    </Drawer>
  )
}
