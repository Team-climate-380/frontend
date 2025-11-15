import clsx from 'clsx'
import styles from './text-notification.module.scss'
import { Text, TextProps } from '@mantine/core'

type TextNotificationProps =
  | ({
      variant: 'data_not_loaded' | 'no_search_result'
      classname?: string
    } & TextProps)
  | ({
      variant: 'custom'
      customMessage: string
      classname?: string
    } & TextProps)

const NOTIFICATION_TEXTS = {
  data_not_loaded: 'Не удалось загрузить данные. Пожалуйста, обновите страницу или повторите попытку позже.',
  no_search_result: 'По вашему запросу ничего не найдено. Попробуйте изменить параметры поиска.'
}

export const TextNotification: React.FC<TextNotificationProps> = props => {
  const messageText = props.variant === 'custom' ? props.customMessage : NOTIFICATION_TEXTS[props.variant]
  return (
    <Text
      classNames={{
        root: clsx(styles.message_text, props.classname)
      }}
    >
      {messageText}
    </Text>
  )
}
