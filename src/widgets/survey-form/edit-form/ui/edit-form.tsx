import { Input } from '@/shared/ui/input'
import { FunctionComponent, useEffect } from 'react'
import classes from '../../styles/styles.module.scss'
import { Flex, Grid, Group, Select } from '@mantine/core'
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
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { SurveyResults } from '@/entities/survey-results/results-model'
import { IInitialValues } from '@/entities/survey/forms/lib/use-survey'
import { routes } from '@/shared/configs/routs'
import { QuestionCreate } from '@/entities/question/ui/question-create'
import { IQuestion } from '@/entities/question/type'
import { TextNotification } from '@/shared/ui/text-notification'
import { Skeleton } from '@/shared/ui/skeleton'

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
    question_type: q.question_type, //поменяла обратно на question_type, так как с бэка так приходит
    is_favorite: false
  }))
})

const IS_EDIT_ALLOWED = {
  draft: {
    name: true,
    department: true,
    startedAt: true,
    finishedAt: true,
    comment: true,
    questions: true,
    submit: true
  },
  active: {
    name: true,
    department: false,
    startedAt: false,
    finishedAt: true,
    comment: true,
    questions: false,
    submit: true
  },
  completed: {
    name: false,
    department: false,
    startedAt: false,
    finishedAt: false,
    comment: false,
    questions: false,
    submit: false
  },
  archived: {
    name: false,
    department: false,
    startedAt: false,
    finishedAt: false,
    comment: false,
    questions: false,
    submit: false
  },
  data_not_loaded: {
    name: false,
    department: false,
    startedAt: false,
    finishedAt: false,
    comment: false,
    questions: false,
    submit: false
  }
}

export interface EditSurveyFormProps {
  onOpenButtons: (index: number) => void
  selectQuestion: IQuestion | undefined
  indexQuestion: number | undefined
  scroll: () => void
  targetRef: React.RefObject<HTMLDivElement | null>
}

const EditSurveyForm: FunctionComponent<EditSurveyFormProps> = ({
  onOpenButtons,
  selectQuestion,
  indexQuestion,
  scroll,
  targetRef
}) => {
  const navigate = useNavigate()
  const location = useLocation()
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
  const querySurvey = useQuery({
    queryKey: ['survey', idSurvey] as const,
    enabled: isEdit,
    queryFn: () => fetchSurveyById(idSurvey!),
    staleTime: 5 * 60 * 1000
  })

  const isToDelete = querySurvey?.data?.to_delete
  const surveyStatus: keyof typeof IS_EDIT_ALLOWED = querySurvey?.data?.status ?? 'data_not_loaded'
  const formData = useSurvey(initialFormValues, surveyStatus)

  useEffect(() => {
    if (querySurvey.data) {
      formData.setValues(fromApi(querySurvey.data))
    }
    if (querySurvey.error?.message === '404') {
      navigate('/404')
    }
  }, [querySurvey.data, querySurvey.error])

  const { submitSurvey, isSubmitting, isError, isSuccess } = useSurveyMutation(
    formData,
    isEdit ? { mode: 'edit', id: idSurvey! } : { mode: 'create' }
  )

  function navigateBack() {
    if (location.key !== 'default') {
      navigate(-1)
    } else {
      navigate(routes.surveys())
    }
  }

  useEffect(() => {
    if (selectQuestion && typeof indexQuestion === 'number') {
      const currentQuestions = formData.getValues().questions
      const updatedQuestions = currentQuestions.map((question, index) =>
        index === indexQuestion ? selectQuestion : question
      )
      formData.setFieldValue('questions', updatedQuestions)
      formData.validateField(`questions.${indexQuestion}.text`)
    }
  }, [selectQuestion])

  return (
    <>
      {querySurvey.isLoading && (
        <div style={{ margin: '40px' }}>
          <Skeleton />
        </div>
      )}
      {querySurvey.isError && (
        <Group align="center" justify="space-between" gap="32px" m={40}>
          <TextNotification variant="data_not_loaded" />
          <CloseButton type="button" onClick={navigateBack} />
        </Group>
      )}
      {querySurvey.data && (
        <form onSubmit={formData.onSubmit(values => submitSurvey(values))}>
          <Grid className={classes.surveyForm} gutter={19}>
            <Grid.Col span={10.5}>
              <Input
                className={classes.lgTextInput}
                key={formData.key('name')}
                {...formData.getInputProps('name')}
                disabled={!IS_EDIT_ALLOWED[surveyStatus].name || isToDelete}
              />
            </Grid.Col>
            <Grid.Col span={1.5}>
              <Group align="center" justify="end" gap="32px">
                <CloseButton type="button" onClick={navigateBack} />
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
                disabled={!IS_EDIT_ALLOWED[surveyStatus].department || isToDelete}
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
                  disabled={!IS_EDIT_ALLOWED[surveyStatus].startedAt || isToDelete}
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
                  disabled={!IS_EDIT_ALLOWED[surveyStatus].finishedAt || isToDelete}
                />
              </Flex>
            </Grid.Col>
            <Grid.Col span={10.5}>
              <Input
                label={'Комментарий'}
                key={formData.key('comment')}
                {...formData.getInputProps('comment')}
                disabled={!IS_EDIT_ALLOWED[surveyStatus].comment || isToDelete}
              />
            </Grid.Col>
          </Grid>
          <Flex direction="column" className={classes.questionsSection}>
            <Flex direction="column" gap={25}>
              {formData.values.questions.map((question, index: number) => {
                return (
                  <QuestionCreate
                    key={question.id}
                    title={`${index + 1} Вопрос`}
                    onOpenButtons={() => onOpenButtons(index)}
                    onDelete={() => formData.removeListItem('questions', index)}
                    textInputProps={formData.getInputProps(`questions.${index}.text`)}
                    typeInputProps={formData.getInputProps(`questions.${index}.question_type`)}
                    editNotAllowed={!IS_EDIT_ALLOWED[surveyStatus].questions || isToDelete}
                  />
                )
              })}
            </Flex>
            <Group justify="space-between" className={classes.optionButtons}>
              <Button
                styles={{
                  root: {
                    padding: '10px 20px'
                  }
                }}
                className={classes.buttonGrey}
                variant="ghost"
                type="button"
                onClick={() => {
                  onOpenButtons(formData.getValues().questions.length)
                  formData.setFieldValue('questions', [
                    ...formData.values.questions,
                    { id: `question-${Date.now()}`, text: '', is_favorite: false }
                  ])
                  scroll()
                }}
                disabled={!IS_EDIT_ALLOWED[surveyStatus].questions || isToDelete}
              >
                Ещё вопрос
              </Button>
              <Button type="submit" disabled={isSubmitting || !IS_EDIT_ALLOWED[surveyStatus].submit || isToDelete}>
                {isSubmitting ? 'Сохраняется...' : 'Сохранить'}
              </Button>
            </Group>
            {isSuccess && <p className={classes.success}>Опрос успешно обновлен</p>}
            {isError && <p className={classes.error}>Ошибка при обновлении опроса, попробуйте еще один раз</p>}
          </Flex>
          <div ref={targetRef}></div>
        </form>
      )}
    </>
  )
}

export default EditSurveyForm
