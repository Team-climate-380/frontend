import { Input } from '@/shared/ui/input'
import { FunctionComponent, useEffect, useState } from 'react'
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
import QuestionCreate from '../question-create/question-create'
import { ApiClient } from '@/shared/lib/api-client'
import { TQuestion } from '@/entities/question/model/types'
import { TDepartment } from '@/entities/departament/model/types'
import { TEmployee } from '@/entities/employee/model/types'

const api = new ApiClient({})

const SurveyForm: FunctionComponent = () => {
  const today = dayjs().locale('ru').format('DD MMMM YYYY')
  const surveyTitle = `Новый опрос ${today}`
  const [, setParticipants] = useState<string[]>([])

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

  const handleFormSubmit = (values: typeof formData.values) => {
    const payload = {
      name: values.name,
      comment: values.comment,
      department: values.department ? { department_name: values.department[0] } : null,
      is_favorite: values.isFavorite,
      started_at: dayjs(values.startedAt).format('YYYY-MM-DD'),
      finished_at: dayjs(values.finishedAt).format('YYYY-MM-DD'),
      questions: values.questions.map(question => {
        const newQuestion = { ...question }
        delete newQuestion.id
        return newQuestion
      })
    }
    console.log('fromSurveyData:', payload)
    formData.reset()
  }
  useEffect(() => {
    async function getParticipants() {
      // TODO: сейчас department принимает объект, а не массив, также сервер не принимает список пользователей

      const [departmentsRes, employeesRes] = await Promise.all([
        api.get<TDepartment[]>('/api/departments/'),
        api.get<TEmployee[]>('/api/employees/')
      ])
      if ('data' in departmentsRes && 'data' in employeesRes) {
        const departmentOptions = departmentsRes.data.map(dep => dep.department_name)
        // const employeeOptions = employeesRes.data.map(emp => emp.full_name)
        setParticipants([...departmentOptions])
      }
    }

    getParticipants()
  }, [])

  return (
    <form onSubmit={formData.onSubmit(handleFormSubmit)}>
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
            data={['123', '234', '2341']}
            nothingFoundMessage="Ничего не найдено"
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
          <Button type="submit">Сохранить</Button>
        </Group>
      </Flex>
    </form>
  )
}

export default SurveyForm
