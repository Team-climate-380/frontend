import { clsx } from 'clsx'
import { useEffect } from 'react'
import { useIntersection } from '@mantine/hooks'
import { useQueryParams } from '@/shared/hooks/useQueryParams'
import { UseQuestionsQuery } from '@features/questions-list/use-questions-query/use-questions-query'
import { IQuestion } from '@/entities/question/type'
import { Loader } from '@/shared/ui/loader'
import { Skeleton } from '@/shared/ui/skeleton'
import { QuestionsList } from '@/features/questions-list'
import styles from './style.module.css'

interface QuestionsPageLayoutProps {
  setQuestion?: (item: IQuestion | undefined) => void
  isShowToDeleteItem?: boolean
  allowContextMenu?: boolean
  className?: string
}

export const QuestionsPageLayout: React.FC<QuestionsPageLayoutProps> = ({
  setQuestion,
  isShowToDeleteItem = true,
  allowContextMenu,
  className
}) => {
  const { queryParams, setParams } = useQueryParams()
  const { ref, entry } = useIntersection({
    threshold: 0.9
  })

  const { questions, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = UseQuestionsQuery()

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, queryParams, setParams, entry, hasNextPage, isFetchingNextPage])

  const questionsNotDelete = questions.filter(item => item.to_delete === false)

  return (
    <>
      <div className={clsx([styles['main-content'], className])}>
        {isError ? (
          <div className={styles['error-message']}>
            Ошибка при загрузке данных: {error instanceof Error ? error.message : 'Неизвестная ошибка'}
          </div>
        ) : isLoading ? (
          <Skeleton />
        ) : questions.length > 0 ? (
          <div className={styles['questions-list']}>
            <QuestionsList
              questions={isShowToDeleteItem ? questions : questionsNotDelete}
              setQuestion={setQuestion}
              allowContextMenu={allowContextMenu}
            />
          </div>
        ) : (
          <span className={styles['no-data']}>По Вашему запросу нет данных. Измените параметры поиска</span>
        )}
      </div>
      <div ref={ref} className={styles.loader_container}>
        {isFetchingNextPage && <Loader size="lg" />}
      </div>
    </>
  )
}
