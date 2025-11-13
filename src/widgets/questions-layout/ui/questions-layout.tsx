import { useEffect } from 'react'
import { useIntersection } from '@mantine/hooks'
import { useQueryParams } from '@/shared/hooks/useQueryParams'
import { UseQuestionsQuery } from '@features/questions-list/use-questions-query/use-questions-query'
// import { Header } from '@/widgets/header/header'
// import { Filter } from '@/features/filters'
import { Loader } from '@/shared/ui/loader'
import { Skeleton } from '@/shared/ui/skeleton'
import { QuestionsList } from '@/features/questions-list'
// import { FavoriteIcon } from '@/features/filters/ui/favorite-icon'
import styles from './style.module.css'

interface QuestionsLayoutProps {
  isShowToDeleteItem?: boolean
  children?: React.ReactNode
  className?: string
}

export const QuestionsLayout: React.FC<QuestionsLayoutProps> = ({ isShowToDeleteItem }) => {
  const { queryParams, setParams } = useQueryParams()
  const { ref, entry } = useIntersection({
    threshold: 1
  })

  const { questions, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = UseQuestionsQuery()
  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
      // const nextPage = currentPage + 1
      // setParams({ ...queryParams, page: String(nextPage) }, false)
    }
  }, [fetchNextPage, queryParams, setParams, entry, hasNextPage, isFetchingNextPage])

  const questionsNotDelete = questions.filter(item => item.to_delete === false)

  // useEffect(() => {
  //   setParams({ ...queryParams, page: '1' }, true)
  // }, [currentSearch])

  return (
    <div className={styles.main}>
      {/* <QuestionHeader actions={children} order={order}/> */}
      {/* <Header title="Вопросы" actions={children}>
        <Filter filters={filters} value={currentFilter} />
      </Header> */}
      <div className={styles['main-content']}>
        {isError ? (
          <div className={styles['error-message']}>
            Ошибка при загрузке данных: {error instanceof Error ? error.message : 'Неизвестная ошибка'}
          </div>
        ) : isLoading ? (
          <Skeleton />
        ) : questions.length > 0 ? (
          <div className={styles['questions-list']}>
            <QuestionsList questions={isShowToDeleteItem ? questions : questionsNotDelete} />
          </div>
        ) : (
          <span className={styles['no-data']}>По Вашему запросу нет данных. Измените параметры поиска</span>
        )}
      </div>
      <div ref={ref} className={styles.loader_container}>
        {isFetchingNextPage && <Loader size="lg" />}
      </div>
    </div>
  )
}
