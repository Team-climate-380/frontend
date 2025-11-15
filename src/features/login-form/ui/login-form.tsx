import { Button } from '@/shared/ui/button'
import { Alert, Flex, Group } from '@mantine/core'
import { FC } from 'react'
import { Input } from '@/shared/ui/input'
import { Checkbox } from '@/shared/ui/checkbox'
import { PasswordInput } from '@/shared/ui/password-input'
import { useFormData } from '../model/use-login-form'
import { loginUser, useSessionState } from '@/features/session'
import { useNavigate } from 'react-router'
import { routes } from '@/shared/configs/routs'

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
  const sessionState = useSessionState()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.isValid()) {
      // TODO: не реализовано rememberMe: formData.values.rememberMy
      await loginUser({ email: formData.values.email, password: formData.values.password })
        .then(() => {
          sessionState.login(formData.values.email)
          navigate(routes.home())
        })
        .catch((error: Error) => {
          if (error.message.includes('Invalid credentials')) formData.setErrors({ form: 'Неверная почта или пароль' })
          else formData.setErrors({ form: 'Ошибка авторизации, попробуйте еще один раз' })
        })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {formData.errors.form && (
        <Alert color="red" mb={10}>
          {formData.errors.form}
        </Alert>
      )}
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
          <Button type="submit" disabled={!formData.isValid()} size="md">
            Войти
          </Button>
          <Button type="button" onClick={onRestorePassword} variant="ghost" size="md">
            Восстановить пароль
          </Button>
        </Group>
      </Flex>
    </form>
  )
}
