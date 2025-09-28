import { Container, Text, Title } from '@mantine/core'
import style from './style.module.scss'
import { useNavigate } from 'react-router'
import { routes } from '@/shared/configs/routs'
import { PasswordRecoveryForm } from '@/features/password-recovery-form'

const PasswordRecovery: React.FC = () => {
  const navigate = useNavigate()
  const handleClickBack = () => {
    navigate(routes.login())
  }
  return (
    <Container size={460} my={30}>
      <Title className={style.title} ta="center">
        Забыли ваш пароль?
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        Введите адрес электронной почты, чтобы получить ссылку для сброса пароля
      </Text>
      <PasswordRecoveryForm onHandleClickBack={handleClickBack} onRestorePassword={() => {}} />
    </Container>
  )
}

export default PasswordRecovery
