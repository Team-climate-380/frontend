import clsx from 'clsx'
import { useDepartmentQuery } from '@/entities/groups/api/departments-api'
import { useContextMenu } from '@/shared/hooks/use-context-menu'
import { routes } from '@shared/configs/routs'
import { ListItem } from '@mantine/core'
import { SurveyResults } from '@entities/survey-results/results-model'
import { PopupMenu } from '@shared/ui/popup-menu/index'
import { SurveyStatusIcon } from '@entities/survey/ui/survey-status-icon'
import { SurveyDeleteIcon } from '@entities/survey/ui/survey-delete-icon'
import { useDeleteSurveyMutation } from '@/entities/survey/api/api'
import { FavoriteIconFilled } from '@/shared/ui/icons/favorite-icon-filled'
import classes from './styles.module.scss'

export interface SurveyItemProps {
  surveys: SurveyResults[]
}

export const SurveyItem: React.FC<SurveyItemProps> = ({ surveys }) => {
  const { contextMenu, handleRightClick, handleContextMenuClose } = useContextMenu()
  const { data } = useDepartmentQuery()

  const { deleteSurveyMutate, cancelDeleteSurveyMutate } = useDeleteSurveyMutation()

  return (
    <>
      {surveys?.map((item: SurveyResults) => {
        const departmentName = data?.find(dep => dep.department_name === item.department?.name)
        let employeeCount: number = 0
        if (departmentName) {
          employeeCount = departmentName.employees_count
        }

        return (
          <ListItem
            key={item.id}
            className={clsx(classes.item, item.to_delete && classes.itemToDelete)}
            onContextMenu={evt => handleRightClick(evt, item.id)}
            icon={
              item.is_favorite ? (
                <>
                  <SurveyStatusIcon status={item.status} finishedCount={item.finished_count} allCount={employeeCount} />
                  <FavoriteIconFilled fill={'#FFD014'} width="11" height="11" />
                </>
              ) : (
                <SurveyStatusIcon status={item?.status} finishedCount={item.finished_count} allCount={employeeCount} />
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
                    url: routes.edit_survey(contextMenu?.selectedId)
                  },
                  {
                    type: 'divider'
                  },
                  {
                    type: 'action',
                    label: 'Удалить',
                    important: true,
                    action: () => {
                      deleteSurveyMutate(contextMenu?.selectedId)
                      handleContextMenuClose()
                    }
                  }
                ]}
                onClose={handleContextMenuClose}
              />
            )}
            <SurveyDeleteIcon
              isAddedToDelete={item.to_delete}
              handleClick={e => {
                e.preventDefault()

                item.to_delete = !item.to_delete
                cancelDeleteSurveyMutate(item)
              }}
            />
          </ListItem>
        )
      })}
    </>
  )
}
