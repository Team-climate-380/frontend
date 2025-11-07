import { Accordion, List } from '@mantine/core'
import styles from '../styles/department-list-item.module.scss'
import { SyntheticEvent } from 'react'
import { DepartmentInfo } from '@/entities/groups/types/department-types'
import clsx from 'clsx'
import { CancelDeleteButton } from '../../cancel-delete-button'

export const DepartmentListItem: React.FC<
  DepartmentInfo & { onContextMenu: (e: SyntheticEvent, id: number) => void; handleCancelDelete: () => void }
> = ({ id, department_name, to_delete, employees_count, employees, onContextMenu, handleCancelDelete }) => {
  const hasEmployees = employees_count > 0
  return (
    <Accordion key={id} multiple chevronSize="0" className={styles.container}>
      <Accordion.Item value={department_name} style={{ border: 'none' }}>
        <Accordion.Control
          onContextMenu={e => onContextMenu(e, id)}
          disabled={!hasEmployees}
          className={styles['group-button']}
        >
          <span className={clsx(styles['group-name'], styles[`group-name_to-delete_${to_delete}`])}>
            {department_name}
          </span>
          <span className={styles['group-count']}>{employees_count}</span>
        </Accordion.Control>
        {hasEmployees ? (
          <Accordion.Panel className={styles['group-content']}>
            <List className={styles['employees-list']}>
              {employees?.map(employee => {
                return (
                  <List.Item
                    key={employee.id}
                    className={clsx(styles['employees-list-item'], styles[`to-delete_${to_delete}`])}
                  >
                    {employee.full_name}
                  </List.Item>
                )
              })}
            </List>
          </Accordion.Panel>
        ) : (
          ''
        )}
      </Accordion.Item>
      {to_delete && (
        <CancelDeleteButton
          onClick={handleCancelDelete}
          itemLabel="группы"
          styles={{
            root: {
              backgroundColor: 'inherit'
            }
          }}
        />
      )}
    </Accordion>
  )
}
