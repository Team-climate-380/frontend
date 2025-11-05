import styles from '../css/styles.module.scss'
import { Header } from '@/widgets/header/header'
import { Button } from '@/shared/ui/button'
import { Filter } from '@/features/filters'
import { FavoriteIcon } from '@/features/filters/ui/favorite-icon'
import { SearchInput } from '@/widgets/search-input'
import { useState, useEffect } from 'react'
import { useQueryParams } from '@/shared/hooks/useQueryParams'
import { getQuestions } from '@/entities/question/api/get-questions'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Loader } from '@/shared/ui/loader'
import { Skeleton } from '@/shared/ui/skeleton'
import { useIntersection } from '@mantine/hooks'
import { QuestionForm } from '@/features/question-form'
import { QuestionsList } from '@/features/questions-list'
import { IQuestion } from '@/entities/question/type'

const QuestionPage = () => {
  const [questionFormIsVisible, setQuestionFormIsVisible] = useState(false) //new question form visibility
  const { queryParams, setParams } = useQueryParams()
  const { ref, entry } = useIntersection({
    threshold: 1
  })

  //инициализация URL при первом рендере
  useEffect(() => {
    setParams({ filter: 'all', page: '1', per_page: '20' }, true)
  }, [])

  const currentFilter = queryParams.filter ?? 'all'
  const currentPage = Number(queryParams.page ?? '1')
  const currentPerPage = Number(queryParams.per_page ?? '20')
  const currentSearch = queryParams.search ?? ''

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

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = useInfiniteQuery({
    queryKey: ['questions', currentFilter, currentPerPage, currentSearch],
    queryFn: async ({ pageParam = currentPage }) =>
      await getQuestions({
        filter: currentFilter,
        page: pageParam,
        per_page: currentPerPage,
        search: currentSearch
      }),
    initialPageParam: 1,
    getNextPageParam: lastPage => (lastPage?.has_next ? lastPage.page + 1 : undefined)
  })

  const questions = data?.pages.flatMap(pageItem => pageItem?.data).filter((q): q is IQuestion => Boolean(q)) ?? []

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
      const nextPage = currentPage + 1
      setParams({ ...queryParams, page: String(nextPage) }, false)
    }
  }, [entry, hasNextPage, isFetchingNextPage])

  useEffect(() => {
    setParams({ ...queryParams, page: '1' }, true)
  }, [currentSearch])

  const setQuestionFormVisibility = () => {
    setQuestionFormIsVisible(prev => !prev)
  }

  return (
    <div className={styles.main}>
      <Header
        title="Вопросы"
        actions={
          <>
            <SearchInput />
            <Button onClick={setQuestionFormVisibility} variant="primary" size="md" disabled={questionFormIsVisible}>
              Новый вопрос
            </Button>
          </>
        }
      >
        <Filter filters={filters} value={currentFilter} />
      </Header>
      <div className={styles['main-content']}>
        {questionFormIsVisible && (
          <div className={styles['question-form']}>
            <QuestionForm
              isOpen={questionFormIsVisible}
              isCreateForm={true}
              closeForm={() => {
                setQuestionFormVisibility()
              }}
            />
          </div>
        )}
        {isError ? (
          <div className={styles['error-message']}>
            Ошибка при загрузке данных: {error instanceof Error ? error.message : 'Неизвестная ошибка'}
          </div>
        ) : isLoading ? (
          <Skeleton />
        ) : questions.length > 0 ? (
          <div className={styles['questions-list']}>
            <QuestionsList questions={questions} />
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

export default QuestionPage
