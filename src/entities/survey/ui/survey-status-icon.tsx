import { Text } from '@mantine/core'
import { StatusEnum } from '@entities/survey-results/results-model'
import { IconCompletedSurvey } from '@shared/ui/icons/icon-completed-survey'

export interface SurveyStatusIconProps {
  status: string
  finishedCount?: number
  allCount?: number
}

export const SurveyStatusIcon: React.FC<SurveyStatusIconProps> = ({ status, finishedCount, allCount }) => {
  if (status === StatusEnum.Active)
    return (
      <Text size="xs" c={'#75899C'}>
        {finishedCount}/{allCount}
      </Text>
    )
  if (status === StatusEnum.Draft)
    return (
      <Text
        size="xs"
        c={'#75899C'}
        tt="uppercase"
        fw={700}
        styles={{
          root: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#EFF1F3',
            padding: '5px 2px',
            width: '19px',
            height: '17px',
            borderRadius: '5%'
          }
        }}
      >
        ч
      </Text>
    )
  if (status === StatusEnum.Completed) return <IconCompletedSurvey />

  return null
}
