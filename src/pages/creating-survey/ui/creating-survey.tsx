import classes from '../styles/styles.module.scss'
import CreateSurveyForm from '@/widgets/survey-form/create-form/ui/create-form'

export const CreatingSurvey: React.FC = () => {
  return (
    <div className={classes.creatingSurvey}>
      <CreateSurveyForm />
    </div>
  )
}

export default CreatingSurvey
