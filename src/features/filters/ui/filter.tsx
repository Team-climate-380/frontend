import { Tabs } from '@mantine/core'
import { FavoriteIcon } from './favorite-icon'
import styles from '../styles/styles.module.scss'

type Filter = ({ title: string } | { icon: React.ReactNode }) & {
  setValue: () => void
  value: string
}

type Filters = Filter[]
type FilterProps = {
  filters: Filters
  value: string
}

export const Filter: React.FC<FilterProps> = ({ filters, value }) => {
  return (
    <Tabs
      value={value}
      onChange={val => {
        if (!val) return
        const filter = filters.find(f => f.value === val)
        if (filter) filter.setValue()
      }}
    >
      <Tabs.List className={styles.tab_list}>
        {filters.map((item, index) => {
          return (
            <Tabs.Tab className={styles.tab} value={item.value} key={index} fz="md">
              {'title' in item ? item.title : <FavoriteIcon />}
            </Tabs.Tab>
          )
        })}
      </Tabs.List>
    </Tabs>
  )
}
