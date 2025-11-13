import { useDisclosure } from '@mantine/hooks'
import CreateSurveyForm from '@/widgets/survey-form/create-form/ui/create-form'
import { RightPanel } from '@shared/ui/drawer/index'
import { QuestionsLayout } from '@widgets/questions-layout/index'
import { QuestionsHeader } from '@entities/question/ui/questions-header/questions-header'
import classes from '../styles/styles.module.scss'

export const CreatingSurvey: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <div className={classes.creatingSurvey}>
      <CreateSurveyForm onOpenButtons={open} />

      {opened && (
        <RightPanel
          opened={opened}
          onClose={close}
          content={
            <>
              <QuestionsHeader order={3} />
              <QuestionsLayout className={classes.questionsList} isShowToDeleteItem={false} />
            </>
          }
        />
      )}
    </div>
  )
}

export default CreatingSurvey
