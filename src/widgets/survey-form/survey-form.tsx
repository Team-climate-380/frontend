import { Input } from '@/shared/ui/input'
import { FunctionComponent } from 'react'
import classes from './styles/styles.module.scss'
import { Flex, Grid, Group } from '@mantine/core'
import { MoreButton } from '@/shared/ui/more-button'
import { CloseButton } from '@/shared/ui/close-button'
import { MultySelect } from '@/shared/ui/multy-select'
import { useCreateSurvey } from '@/entities/survey/forms'
import { DatePickerInput } from '@mantine/dates'
import 'dayjs/locale/ru'
import '@mantine/dates/styles.css'
import dayjs from 'dayjs'
import { Button } from '@/shared/ui/button'
import { QuestionCreate } from '@/entities/question/ui/question-create'
import { TQuestion } from '@/entities/question/model/types'
import { useQuery } from '@tanstack/react-query'
import { fetchParticipants } from '@/entities/survey/forms/api'
import { useSurveyMutation } from '@/entities/survey/forms/lib/use-survey-mutation'

const SurveyForm: FunctionComponent = () => {
  const { isLoading: areParticipantsLoading } = useQuery({
    queryKey: ['participants'],
    queryFn: fetchParticipants
  })

  const today = dayjs().locale('ru').format('DD MMMM YYYY')
  const surveyTitle = `Новый опрос ${today}`

  const initialFormValues = {
    name: surveyTitle,
    department: [] as string[],
    startedAt: null,
    finishedAt: null,
    comment: '',
    isFavorite: false,
    questions: [] as TQuestion[]
  }

  const formData = useCreateSurvey(initialFormValues)

  const { submitSurvey, isSubmitting } = useSurveyMutation(formData)

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
          <MultySelect
            label={'Кто участвует'}
            data={['Test1', 'Test2', 'Test3']}
            nothingFoundMessage={areParticipantsLoading ? 'Загрузка...' : 'Ничего не найдено'}
            key={formData.key('department')}
            {...formData.getInputProps('department')}
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
                onOpenButtons={() => {
                  console.log('Sidebar')
                }}
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
      </Flex>
    </form>
  )
}

export default SurveyForm
