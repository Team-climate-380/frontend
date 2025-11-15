import { Input } from '@/shared/ui/input'
import { FunctionComponent, useEffect } from 'react'
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
import { TQuestion } from '@/entities/question/model/types'
import { useQuery } from '@tanstack/react-query'
import { fetchParticipants, fetchSurveyById } from '@/entities/survey/api/api'
import { useSurveyMutation } from '@/entities/survey/forms/lib/use-survey-mutation'
import { useSearchParams } from 'react-router-dom'
import { SurveyResults } from '@/entities/survey-results/results-model'
import { IInitialValues } from '@/entities/survey/forms/lib/use-survey'

const fromApi = (api: SurveyResults): IInitialValues => ({
  name: api.name,
  comment: api.comment ?? '',
  startedAt: api.started_at ? dayjs(api.started_at).toDate() : null,
  finishedAt: api.finished_at ? dayjs(api.finished_at).toDate() : null,
  isFavorite: !!api.is_favorite,
  department: api.department ? String(api.department.name) : null,
  questions: api.questions.map(q => ({
    id: q.id,
    text: q.text,
    question_type: q.type,
    is_favorite: false
  }))
})

const EditSurveyForm: FunctionComponent = () => {
  const [searchParams] = useSearchParams()
  const surveyIdStr = searchParams.get('surveyId')
  const idSurvey = surveyIdStr ? Number(surveyIdStr) : undefined
  const isEdit = !!idSurvey

  const { data: departmentOptions, isLoading: areParticipantsLoading } = useQuery({
    queryKey: ['participants'],
    queryFn: fetchParticipants
  })

  const initialFormValues = {
    name: '',
    department: '',
    startedAt: null,
    finishedAt: null,
    comment: '',
    isFavorite: false,
    questions: [] as TQuestion[]
  }

  const formData = useSurvey(initialFormValues)
  const querySurvey = useQuery({
    queryKey: ['survey', idSurvey] as const,
    enabled: isEdit,
    queryFn: () => fetchSurveyById(idSurvey!),
    staleTime: 5 * 60 * 1000
  })

  useEffect(() => {
    if (querySurvey.data) {
      formData.setValues(fromApi(querySurvey.data))
    }
  }, [querySurvey.data])

  const { submitSurvey, isSubmitting, isError, isSuccess } = useSurveyMutation(
    formData,
    isEdit ? { mode: 'edit', id: idSurvey! } : { mode: 'create' }
  )

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
      <Group justify="space-between" className={classes.buttonWithStatus}>
        <div>
          {isSuccess && <p className={classes.success}>Опрос успешно обновлен</p>}
          {isError && <p className={classes.error}>Ошибка при обновлении опроса</p>}
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Сохраняется...' : 'Сохранить'}
        </Button>
      </Group>
    </form>
  )
}

export default EditSurveyForm
