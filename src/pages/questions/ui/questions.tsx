import styles from '../css/styles.module.scss'
import { Button } from '@/shared/ui/button'
import { SearchInput } from '@/widgets/search-input'
import { useState, useRef, useEffect } from 'react'
import { QuestionForm } from '@/features/question-form'
import { QuestionsHeader } from '@entities/question/ui/questions-header/questions-header'
import { QuestionsPageLayout } from '@widgets/questions-page-layout/index'

const QuestionPage = () => {
  const [questionFormIsVisible, setQuestionFormIsVisible] = useState(false) //new question form visibility
  const formRef = useRef<HTMLDivElement>(null)

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
              <Button
                onClick={e => {
                  e.stopPropagation()
                  setQuestionFormIsVisible(true)
                }}
                disabled={questionFormIsVisible}
              >
                Новый вопрос
              </Button>
            </>
          }
        />
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
        <QuestionsPageLayout allowContextMenu={true} />
      </>
    </div>
  )
}

export default QuestionPage
