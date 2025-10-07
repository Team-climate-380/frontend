import { useState } from 'react'
import { Select, Textarea, ActionIcon, Container } from '@mantine/core'
import {
  useCreateEditQuestionForm,
  IQuestionForm,
  QuestionTypeEnum
} from '@entities/question/forms/use-create-edit-question-form.ts'
import Check from '../images/CheckIcon.svg'
import ChevronDown from '../images/ChevronDown.svg'
import classes from './question-form.module.scss'

export type TQuestionData = IQuestionForm & {
  isFavorite?: boolean
}

export interface QuestionFormProps {
  isOpen: boolean
  isNewQuestion: boolean
  closeForm: () => void
  questionData?: TQuestionData
}

const questionTypeData = Object.values(QuestionTypeEnum)

export const QuestionForm: React.FC<QuestionFormProps> = ({ isOpen, isNewQuestion, closeForm, questionData }) => {
  const questionForm = useCreateEditQuestionForm(questionData)
  const [openedDropdown, setOpenedDropdown] = useState(false)

  const sendData = (data: TQuestionData) => {
    console.log('data', data)
    closeForm()
  }

  return isOpen ? (
    <form
      onSubmit={questionForm.onSubmit(sendData)}
      className={isNewQuestion ? classes.formForNewQuestion : classes.formForEditQuestion}
    >
      <Container strategy="grid" className={classes.container}>
        <Select
          rightSection={
            <img
              src={ChevronDown}
              aria-hidden={true}
              style={{
                blockSize: 16,
                inlineSize: 14,
                transition: 'transform 150ms ease',
                transform: openedDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                pointerEvents: 'none'
              }}
            />
          }
          styles={{
            root: { '--mantine-scale': '0.83' },
            input: {
              backgroundColor: '#F6F8FA',
              border: '#F6F8FA'
            }
          }}
          className={classes.select}
          withCheckIcon={false}
          data={questionTypeData}
          key={questionForm.key('typeOfQuestion')}
          onDropdownOpen={() => setOpenedDropdown(true)}
          onDropdownClose={() => setOpenedDropdown(false)}
          allowDeselect={false}
          {...questionForm.getInputProps('typeOfQuestion')}
        />
        <Textarea
          styles={{
            input: {
              backgroundColor: '#F6F8FA',
              border: '#F6F8FA',
              '--input-size': '75px'
            }
          }}
          className={classes.textarea}
          key={questionForm.key('question')}
          {...questionForm.getInputProps('question')}
        />
        <ActionIcon className={classes.iconCheck} variant="default" aria-label="Сохранить вопрос" type="submit">
          <img src={Check} />
        </ActionIcon>
      </Container>
    </form>
  ) : null
}
