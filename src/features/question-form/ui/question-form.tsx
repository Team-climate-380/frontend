import { Textarea, Container } from '@mantine/core'
import {
  useCreateEditQuestionForm,
  IQuestionForm,
  QuestionTypeEnum
} from '@entities/question/forms/use-create-edit-question-form.ts'
import { ICreateEditFormProps } from '@entities/create-edit-form-types.ts'
import { SubmitButton } from '@shared/ui/submit-button'
import { Dropdown } from '@shared/ui/dropdown'
import classes from './question-form.module.scss'
import { createNewQuestion } from '@/entities/question/api/create-new-question'
import { useState } from 'react'
import { Loader } from '@/shared/ui/loader'
import { updateQuestion } from '@/entities/question/api/update-question'
import { QuestionTypeDisplay } from '@/entities/question/utils/question-actions'

const questionTypeData = Object.values(QuestionTypeEnum).map(key => QuestionTypeDisplay(key))

export type QuestionFormProps = ICreateEditFormProps & {
  formData?: IQuestionForm
}

export const QuestionForm: React.FC<QuestionFormProps> = ({ isOpen, isCreateForm, closeForm, formData }) => {
  const [isLoading, setLoading] = useState(false)
  const questionForm = useCreateEditQuestionForm(formData)

  const handleSubmit = async (data: IQuestionForm) => {
    if (isCreateForm) {
      setLoading(true)
      try {
        const result = await createNewQuestion(data)

        if (!result) {
          console.error('Ошибка при создании вопроса')
          return
        }
        console.log('Вопрос успешно создан', data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
        closeForm()
      }
    } else {
      setLoading(true)
      try {
        const result = await updateQuestion(formData!.id, { ...data, question_type: formData?.question_type })
        if (!result) {
          console.error('Ошибка при редактировании вопроса')
          return
        }
        return result
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    closeForm()
  }

  return isOpen ? (
    <form
      onSubmit={questionForm.onSubmit(handleSubmit)}
      className={isCreateForm ? classes.formForNewQuestion : classes.formForEditQuestion}
    >
      <Container strategy="grid" className={classes.container}>
        <Dropdown
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
          key={questionForm.key('question_type')}
          {...questionForm.getInputProps('question_type')}
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
          key={questionForm.key('text')}
          {...questionForm.getInputProps('text')}
        />
        <SubmitButton className={classes.questionFormSubmit} />
      </Container>
      {isLoading && <Loader />}
    </form>
  ) : null
}
