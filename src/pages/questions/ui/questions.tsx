import styles from '../css/styles.module.scss'
import { Header } from '@/widgets/header/header'
import { Button } from '@/shared/ui/button'
import { Filter } from '@/features/filters'
import { FavoriteIcon } from '@/features/filters/ui/favorite-icon'
import { SearchInput } from '@/widgets/search-input'
import { useState, useEffect } from 'react'
import { useQueryParams } from '@/shared/hooks/useQueryParams'
import { getQuestions, IQuestionsResponce } from '@/entities/question/api/get-questions'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Loader } from '@shared/ui/loader'
import { useIntersection } from '@mantine/hooks'
import { QuestionForm } from '@/features/question-form'
import { QuestionsList } from '@/features/questions-list'

//const filters and const questions - mock data, TODO: delete after back-end requests implementation
const reponceServer: IQuestionsResponce = {
  data: [
    {
      id: 24,
      text: 'Как вы оцениваете уровень доверия между членами команды?',
      question_type: 'ratingScale',
      is_favorite: false,
      surveys: []
    },
    {
      id: 25,
      text: 'Вы довольны своей работой?',
      question_type: 'ratingScale',
      is_favorite: false,
      surveys: []
    },
    {
      id: 26,
      text: 'Согласны ли вы с тем, что ваша работа ценится в команде?',
      question_type: `consentGiven`,
      is_favorite: false,
      surveys: []
    },
    {
      id: 27,
      text: 'Считаете ли вы свою работу эффективной',
      question_type: 'ratingScale',
      is_favorite: false,
      surveys: []
    },
    {
      id: 28,
      text: 'Как вы оценили бы уровень морального состояния в команде?',
      question_type: 'ratingScale',
      is_favorite: false
    }
  ],
  page: 1,
  per_page: 20,
  total: 5,
  num_pages: 1,
  has_next: false,
  has_previous: false
}
const questionsList = {
  //  convert responceServer to application media
  count: reponceServer.total,
  next: reponceServer.has_next,
  previous: reponceServer.has_previous,
  results: reponceServer.data
}

const QuestionPage = () => {
  const [questionFormIsVisible, setQuestionFormIsVisible] = useState(false) //new question form visibility
  const { queryParams, setParams } = useQueryParams()
  const { ref, entry } = useIntersection({
    threshold: 1
  })
  //инициализация URL при первом рендере
  useEffect(() => {
    setParams({ filter: 'all', page: '1', per_page: '2' }, true)
  }, [])

  const currentFilter = queryParams.filter ?? 'all'
  const currentPage = Number(queryParams.page ?? '1')
  const currentPerPage = Number(queryParams.per_page ?? '2')
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

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
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

  const questionsFromServer = data?.pages?.flatMap(page => (page ? (page.data ?? []) : [])) ?? questionsList.results

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
        {/* TODO implement form from #52 task}*/}
        <div className={styles['questions-list']}>
          <QuestionsList questions={questionsFromServer} />
        </div>
      </div>
      <div ref={ref} className={styles.loader_container}>
        {isFetchingNextPage && <Loader />}
      </div>
    </div>
  )
}

export default QuestionPage
