import { Tabs } from '@mantine/core'
import { FavoriteIcon } from './favorite-icon'
import styles from '../styles/styles.module.scss'

type Filter = ({ title: string } | { icon: React.ReactNode }) & {
  setValue: () => void
}

type Filters = Filter[]
type FilterProps = {
  filters: Filters
}

export const Filter: React.FC<FilterProps> = ({ filters }) => {
  return (
    <Tabs>
      <Tabs.List className={styles.tab_list}>
        {filters.map((item, index) => {
          return (
            <Tabs.Tab className={styles.tab} value={String(index)} onClick={() => item.setValue()} key={index} fz="md">
              {'title' in item ? item.title : <FavoriteIcon />}
            </Tabs.Tab>
          )
        })}
      </Tabs.List>
    </Tabs>
  )
}
