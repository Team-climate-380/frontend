import React, { SyntheticEvent } from 'react'
import { ListItem } from '@mantine/core'
import { SurveyStatusIcon } from '@entities/survey/ui/survey-status-icon'
import { FavoriteIconFilled } from '@/shared/ui/icons/favorite-icon-filled'

export interface SurveyItemProps {
  id: number
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
}

export const SurveyItem: React.FC<SurveyItemProps> = ({
  id,
  name,
  status,
  isFavorite,
  finishedCount,
  allCount,
  departmentName,
  className,
  onContextMenu,
  children
}) => {
  return (
    <>
      <ListItem
        key={id}
        className={className}
        onContextMenu={onContextMenu}
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
      >
        {`${name} (${departmentName})`}
        {children}
      </ListItem>
    </>
  )
}
