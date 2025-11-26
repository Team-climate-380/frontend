import { Drawer, ScrollArea } from '@mantine/core'
import { ReactNode } from 'react'
import React from 'react'

interface QuestionsDrawerProps {
  opened: boolean
  onClose: () => void
  content: ReactNode
  header: ReactNode
}

export const RightPanel: React.FC<QuestionsDrawerProps> = ({ opened, onClose, content, header }) => {
  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      position="right"
      size="37%"
      offset={16}
      radius={8}
      scrollAreaComponent={ScrollArea.Autosize}
      overlayProps={{ backgroundOpacity: 0 }}
      withCloseButton={false}
      styles={{
        body: {
          padding: 0
        }
      }}
    >
      {header}
      {content}
    </Drawer>
  )
}
