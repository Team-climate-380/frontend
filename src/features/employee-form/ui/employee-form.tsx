import { Flex } from '@mantine/core'
import { clsx } from 'clsx'
import { ICreateEditFormProps } from '@entities/create-edit-form-types.ts'
import { Input } from '@shared/ui/input/index.ts'
import {
  useCreateEmployeeEditForm,
  TEmployeeForm,
  departmentsNames
} from '@entities/employees/forms/use-create-employee-edit-form.ts'
import { SubmitButton } from '@shared/ui/submit-button'
import { Dropdown } from '@shared/ui/dropdown'
import classes from './employee-form.module.scss'
import { addEmployee, changeEmployee } from '@/entities/employees/api/api-employees'
import { UseFormReturnType } from '@mantine/form'
import { useClickOutside } from '@mantine/hooks'

export type EmployeeFormProps = ICreateEditFormProps & {
  employeeFormData?: TEmployeeForm
  onSubmit?: () => void
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({
  isOpen,
  isCreateForm,
  closeForm,
  employeeFormData,
  onSubmit
}) => {
  const employeeForm = useCreateEmployeeEditForm(employeeFormData)
  const formRef = useClickOutside(() => {
    if (isOpen) {
      closeForm()
      employeeForm.reset()
    }
  })

  const getChangedFields = (
    form: UseFormReturnType<TEmployeeForm>,
    data: Omit<TEmployeeForm, 'id'>
  ): Partial<TEmployeeForm> => {
    const fields: (keyof Omit<TEmployeeForm, 'id'>)[] = ['full_name', 'department_name', 'email', 'tg_username']
    const changedData: Partial<TEmployeeForm> = {}

    fields.forEach(field => {
      if (form.isDirty(field)) {
        changedData[field] = data[field]
      }
    })
    return changedData
  }

  const handleSubmit = async (data: TEmployeeForm) => {
    if (!employeeForm.isDirty()) {
      closeForm()
      return
    }
    const changedData = { ...getChangedFields(employeeForm, data), email: data.email }
    try {
      if (isCreateForm) {
        await addEmployee(data)
      } else if (data.id) {
        await changeEmployee(changedData, Number(data.id))
      }

      closeForm()
      employeeForm.reset()
      onSubmit?.()
    } catch (error) {
      const action = isCreateForm ? 'добавлении' : 'изменении данных'
      console.error(`Ошибка при ${action} сотрудника:`, error)
    }
  }

  return isOpen ? (
    <form
      onSubmit={employeeForm.onSubmit(handleSubmit)}
      className={isCreateForm ? classes.formForNewEmployee : ''}
      ref={formRef}
    >
      <Flex className={classes.container}>
        <Input
          variant={'secondary'}
          styles={{
            root: { '--mantine-scale': '0.83' }
          }}
          aria-label="Имя и фамилия сотрудника"
          placeholder="Имя Фамилия"
          key={employeeForm.key('full_name')}
          {...employeeForm.getInputProps('full_name')}
        />
        <Dropdown
          styles={{
            root: { '--mantine-scale': '0.945' },
            input: { backgroundColor: 'var(--mantine-color-black-1)', border: 'var(--mantine-color-black-1)' }
          }}
          aria-label="Отдел"
          data={departmentsNames}
          key={employeeForm.key('department_name')}
          {...employeeForm.getInputProps('department_name')}
        />
        <Input
          variant={'secondary'}
          styles={{
            root: { '--mantine-scale': '0.83' }
          }}
          aria-label="Почта"
          placeholder="mail@mail.ru"
          key={employeeForm.key('email')}
          {...employeeForm.getInputProps('email')}
        />
        <Input
          variant={'secondary'}
          styles={{
            root: { '--mantine-scale': '0.83' }
          }}
          aria-label="Имя пользователя телеграм"
          placeholder="@telegram"
          className={clsx({
            [classes.inputForNewEmployee]: isCreateForm,
            [classes.inputForEditEmployee]: isCreateForm === false
          })}
          key={employeeForm.key('tg_username')}
          {...employeeForm.getInputProps('tg_username')}
        />
        <SubmitButton />
      </Flex>
    </form>
  ) : null
}
