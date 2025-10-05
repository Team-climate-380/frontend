import { Flex } from '@mantine/core'
import { ICreateEditFormProps } from '@entities/create-edit-form-types.ts'
import { Input } from '@shared/ui/input/index.ts'
import { useCreateEmployeeEditForm, TEmployeeForm } from '@entities/employees/forms/use-create-employee-edit-form.ts'
import { SubmitButton } from '@shared/ui/submit-button'
import { Dropdown } from '@shared/ui/dropdown'
import classes from './employee-form.module.scss'

// TODO: заменить на данные с бэка
const getDepartments = ['HR', 'Бухгалтерия']

export type EmployeeFormProps = ICreateEditFormProps & {
  formData?: TEmployeeForm
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({ isOpen, isCreateForm, closeForm, formData }) => {
  const employeeForm = useCreateEmployeeEditForm(formData)

  const handleSubmit = (data: TEmployeeForm) => {
    console.log(data)
    closeForm()
  }

  return isOpen ? (
    <form
      onSubmit={employeeForm.onSubmit(handleSubmit)}
      className={isCreateForm ? classes.formForNewEmployee : classes.formForEditEmployee}
    >
      <Flex className={classes.container}>
        <Input
          variant={'secondary'}
          styles={{
            root: { '--mantine-scale': '0.83' }
          }}
          aria-label="Имя сотрудника"
          placeholder="Имя"
          error={employeeForm.isValid('name') ?? <div className={classes.errorContainer} />}
          className={classes.textInput}
          key={employeeForm.key('name')}
          {...employeeForm.getInputProps('name')}
        />
        <Dropdown
          styles={{
            root: { '--mantine-scale': '0.945' },
            input: { backgroundColor: 'var(--mantine-color-black-1)', border: 'var(--mantine-color-black-1)' }
          }}
          aria-label="Отдел"
          data={getDepartments}
          defaultValue={'HR'}
          key={employeeForm.key('department')}
          {...employeeForm.getInputProps('department')}
        />
        <Input
          variant={'secondary'}
          styles={{
            root: { '--mantine-scale': '0.83' }
          }}
          aria-label="Почта"
          placeholder="mail@mail.ru"
          error={employeeForm.isValid('email') ?? <div className={classes.errorContainer} />}
          className={classes.textInput}
          key={employeeForm.key('email')}
          {...employeeForm.getInputProps('email')}
        />
        <Input
          variant={'secondary'}
          styles={{
            root: { '--mantine-scale': '0.83' }
          }}
          aria-label="Телеграм id"
          placeholder="@telegram"
          error={employeeForm.isValid('telegram_id') ?? <div className={classes.errorContainer} />}
          className={classes.textInput}
          key={employeeForm.key('telegram_id')}
          {...employeeForm.getInputProps('telegram_id')}
        />
        <SubmitButton className={classes.employeeFormSubmit} />
      </Flex>
    </form>
  ) : null
}
