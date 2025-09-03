import { Anchor, Flex, List, Text, Title } from '@mantine/core'
import style from './not-found.module.scss'

const NotFound: React.FC = () => {
  return (
    <Flex mih={431} direction="column" wrap="nowrap" className={style.notFound} justify="space-between">
      <Flex direction="column" gap="50px">
        <Flex
          className={style.notFound_header}
          gap="md"
          justify="flex-start"
          align="center"
          direction="row"
          wrap="nowrap"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="none">
            <path
              fill="#000"
              d="M21.098 33.499A16.953 16.953 0 0 1 17 34c-2.68 0-5.215-.624-7.47-1.735l3.986-10.322 2.115-1.267 5.467 12.823ZM32.734 10.433A17.115 17.115 0 0 1 34 16.91a17.09 17.09 0 0 1-6.647 13.553l-5.708-13.39 11.09-6.641ZM3.84 27.728A17.073 17.073 0 0 1 0 16.91C0 8.31 6.319 1.197 14.544 0L3.839 27.728ZM21.79.51a16.963 16.963 0 0 1 7.048 4.138l-11.245 6.734L21.79.51Z"
            />
          </svg>
          <Title order={1}>404</Title>
        </Flex>
        <Flex className={style.notFound_message} direction="column" wrap="nowrap" c="#06121E">
          <Text fw={700} c="#06121E">
            Страница не найдена
          </Text>
          <List>
            <List.Item>или неправильный адрес,</List.Item>
            <List.Item>или страница удалена.</List.Item>
          </List>
        </Flex>
      </Flex>
      <Anchor href="/" underline="always" className={style.notFound_back_link}>
        На главный экран →
      </Anchor>
    </Flex>
  )
}

export default NotFound
