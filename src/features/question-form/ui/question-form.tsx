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
import { QuestionTypeData, QuestionTypeDisplay } from '@/entities/question/utils/question-actions'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IQuestion } from '@/entities/question/type'

const questionTypeDataUI = Object.values(QuestionTypeEnum).map(key => QuestionTypeDisplay(key))
export type QuestionFormProps = ICreateEditFormProps & {
  formData?: IQuestionForm
}

type TPayload = {
  id: number
  body: Partial<IQuestion>
}

export const QuestionForm: React.FC<QuestionFormProps> = ({ isOpen, isCreateForm, closeForm, formData }) => {
  const [isLoading, setLoading] = useState(false)
  const questionForm = useCreateEditQuestionForm(formData)
  const queryClient = useQueryClient()
  const createQuestionMutation = useMutation({
    mutationFn: (data: IQuestionForm) =>
      createNewQuestion({
        text: data.text,
        question_type: QuestionTypeData(data.question_type)
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] })
    },
    onError: error => {
      console.error(`Ошибка обновления: ${error.message}`)
    }
  })
  const updateQuestionMutation = useMutation({
    mutationFn: (payload: TPayload) => updateQuestion(payload.id, payload.body),
    onSuccess: data => {
      if (data && data.id) {
        queryClient.setQueryData(['questions', data.id], data)
        queryClient.invalidateQueries({ queryKey: ['questions'] })
      }
    },
    onError: error => {
      console.error(`Ошибка обновления: ${error.message}`)
    }
  })

  const handleSubmit = async (data: IQuestionForm) => {
    if (isCreateForm) {
      setLoading(true)
      try {
        createQuestionMutation.mutate({
          ...data,
          question_type: questionForm.values.question_type
        })
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
        closeForm()
      }
    } else {
      setLoading(true)
      try {
        updateQuestionMutation.mutate({
          id: formData!.id,
          body: {
            ...data,
            question_type: QuestionTypeData(questionForm.getValues().question_type)
          }
        })
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
        closeForm()
      }
    }
  }
  const defaultTypeValue = () => {
    return QuestionTypeDisplay(QuestionTypeData(questionForm.getValues().question_type))
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
          data={questionTypeDataUI}
          key={questionForm.key('question_type')}
          defaultValue={defaultTypeValue()}
          onChange={value => {
            if (value) {
              questionForm.setFieldValue('question_type', value)
            }
          }}
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
