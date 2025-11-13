import { Button } from '@/shared/ui/button'
import { IconArrowLeft } from '@tabler/icons-react'
import style from './style.module.scss'
import { Input } from '@/shared/ui/input'
import { useRestorePasswordData, useRestorePasswordMutation } from '../model/use-password-recovery-form'
import { Anchor, Box, Center, Group, Paper, Text } from '@mantine/core'

export interface InitialRestorePassword {
  email: string
}

interface PasswordRecoveryFormProps {
  onRestorePassword: () => void
  onHandleClickBack: () => void
  initialValues?: InitialRestorePassword
}

export const PasswordRecoveryForm: React.FC<PasswordRecoveryFormProps> = ({
  onHandleClickBack,
  initialValues,
  onRestorePassword
}) => {
  const passwordRecoveryData = useRestorePasswordData(initialValues)
  const { mutateAsync, isPending, isSuccess, isError, error } = useRestorePasswordMutation()
  const handleRestorePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!passwordRecoveryData.isValid()) return

    await mutateAsync(passwordRecoveryData.values.email)
    passwordRecoveryData.reset()
    onRestorePassword()
  }
  return (
    <form onSubmit={handleRestorePassword}>
      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <Input
          variant="secondary"
          label="Почта"
          key={passwordRecoveryData.key('email')}
          {...passwordRecoveryData.getInputProps('email')}
          required
        />
        <Group justify="space-between" mt="lg" className={style.controls}>
          <Anchor c="dimmed" size="sm" className={style.control}>
            <Center inline>
              <IconArrowLeft size={12} stroke={1.5} />
              <Box ml={5} onClick={onHandleClickBack}>
                Вернуться назад
              </Box>
            </Center>
          </Anchor>
          <Button
            type="submit"
            disabled={!passwordRecoveryData.isValid() || isPending}
            className={style.control}
            size="md"
          >
            Сбросить пароль
          </Button>
        </Group>
      </Paper>
      {isError && (
        <Text size="sm" c="red">
          {' '}
          {error.message ?? 'Произошла ошибка при сбросе пароля'}
        </Text>
      )}
      {isSuccess && (
        <Text size="sm" c="green">
          Письмо для восстановления отправлено на почту
        </Text>
      )}{' '}
    </form>
  )
}
