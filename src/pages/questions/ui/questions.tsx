/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import styles from '../css/styles.module.scss'
import { Header } from '@/widgets/header/header'
import { Button } from '@/shared/ui/button'
import { Filter } from '@/features/filters'
import { FavoriteIcon } from '@/features/filters/ui/favorite-icon'
import { SearchIcon } from '@/shared/ui/icons/search'
import { Input } from '@/shared/ui/input'
import { useState, useEffect } from 'react'
import { useQueryParams } from '@/shared/hooks/useQueryParams'

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
  const [inputVisible, setInputVisible] = useState(false) //search input visibility. Replace after
  const [questionFormIsVisible, setQuestionFormIsVisible] = useState(false) //new question form visibility
  const [_questions, _setQuestions] = useState(questionsList) //save backend data into variable
  const { queryParams, getParam, setParams } = useQueryParams()

  const filter = getParam('filter') || 'all'
  // @ts-ignore
  const search = getParam('search') || ''

  // filters mockData
  const filters = [
    {
      icon: <FavoriteIcon />,
      setValue: () => {
        setParams({ ...queryParams, filter: 'favorite' }, false)
      }
    },
    {
      title: 'Все',
      setValue: () => {
        setParams({ ...queryParams, filter: 'all' }, false)
      }
    }
  ]

  const setSearchFieldVisibility = () => {
    setInputVisible(prev => !prev)
  }

  const changeFilterValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.trim()

    if (inputValue) {
      setParams({ ...queryParams, search: inputValue }, false)
    } else {
      const { search, ...rest } = queryParams
      setParams({ ...rest }, false)
    }
  }

  const setQuestionFormVisibility = () => {
    setQuestionFormIsVisible(prev => !prev)
  }

  useEffect(() => {
    if (!getParam(filter)) {
      setParams({ ...queryParams, filter: 'all' }, false)
    }
  }, [])

  // const filteredQuestionList = questions.results.filter(question => {
  //   return question.text.toLowerCase().includes(search.toLowerCase().trim())
  // }) //uncomment after #49 task component implementation

  return (
    <div className={styles.main}>
      <Header
        title="Вопросы"
        actions={
          <>
            {inputVisible && (
              <Input
                onChange={event => {
                  changeFilterValue(event)
                }}
              />
            )}
            <Button variant="ghost" size="md" onClick={setSearchFieldVisibility}>
              <SearchIcon />
            </Button>
            <Button onClick={setQuestionFormVisibility} variant="primary" size="md" disabled={questionFormIsVisible}>
              Новый вопрос
            </Button>
          </>
        }
      >
        <Filter filters={filters} />
      </Header>
      <div className={styles['main-content']}>
        {questionFormIsVisible && (
          <div className={styles['question-form']}>
            <div>new question form</div>
          </div>
        )}{' '}
        {/* TODO implement form from #52 task*/}
        <div className={styles['questions-list']}></div>
        {/*<QuestionList questions={filteredQuestionList}/> TODO implement after #49 task*/}
      </div>
    </div>
  )
}

export default QuestionPage
