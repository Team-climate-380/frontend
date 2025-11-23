import { useMutation } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { createSurvey, updateSurvey } from '@entities/survey/api/api'
import { UseFormReturnType } from '@mantine/form'
import { TQuestion } from '@/entities/question/model/types'
import { IInitialValues } from './use-survey'
import { useLocation, useNavigate } from 'react-router'
import { routes } from '@/shared/configs/routs'

type Mode = { mode: 'create' } | { mode: 'edit'; id: number }

export const useSurveyMutation = (form: UseFormReturnType<IInitialValues>, mode?: Mode) => {
  const navigate = useNavigate()
  const location = useLocation()
  const {
    mutate: submitSurvey,
    isPending: isSubmitting,
    isError,
    isSuccess
  } = useMutation({
    mutationFn: (values: IInitialValues) => {
      const payload = {
        name: values.name,
        comment: values.comment,
        department_name: values.department?.trim(),
        is_favorite: values.isFavorite,
        started_at: values.startedAt ? dayjs(values.startedAt).format('YYYY-MM-DD') : '',
        finished_at: values.finishedAt ? dayjs(values.finishedAt).format('YYYY-MM-DD') : '',
        questions: values.questions.map((question: TQuestion) => {
          return { id: question.id }
        })
      }
      if (mode?.mode === 'edit') {
        return updateSurvey(payload, mode.id)
      }
      return createSurvey(payload)
    },
    onSuccess: () => {
      form.reset()
      if (mode?.mode !== 'edit') {
        navigate(routes.surveys())
      } else if (location.key !== 'default') {
        navigate(-1)
      } else {
        navigate(routes.surveys())
      }
    },
    onError: error => {
      console.error('Ошибка:', error)
    }
  })

  return { submitSurvey, isSubmitting, isError, isSuccess }
}
