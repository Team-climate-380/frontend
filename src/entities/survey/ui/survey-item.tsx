import React, { SyntheticEvent } from 'react'
import { ListItem } from '@mantine/core'
import { SurveyStatusIcon } from '@entities/survey/ui/survey-status-icon'
import { FavoriteIconFilled } from '@/shared/ui/icons/favorite-icon-filled'
import { useNavigate } from 'react-router'

export interface SurveyItemProps {
  surveyId: number
  name: string
  status: string
  comment: string
  isFavorite: boolean
  finishedCount: number
  allCount: number
  departmentName: string
  className: string
  onContextMenu: (e: SyntheticEvent, id?: number) => void
  children: React.ReactNode
  isDelete: boolean
}

export const SurveyItem: React.FC<SurveyItemProps> = ({
  surveyId,
  name,
  status,
  isFavorite,
  finishedCount,
  allCount,
  departmentName,
  className,
  onContextMenu,
  children,
  isDelete
}) => {
  const navigate = useNavigate()
  return (
    <>
      <ListItem
        className={className}
        onContextMenu={onContextMenu}
        onClick={() => !isDelete && navigate(`/results-survey?surveyId=${surveyId}`)}
        icon={
          isFavorite ? (
            <>
              <SurveyStatusIcon status={status} finishedCount={finishedCount} allCount={allCount} />
              <FavoriteIconFilled fill={'#FFD014'} width="11" height="11" />
            </>
          ) : (
            <SurveyStatusIcon status={status} finishedCount={finishedCount} allCount={allCount} />
          )
        }
        style={{
          overflowWrap: 'break-word',
          wordWrap: 'break-word',
          wordBreak: 'break-word'
        }}
      >
        {`${name} (${departmentName})`}
        {children}
      </ListItem>
    </>
  )
}
