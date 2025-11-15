import { Group, Modal, ModalProps } from '@mantine/core'
import { IconExclamationCircleFilled, IconInfoCircleFilled } from '@tabler/icons-react'
import styles from './notification-modal.module.scss'
import clsx from 'clsx'

type NotificationModalProps = {
  type: 'error' | 'info'
  opened: boolean
  onClose: () => void
  title: string
  text?: string
  titleClassName?: string
  textClassName?: string
} & ModalProps

export const NotificationModal: React.FC<NotificationModalProps> = ({
  type,
  opened,
  onClose,
  title,
  text,
  titleClassName,
  textClassName,
  ...modalProps
}) => {
  const withText = text ? true : false
  return (
    <Modal
      opened={opened}
      withinPortal
      onClose={onClose}
      title={
        <Group gap="xs" align="center" wrap="nowrap">
          {type === 'error' ? (
            <IconExclamationCircleFilled size={40} color="red" style={{ flex: 'none' }} />
          ) : (
            <IconInfoCircleFilled size={40} color="#0085ca" style={{ flex: 'none' }} />
          )}
          <h3 className={clsx(styles['error-modal_title'], titleClassName)}>{title}</h3>
        </Group>
      }
      centered
      closeButtonProps={{ 'aria-label': 'Закрыть уведомление' }}
      classNames={{
        body: styles[`body-text-${withText}`]
      }}
      {...modalProps}
    >
      {withText && <p className={clsx(styles['error-modal_text'], textClassName)}>{text}</p>}
    </Modal>
  )
}
