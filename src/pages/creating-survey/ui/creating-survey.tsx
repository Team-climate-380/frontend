import SurveyForm from '@/widgets/survey-form/survey-form'
import classes from '../styles/styles.module.scss'

export const CreatingSurvey: React.FC = () => {
  return (
    <div className={classes.creatingSurvey}>
      <SurveyForm />
    </div>
  )
}

export default CreatingSurvey
