import clsx from 'clsx'
import styles from './text-notification.module.scss'
import { Text, TextProps } from '@mantine/core'

type TextNotificationProps = {
  variant: 'data-not-loaded' | 'no-search-result'
  classname?: string
} & TextProps

const DATA_NOT_LOADED_TEXT = 'Не удалось загрузить данные. Пожалуйста, обновите страницу или повторите попытку позже.'

const NO_SEARCH_RESULT_TEXT = 'По вашему запросу ничего не найдено. Попробуйте изменить параметры поиска.'

export const TextNotification: React.FC<TextNotificationProps> = props => {
  const messageText = props.variant === 'data-not-loaded' ? DATA_NOT_LOADED_TEXT : NO_SEARCH_RESULT_TEXT
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
