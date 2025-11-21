import EditSurveyForm from '@/widgets/survey-form/edit-form/ui/edit-form'
import classes from '../styles/styles.module.scss'
import { useDisclosure, useScrollIntoView } from '@mantine/hooks'
import { useState } from 'react'
import { IQuestion } from '@/entities/question/type'
import { RightPanel } from '@/shared/ui/drawer'
import { QuestionsHeader } from '@/entities/question/ui/questions-header/questions-header'
import { QuestionsPageLayout } from '@/widgets/questions-page-layout'

export const CreatingSurvey: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const [question, setQuestion] = useState<IQuestion | undefined>()
  const [indexQuestion, setIndexQuestion] = useState<number | undefined>()
  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView()

  return (
    <div className={classes.creatingSurvey} ref={scrollableRef}>
      <EditSurveyForm
        onOpenButtons={(index: number) => {
          open()
          setIndexQuestion(index)
        }}
        indexQuestion={indexQuestion}
        selectQuestion={question}
        scroll={scrollIntoView}
        targetRef={targetRef}
      />

      {opened && (
        <RightPanel
          opened={opened}
          onClose={close}
          header={<QuestionsHeader order={3} isDrawerHeader={true} onClick={close} />}
          content={
            <QuestionsPageLayout
              className={classes.content}
              isShowToDeleteItem={false}
              setQuestion={setQuestion}
              allowContextMenu={false}
            />
          }
        />
      )}
    </div>
  )
}

export default CreatingSurvey
