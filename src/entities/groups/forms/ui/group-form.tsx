import { TextInput } from '@mantine/core'
import { useCreateEditFormGroup, ValuesFormGroups } from '../use-create-edit-form-group'
import styles from '../styles/group-form.module.scss'
import check from '../images/Check.svg'

export const GroupForm: React.FC<
  Partial<ValuesFormGroups> & { onSubmit: (values: Partial<ValuesFormGroups>) => void }
> = ({ name, onSubmit }) => {
  const form = useCreateEditFormGroup({ name })
  return (
    <form className={styles.form} onSubmit={form.onSubmit(values => onSubmit(values))}>
      <TextInput key={form.key('name')} {...form.getInputProps('name')} className={styles.input} />
      <button type="submit" className={styles.button} aria-label="сохранить">
        <img src={check}></img>
      </button>
    </form>
  )
}
