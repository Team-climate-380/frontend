import { Button } from '@/shared/ui/button'
import { IconArrowLeft } from '@tabler/icons-react'
import style from './style.module.scss'
import { Input } from '@/shared/ui/input'
import { useRestorePasswordData } from '../model/use-password-recovery-form'
import { Anchor, Box, Center, Group, Paper } from '@mantine/core'

export interface InitialRestorePassword {
  email: string
}

interface PasswordRecoveryFormProps {
  onRestorePassword: () => void
  onHandleClickBack: () => void
  initialValues?: InitialRestorePassword
}

export const PasswordRecoveryForm: React.FC<PasswordRecoveryFormProps> = ({ onHandleClickBack, initialValues }) => {
  const passwordRecoveryData = useRestorePasswordData(initialValues)
  const handleRestorePassword = (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordRecoveryData.isValid()) {
      console.log('Сброс пароля')
    }
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
          <Button type="submit" className={style.control} size="md" disabled={!passwordRecoveryData.isValid()}>
            Сбросить пароль
          </Button>
        </Group>
      </Paper>
    </form>
  )
}
