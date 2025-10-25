import { ReactNode } from 'react'
import { ListItem, Text } from '@mantine/core'
import { routes } from '@shared/configs/routs'
import { deleteSurvey } from '@entities/survey/forms/api'
import { useContextMenu } from '@/shared/hooks/use-context-menu.ts'
import { SurveyResults, StatusEnum } from '@entities/survey-results/results-model'
import { PopupMenu } from '@shared/ui/popup-menu/index.ts'
import { FavoriteIconFilled } from '@/shared/ui/icons/favorite-icon-filled'
import classes from './styles.module.scss'

export interface ListItemSurveyProps {
  surveys: SurveyResults[]
  element?: ReactNode
}

export const ListItemSurvey: React.FC<ListItemSurveyProps> = ({ surveys, element }) => {
  const { contextMenu, handleRightClick, handleContextMenuClose } = useContextMenu()

  return (
    <>
      {surveys?.map((item: SurveyResults) => (
        <ListItem
          key={item.id}
          className={classes.item}
          onContextMenu={evt => handleRightClick(evt, item.id)}
          icon={
            item.is_favorite ? (
              <>
                {item?.status === StatusEnum.Active ? (
                  <Text size="xs" c={'#75899C'}>
                    {item.finished_count}/{item.question_count}
                  </Text>
                ) : (
                  element
                )}
                <FavoriteIconFilled fill={'#FFD014'} width="11" height="11" />
              </>
            ) : (
              <>
                {item?.status === StatusEnum.Active ? (
                  <Text size="xs" c={'#75899C'}>
                    {item.finished_count}/{item.question_count}
                  </Text>
                ) : (
                  element
                )}
              </>
            )
          }
        >
          {`${item.name} (${item.department?.name})`}
          <span className={classes.comment}>{item.comment ?? ''}</span>

          {contextMenu.isVisible && contextMenu.selectedId === item.id && (
            <PopupMenu
              type={'context'}
              items={[
                {
                  type: 'link',
                  label: 'Редактировать',
                  // change on url for edit survey
                  url: routes.new_survey()
                },
                {
                  type: 'divider'
                },
                {
                  type: 'action',
                  label: 'Удалить',
                  important: true,
                  action: () => deleteSurvey(contextMenu?.selectedId)
                }
              ]}
              onClose={handleContextMenuClose}
            />
          )}
        </ListItem>
      ))}
    </>
  )
}
