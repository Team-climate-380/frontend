import { Accordion, List } from '@mantine/core'
import styles from '../styles/department-list-item.module.scss'
import { SyntheticEvent } from 'react'
import { DepartmentInfo } from '@/entities/groups/types/department-types'

export const DepartmentListItem: React.FC<
  DepartmentInfo & { onContextMenu: (e: SyntheticEvent, id: number) => void }
> = ({ id, department_name, employees_count, employees, onContextMenu }) => {
  const hasEmployees = employees_count > 0
  return (
    <Accordion multiple chevronSize="0">
      <Accordion.Item key={id} value={department_name} style={{ border: 'none' }}>
        <Accordion.Control
          onContextMenu={e => onContextMenu(e, id)}
          disabled={!hasEmployees}
          className={styles['group-button']}
        >
          <span className={styles['group-name']}>{department_name}</span>
          <span className={styles['group-count']}>{employees_count}</span>
        </Accordion.Control>
        {hasEmployees ? (
          <Accordion.Panel className={styles['group-content']}>
            <List className={styles['employees-list']}>
              {employees?.map(employee => {
                return (
                  <List.Item key={employee.id} className={styles['employees-list-item']}>
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
    </Accordion>
  )
}
