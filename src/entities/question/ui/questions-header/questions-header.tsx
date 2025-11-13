import { useQueryParams } from '@/shared/hooks/useQueryParams'
import { Header } from '@/widgets/header/header'
import { Filter } from '@/features/filters'
import { FavoriteIcon } from '@/features/filters/ui/favorite-icon'

interface QuestionsHeaderProps {
  children?: React.ReactNode
  order?: number

  className?: string
}

export const QuestionsHeader: React.FC<QuestionsHeaderProps> = ({ children, order }) => {
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
    <Header title="Вопросы" actions={children} order={order}>
      <Filter filters={filters} value={currentFilter} />
    </Header>
  )
}
