import { TextInput } from '@mantine/core'
import { useCreateEditFormGroup, ValuesFormGroups } from '../use-create-edit-form-group'
import styles from '../styles/group-form.module.scss'
import check from '../images/Check.svg'
import { RefObject } from 'react'

type GroupFormProps = Partial<ValuesFormGroups> & {
  onSubmit: (values: Partial<ValuesFormGroups>) => void
  formRef?: RefObject<HTMLFormElement>
}

export const GroupForm: React.FC<GroupFormProps> = ({ name, onSubmit, formRef }) => {
  const form = useCreateEditFormGroup({ name })
  return (
    <form className={styles.form} onSubmit={form.onSubmit(values => onSubmit(values))} ref={formRef}>
      <TextInput
        key={form.key('name')}
        {...form.getInputProps('name')}
        className={styles.input}
        maxLength={254}
        autoFocus
        aria-label="Название группы"
      />
      <button type="submit" className={styles.button} aria-label="Cохранить">
        <img src={check}></img>
      </button>
    </form>
  )
}
