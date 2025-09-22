import styles from '../css/styles.module.scss'
import { Header } from '@/widgets/header/header'
import { Button } from '@/shared/ui/button'
import { Filter } from '@/features/filters'
import { FavoriteIcon } from '@/features/filters/ui/favorite-icon'
import { SearchIcon } from '@/shared/ui/icons/search'
import { Input } from '@/shared/ui/input'
import { useState } from 'react'

//filters and questions - mock data, TODO: delete after back-end requests implementation
const filters = [
  {
    icon: <FavoriteIcon />,
    setValue: () => {
      console.log('only favorite quest')
    }
  },
  {
    title: 'Все',
    setValue: () => {
      console.log('all quest')
    }
  }
]
const questions = {
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
  const [inputVisible, setInputVisible] = useState(false) //search input visibility
  const [filterValue, setFilterValue] = useState('') //filtration question list
  const [newQuestionFormIsVisible, setNewQuestionFormIsVisible] = useState(false) //new Q Form Visibility

  const setSearchFieldVisibility = () => {
    setInputVisible(prev => !prev)
  }

  const changeFilterValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value)
  }

  const setNewQuestionFormVisibility = () => {
    setNewQuestionFormIsVisible(prev => !prev)
  }

  const filteredQuestionList = questions.results.filter(question => {
    return question.text.toLowerCase().trim().includes(filterValue.toLowerCase().trim())
  })

  return (
    <div className={styles.main}>
      <Header
        title="Вопросы"
        actions={
          <>
            {inputVisible && (
              <Input
                value={filterValue}
                onChange={e => {
                  changeFilterValue(e)
                }}
              />
            )}
            <Button variant="ghost" size="md" onClick={setSearchFieldVisibility}>
              <SearchIcon />
            </Button>
            <Button
              onClick={setNewQuestionFormVisibility}
              variant="primary"
              size="md"
              disabled={newQuestionFormIsVisible}
            >
              Новый вопрос
            </Button>
          </>
        }
      >
        <Filter filters={filters} />
      </Header>
      <div className={styles['questions-list']}>
        {newQuestionFormIsVisible && <div>new question form</div>} {/* TODO implement from #52 task*/}
        {/*question list feature. TODO: implement it from #49 task */}
        {filteredQuestionList.map(question => {
          return (
            <div key={question.id}>{question.text}</div> //delete after #49 task implementation
          )
        })}
      </div>
    </div>
  )
}

export default QuestionPage
