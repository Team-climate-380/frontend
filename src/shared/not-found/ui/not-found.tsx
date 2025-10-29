import { Anchor, Flex, List, Text } from '@mantine/core'
import { Loader } from '@shared/ui/loader'
import style from './not-found.module.scss'
import { Suspense } from 'react'
import { routes } from '@/shared/configs/routs'
import Logo from './images/Logo.svg'
import NotFound404 from './images/NotFound404.svg'

const NotFound: React.FC = () => {
  return (
    <Suspense fallback={<Loader size={'xl'} />}>
      <Flex mih={431} direction="column" wrap="nowrap" className={style.notFound} justify="space-between">
        <Flex direction="column" gap="52px">
          <Flex className={style.notFound_header} justify="flex-start" align="center" direction="row" wrap="nowrap">
            <img src={Logo} alt="логотип" />
            <img src={NotFound404} alt="надпись 404" />
          </Flex>
          <Flex className={style.notFound_message} direction="column" wrap="nowrap" c="#06121E" gap="10px">
            <Text fw={700} c="#06121E" size="17px">
              Страница не найдена
            </Text>
            <List withPadding className={style.notFound_message_list}>
              <List.Item className={style.notFound_message_item}>
                <Text size="17px" fw={500}>
                  или неправильный адрес,
                </Text>
              </List.Item>
              <List.Item className={style.notFound_message_item}>
                <Text size="17px" fw={500}>
                  или страница удалена.
                </Text>
              </List.Item>
            </List>
          </Flex>
        </Flex>
        <Anchor href={routes.home()} underline="always" className={style.notFound_back_link} size="17px" fw={500}>
          На главный экран →
        </Anchor>
      </Flex>
    </Suspense>
  )
}

export default NotFound
