import { Button } from '@/shared/ui/button'
import { Flex, Group } from '@mantine/core'
import { useForm } from '@mantine/form'
import { FC } from 'react'
import { Input } from '@/shared/ui/input'
import { Checkbox } from '@/shared/ui/checkbox'
import { PasswordInput } from '@/shared/ui/password-input'

interface LoginFormProps {
  onRestorePassword: () => void
  initialValues?: {
    email: string
    password: string
    rememberMy: boolean
  }
}

export const LoginForm: FC<LoginFormProps> = ({ onRestorePassword, initialValues }) => {
  const form = useForm({
    mode: 'controlled',
    initialValues: initialValues ?? {
      email: '',
      password: '',
      rememberMy: false
    },
    validate: {
      password: value => {
        if (!value) {
          return 'Пароль не может быть пустым'
        }
        if (value.length < 8) {
          return 'Пароль должен быть не менее 8 символов'
        }
        if (/^\d+$/.test(value)) {
          return 'Пароль не должен состоять только из цифр'
        }
        return null
      }
    },
    validateInputOnChange: true
  })
  return (
    <form onSubmit={form.onSubmit(data => console.log(data))}>
      <Flex direction="column" gap="36px" w="258px">
        <Flex direction="column" gap="26px">
          <Flex direction="column" gap="20px">
            <Input label="Почта" variant="secondary" key={form.key('email')} {...form.getInputProps('email')} />
            <PasswordInput
              label="Пароль"
              variant="secondary"
              key={form.key('password')}
              {...form.getInputProps('password')}
            />
          </Flex>
          <Checkbox label="Запомнить" {...form.getInputProps('rememberMy', { type: 'checkbox' })} />
        </Flex>

        <Group justify="space-between">
          <Button type="submit" disabled={!form.isValid} size="md">
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
