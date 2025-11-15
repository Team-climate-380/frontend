import styles from '../css/styles.module.scss'
import { Button } from '@/shared/ui/button'
import { SearchInput } from '@/widgets/search-input'
import { useState } from 'react'
import { QuestionForm } from '@/features/question-form'
import { QuestionsHeader } from '@entities/question/ui/questions-header/questions-header'
import { QuestionsPageLayout } from '@widgets/questions-page-layout/index'

const QuestionPage = () => {
  const [questionFormIsVisible, setQuestionFormIsVisible] = useState(false) //new question form visibility
  // const { queryParams, setParams } = useQueryParams()
  // const { ref, entry } = useIntersection({
  //   threshold: 1
  // })

  //инициализация URL при первом рендере
  // useEffect(() => {
  //   setParams({ filter: 'all', page: '1', per_page: '20' }, true)
  // }, [])

  // const currentFilter = queryParams.filter ?? 'all'
  // const currentPage = Number(queryParams.page ?? '1')
  // const currentPerPage = Number(queryParams.per_page ?? '20')
  // const currentSearch = queryParams.search ?? ''

  // const filters = [
  //   {
  //     icon: <FavoriteIcon />,
  //     value: 'favorite',
  //     setValue: () => {
  //       setParams({ filter: 'favorite', page: '1', per_page: '20' }, true)
  //     }
  //   },
  //   {
  //     title: 'Все',
  //     value: 'all',
  //     setValue: () => {
  //       setParams({ filter: 'all', page: '1', per_page: '20' }, true)
  //     }
  //   }
  // ]

  // const { questions, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = UseQuestionsQuery()
  //   queryKey: ['questions', currentFilter, currentPerPage, currentSearch],
  //   queryFn: async ({ pageParam = currentPage }) =>
  //     await getQuestions({
  //       filter: currentFilter,
  //       page: pageParam,
  //       per_page: currentPerPage,
  //       search: currentSearch
  //     }),
  //   initialPageParam: 1,
  //   getNextPageParam: lastPage => (lastPage?.has_next ? lastPage.page + 1 : undefined)
  // })

  // const questions = data?.pages.flatMap(pageItem => pageItem?.data).filter((q): q is IQuestion => Boolean(q)) ?? []

  // useEffect(() => {
  //   if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
  //     fetchNextPage()
  //     const nextPage = currentPage + 1
  //     setParams({ ...queryParams, page: String(nextPage) }, false)
  //   }
  // }, [entry, hasNextPage, isFetchingNextPage])

  // useEffect(() => {
  //   setParams({ ...queryParams, page: '1' }, true)
  // }, [currentSearch])

  const setQuestionFormVisibility = () => {
    setQuestionFormIsVisible(prev => !prev)
  }

  useEffect(() => {
    if (!questionFormIsVisible) return
    function handleClickOutside(event: MouseEvent) {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setQuestionFormIsVisible(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [questionFormIsVisible])

  return (
    <div className={styles.main}>
      <>
        <QuestionsHeader
          actions={
            <>
              <SearchInput />
              <Button onClick={setQuestionFormVisibility} variant="primary" size="md" disabled={questionFormIsVisible}>
                Новый вопрос
              </Button>
            </>
          }
        />
        <QuestionsPageLayout allowContextMenu={true} />

        {questionFormIsVisible && (
          <div className={styles['question-form']} ref={formRef} onClick={e => e.stopPropagation()}>
            <QuestionForm
              isOpen={questionFormIsVisible}
              isCreateForm={true}
              closeForm={() => {
                setQuestionFormVisibility()
              }}
            />
          </div>
        )}
      </>
    </div>
  )
}

export default QuestionPage
