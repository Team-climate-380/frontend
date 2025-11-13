import { Input } from '@/shared/ui/input'
import { FunctionComponent } from 'react'
import classes from '../../styles/styles.module.scss'
import { Flex, Grid, Group, Select } from '@mantine/core'
import { MoreButton } from '@/shared/ui/more-button'
import { CloseButton } from '@/shared/ui/close-button'
import { useSurvey } from '@/entities/survey/forms/lib/use-survey'
import { DatePickerInput } from '@mantine/dates'
import 'dayjs/locale/ru'
import '@mantine/dates/styles.css'
import dayjs from 'dayjs'
import { Button } from '@/shared/ui/button'
import { QuestionCreate } from '@/entities/question/ui/question-create'
import { TQuestion } from '@/entities/question/model/types'
import { useQuery } from '@tanstack/react-query'
import { fetchParticipants } from '@entities/survey/api/api'
import { useSurveyMutation } from '@/entities/survey/forms/lib/use-survey-mutation'

export interface CreateSurveyFormProps {
  onOpenButtons: () => void
}

const CreateSurveyForm: FunctionComponent<CreateSurveyFormProps> = ({ onOpenButtons }) => {
  const { data: departmentOptions, isLoading: areParticipantsLoading } = useQuery({
    queryKey: ['participants'],
    queryFn: fetchParticipants
  })

  const today = dayjs().locale('ru').format('DD MMMM YYYY')
  const initialFormValues = {
    name: `Новый опрос ${today}`,
    department: '',
    startedAt: null,
    finishedAt: null,
    comment: '',
    isFavorite: false,
    questions: [] as TQuestion[]
  }

  const formData = useSurvey(initialFormValues)

  const { submitSurvey, isSubmitting, isError, isSuccess } = useSurveyMutation(formData)

  return (
    <form onSubmit={formData.onSubmit(values => submitSurvey(values))}>
      <Grid className={classes.surveyForm} gutter={19}>
        <Grid.Col span={10.5}>
          <Input className={classes.lgTextInput} key={formData.key('name')} {...formData.getInputProps('name')} />
        </Grid.Col>
        <Grid.Col span={1.5}>
          <Group align="center" justify="end" gap="32px">
            <MoreButton />
            <CloseButton />
          </Group>
        </Grid.Col>
        <Grid.Col span={10.5}>
          <Select
            label={'Кто участвует'}
            data={departmentOptions}
            nothingFoundMessage={areParticipantsLoading ? 'Загрузка...' : 'Ничего не найдено'}
            key={formData.key('department')}
            {...formData.getInputProps('department')}
            classNames={{
              input: classes.input,
              label: classes.label,
              root: classes.root
            }}
          />
        </Grid.Col>
        <Grid.Col span={5.5}>
          <Flex direction="row" gap={30}>
            <DatePickerInput
              clearable
              label="Начало"
              locale="ru"
              valueFormat="DD.MM.YYYY"
              classNames={{
                input: classes.input,
                label: classes.label,
                root: classes.root
              }}
              {...formData.getInputProps('startedAt')}
              key={formData.key('startedAt')}
            />
            <DatePickerInput
              clearable
              label={'Завершение'}
              locale="ru"
              valueFormat="DD.MM.YYYY"
              classNames={{
                input: classes.input,
                label: classes.label,
                root: classes.root
              }}
              {...formData.getInputProps('finishedAt')}
              key={formData.key('finishedAt')}
            />
          </Flex>
        </Grid.Col>
        <Grid.Col span={10.5}>
          <Input label={'Комментарий'} key={formData.key('comment')} {...formData.getInputProps('comment')} />
        </Grid.Col>
      </Grid>
      <Flex direction="column" className={classes.questionsSection}>
        <Flex direction="column" gap={25}>
          {formData.values.questions.map((question, index) => {
            return (
              <QuestionCreate
                key={question.id}
                title={`${index + 1} Вопрос`}
                onOpenButtons={() => onOpenButtons()}
                textInputProps={formData.getInputProps(`questions.${index}.text`)}
                typeInputProps={formData.getInputProps(`questions.${index}.type`)}
              />
            )
          })}
        </Flex>
        <Group justify="space-between" className={classes.optionButtons}>
          <Button
            className={classes.buttonGrey}
            variant="ghost"
            type="button"
            onClick={() => {
              formData.setFieldValue('questions', [
                ...formData.values.questions,
                { id: `question-${Date.now()}`, text: '', is_favorite: false }
              ])
            }}
          >
            Ещё вопрос
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Сохраняется...' : 'Сохранить'}
          </Button>
        </Group>
        {isSuccess && <p className={classes.success}>Опрос успешно создан</p>}
        {isError && <p className={classes.error}>Ошибка при создании</p>}
      </Flex>
    </form>
  )
}

export default CreateSurveyForm
