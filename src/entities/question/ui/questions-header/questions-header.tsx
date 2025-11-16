import { TitleOrder } from '@mantine/core'
import { useQueryParams } from '@/shared/hooks/useQueryParams'
import { Header } from '@/widgets/header/header'
import { Filter } from '@/features/filters'
import { FavoriteIcon } from '@/features/filters/ui/favorite-icon'
import { CloseButton } from '@shared/ui/close-button/index'
import style from './style.module.css'

interface QuestionsHeaderProps {
  actions?: React.ReactNode
  order?: TitleOrder
  isDrawerHeader?: boolean
  onClick?: () => void
}

export const QuestionsHeader: React.FC<QuestionsHeaderProps> = ({ actions, order, isDrawerHeader, onClick }) => {
  const { queryParams, setParams } = useQueryParams()

  const filters = [
    {
      icon: <FavoriteIcon />,
      value: 'favorite',
      setValue: () => {
        setParams({ filter: 'favorite', page: '1', per_page: '20' }, true)
      }
    },
    {
      title: 'Все',
      value: 'all',
      setValue: () => {
        setParams({ filter: 'all', page: '1', per_page: '20' }, true)
      }
    }
  ]
  const currentFilter = queryParams.filter ?? 'all'

  return (
    <Header title="Вопросы" actions={actions} order={order} isDrawerHeader={isDrawerHeader}>
      {isDrawerHeader && <CloseButton className={style.button} type="button" onClick={onClick} />}
      <Filter filters={filters} value={currentFilter} />
    </Header>
  )
}
