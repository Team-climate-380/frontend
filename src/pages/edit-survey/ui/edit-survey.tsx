import EditSurveyForm from '@/widgets/survey-form/edit-form/ui/edit-form'
import classes from '../styles/styles.module.scss'

export const CreatingSurvey: React.FC = () => {
  return (
    <div className={classes.creatingSurvey}>
      <EditSurveyForm />
    </div>
  )
}

export default CreatingSurvey
