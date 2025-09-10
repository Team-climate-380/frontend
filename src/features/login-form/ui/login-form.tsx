import { Button } from '@/shared/ui/button'
import { Flex, Group } from '@mantine/core'
import { FC } from 'react'
import { Input } from '@/shared/ui/input'
import { Checkbox } from '@/shared/ui/checkbox'
import { PasswordInput } from '@/shared/ui/password-input'
import { useFormData } from '../model/use-login-form'

export interface InitialFormData {
  email: string
  password: string
  rememberMy: boolean
}

interface LoginFormProps {
  onRestorePassword: () => void
  initialValues?: InitialFormData
}

export const LoginForm: FC<LoginFormProps> = ({ onRestorePassword, initialValues }) => {
  const formData = useFormData(initialValues)
  return (
    <form onSubmit={formData.onSubmit(data => console.log(data))}>
      <Flex direction="column" gap="36px" w="258px">
        <Flex direction="column" gap="26px">
          <Flex direction="column" gap="20px">
            <Input label="Почта" variant="secondary" key={formData.key('email')} {...formData.getInputProps('email')} />
            <PasswordInput
              label="Пароль"
              variant="secondary"
              key={formData.key('password')}
              {...formData.getInputProps('password')}
            />
          </Flex>
          <Checkbox label="Запомнить" {...formData.getInputProps('rememberMy', { type: 'checkbox' })} />
        </Flex>

        <Group justify="space-between">
          <Button type="submit" disabled={!formData.isValid} size="md">
            Войти
          </Button>
          <Button onClick={onRestorePassword} variant="ghost" size="md">
            Восстановить пароль
          </Button>
        </Group>
      </Flex>
    </form>
  )
}
