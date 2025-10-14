import { useMutation } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { createSurvey } from '../api'
import { UseFormReturnType } from '@mantine/form'
import { TQuestion } from '@/entities/question/model/types'
import { IInitialValues } from './use-create-survey'

export const useSurveyMutation = (form: UseFormReturnType<IInitialValues>) => {
  const { mutate: submitSurvey, isPending: isSubmitting } = useMutation({
    mutationFn: (values: IInitialValues) => {
      const payload = {
        name: values.name,
        comment: values.comment,
        department: values.department ? { department_name: values.department[0] } : null,
        is_favorite: values.isFavorite,
        started_at: values.startedAt ? dayjs(values.startedAt).format('YYYY-MM-DD') : null,
        finished_at: values.finishedAt ? dayjs(values.finishedAt).format('YYYY-MM-DD') : null,
        questions: values.questions.map((question: TQuestion) => {
          const newQuestion = question
          delete newQuestion.id
          return newQuestion
        })
      }
      return createSurvey(payload)
    },
    onSuccess: () => {
      console.log('Опрос успешно создан!')
      form.reset()
    },
    onError: error => {
      console.error('Ошибка при создании опроса:', error)
    }
  })

  return { submitSurvey, isSubmitting }
}
