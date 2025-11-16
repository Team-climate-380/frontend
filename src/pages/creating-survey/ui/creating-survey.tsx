import { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import CreateSurveyForm from '@/widgets/survey-form/create-form/ui/create-form'
import { IQuestion } from '@entities/question/type'
import { RightPanel } from '@shared/ui/drawer/index'
import { QuestionsPageLayout } from '@widgets/questions-page-layout/index'
import { QuestionsHeader } from '@entities/question/ui/questions-header/questions-header'
import classes from '../styles/styles.module.scss'

export const CreatingSurvey: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const [question, setQuestion] = useState<IQuestion | undefined>()
  const [indexQuestion, setIndexQuestion] = useState<number | undefined>()

  return (
    <div className={classes.creatingSurvey}>
      <CreateSurveyForm
        onOpenButtons={(index: number) => {
          open()
          setIndexQuestion(index)
        }}
        indexQuestion={indexQuestion}
        selectQuestion={question}
      />
      {opened && (
        <RightPanel
          opened={opened}
          onClose={close}
          header={<QuestionsHeader order={3} isDrawerHeader={true} />}
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
