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
import { MultySelect } from '@shared/ui/multy-select'
import classes from './employee-form.module.scss'

export type EmployeeFormProps = ICreateEditFormProps & {
  employeeFormData?: TEmployeeForm
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({ isOpen, isCreateForm, closeForm, employeeFormData }) => {
  const employeeForm = useCreateEmployeeEditForm(employeeFormData)

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
          aria-label="Имя и фамилия сотрудника"
          placeholder="Имя Фамилия"
          key={employeeForm.key('name')}
          {...employeeForm.getInputProps('name')}
        />
        <MultySelect
          styles={{
            root: { '--mantine-scale': '0.945' },
            input: {
              backgroundColor: 'var(--mantine-color-black-1)',
              border: 'var(--mantine-color-black-1)',
              minWidth: '196px'
            }
          }}
          aria-label="Отдел"
          data={departmentsNames}
          maxDropdownHeight={200}
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
          key={employeeForm.key('tgUsername')}
          {...employeeForm.getInputProps('tgUsername')}
        />
        <SubmitButton className={classes.employeeFormSubmit} />
      </Flex>
    </form>
  ) : null
}
