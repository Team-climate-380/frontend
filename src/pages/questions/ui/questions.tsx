/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */

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
import { Loader } from '@mantine/core'
import { useIntersection } from '@mantine/hooks'
import { QuestionForm } from '@/features/question-form'

//const filters and const questions - mock data, TODO: delete after back-end requests implementation
const questionsList = {
  count: 123,
  next: 'http://api.example.org/accounts/?page=4',
  previous: 'http://api.example.org/accounts/?page=2',
  results: [
    {
      id: 0,
      text: 'question_1',
      question_type: 'ratingScale',
      is_favorite: true
    },
    {
      id: 1,
      text: 'question_2',
      question_type: 'ratingScale',
      is_favorite: true
    },
    {
      id: 2,
      text: 'question_3',
      question_type: 'ratingScale',
      is_favorite: true
    },
    {
      id: 3,
      text: 'question_4',
      question_type: 'ratingScale',
      is_favorite: true
    }
  ]
}

const QuestionPage = () => {
  const [questionFormIsVisible, setQuestionFormIsVisible] = useState(false) //new question form visibility
  const [_questions, _setQuestions] = useState(questionsList) //save backend data into variable
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

  // @ts-ignore
  /*const currentSearch = search*/

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
    queryKey: ['questions', currentFilter],
    queryFn: async ({ pageParam = currentPage }) =>
      await getQuestions({
        filter: currentFilter,
        page: pageParam,
        per_page: currentPerPage
        /*search: currentSearch*/
      }),
    initialPageParam: 1,
    getNextPageParam: lastPage => (lastPage?.has_next ? lastPage.page + 1 : undefined)
  })

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
      const nextPage = currentPage + 1
      setParams({ ...queryParams, page: String(nextPage) }, false)
    }
  }, [entry, hasNextPage, isFetchingNextPage])

  // const changeFilterValue = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const inputValue = event.target.value.trim()

  const setQuestionFormVisibility = () => {
    setQuestionFormIsVisible(prev => !prev)
  }
  // const filteredQuestionList = questions.results.filter(question => {
  //   return question.text.toLowerCase().includes(search.toLowerCase().trim())
  // }) //uncomment after #49 task component implementation

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
              isNewQuestion={true}
              closeForm={() => {
                setQuestionFormVisibility()
              }}
            />
          </div>
        )}
        {/* TODO implement form from #52 task}*/}
        <div className={styles['questions-list']}>
          {data?.pages.flatMap(pageItem => pageItem?.data.map(q => <div key={q.id}>{q.text}</div>))}{' '}
          {/*отображение списка вопросов, пока без общего компонента*/}
        </div>
      </div>
      {/*<QuestionList questions={filteredQuestionList}/> TODO implement after #49 task*/}
      <div ref={ref} className={styles.loader_container}>
        {isFetchingNextPage && <Loader color="blue" />}
      </div>
    </div>
  )
}

export default QuestionPage
