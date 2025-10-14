import { Textarea, Container } from '@mantine/core'
import {
  useCreateEditQuestionForm,
  IQuestionForm,
  QuestionTypeEnum
} from '@entities/question/forms/use-create-edit-question-form.ts'
import { ICreateEditFormProps } from '@entities/create-edit-form-types.ts'
import { SubmitButton } from '@shared/ui/submit-button'
import { SelectWithDropdownIcon as Select } from '@shared/ui/select'
import classes from './question-form.module.scss'

const questionTypeData = Object.values(QuestionTypeEnum)

export type QuestionFormProps = ICreateEditFormProps & {
  formData?: IQuestionForm
}

export const QuestionForm: React.FC<QuestionFormProps> = ({ isOpen, isCreateForm, closeForm, formData }) => {
  const questionForm = useCreateEditQuestionForm(formData)

  const handleSubmit = (data: IQuestionForm) => {
    console.log(data)
    closeForm()
  }

  return isOpen ? (
    <form
      onSubmit={questionForm.onSubmit(handleSubmit)}
      className={isCreateForm ? classes.formForNewQuestion : classes.formForEditQuestion}
    >
      <Container strategy="grid" className={classes.container}>
        <Select
          styles={{
            root: { '--mantine-scale': '0.83' },
            input: {
              backgroundColor: 'var(--mantine-color-black-1)',
              border: 'var(--mantine-color-black-1)',
              fontSize: '15px'
            }
          }}
          className={classes.questionFormDropdown}
          aria-label="Тип вопроса"
          data={questionTypeData}
          key={questionForm.key('typeOfQuestion')}
          {...questionForm.getInputProps('typeOfQuestion')}
        />
        <Textarea
          styles={{
            input: {
              backgroundColor: 'var(--mantine-color-black-1)',
              border: 'var(--mantine-color-black-1)',
              '--input-size': '75px',
              fontSize: '15px'
            }
          }}
          className={classes.textarea}
          aria-label="Текст вопроса"
          key={questionForm.key('question')}
          {...questionForm.getInputProps('question')}
        />
        <SubmitButton className={classes.questionFormSubmit} />
      </Container>
    </form>
  ) : null
}
