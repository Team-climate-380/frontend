import clsx from 'clsx'
import { useNavigate } from 'react-router'
import { useEffect, useMemo } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useIntersection } from '@mantine/hooks'
import { useToggleSurveyMutation } from '@/entities/survey/api/api'
import { useDepartmentQuery } from '@/entities/groups/api/departments-api'
import { useQueryParams } from '@/shared/hooks/useQueryParams'
import { useContextMenu } from '@/shared/hooks/use-context-menu'
import { routes } from '@/shared/configs/routs/routes.config'
import { getAllSurveys } from '@entities/survey/api/api'
import { List } from '@mantine/core'
import { Header } from '@widgets/header/header'
import { Filter } from '@/features/filters'
import { TextNotification } from '@shared/ui/text-notification/text-notification'
import { SearchInput } from '@/widgets/search-input'
import { PopupMenu } from '@shared/ui/popup-menu/index'
import { SurveyItem } from '@entities/survey/ui/survey-item'
import { SurveyCancelDelete } from '@entities/survey/ui/survey-cancel-delete'
import { FavoriteIcon } from '@/features/filters/ui/favorite-icon'
import { Loader } from '@shared/ui/loader'
import { Skeleton } from '@shared/ui/skeleton'
import { Button } from '@shared/ui/button'
import { SurveyResults } from '@entities/survey-results/results-model'
import classes from './styles.module.scss'

const Surveys: React.FC = () => {
  const navigate = useNavigate()
  const { queryParams, setParams } = useQueryParams()
  const { contextMenu, handleRightClick, handleContextMenuClose } = useContextMenu()
  const { deleteSurveyMutate, cancelDeleteSurveyMutate, toggleFavoriteMutate } = useToggleSurveyMutation()
  const { data: departmentData } = useDepartmentQuery()

  const currentDepartment = queryParams?.department ?? ''
  const currentFilter = queryParams?.status ?? 'all'
  const currentPage = Number(queryParams.page ?? '1')
  const searchQuery = queryParams?.search ? decodeURIComponent(queryParams?.search?.toLowerCase()) : ''

  const filters = [
    {
      icon: <FavoriteIcon />,
      value: 'favorite',
      setValue: () => {
        setParams({ status: 'favorite', page: '1', per_page: '20', department: currentDepartment }, true)
      }
    },
    {
      title: 'Все',
      value: 'all',
      setValue: () => {
        setParams({ status: 'all', page: '1', per_page: '20', department: currentDepartment }, true)
      }
    },
    {
      title: 'Текущие',
      value: 'active',
      setValue: () => {
        setParams({ status: 'active', page: '1', per_page: '20', department: currentDepartment }, true)
      }
    },
    {
      title: 'Черновики',
      value: 'drafts',
      setValue: () => {
        setParams({ status: 'drafts', page: '1', per_page: '20', department: currentDepartment }, true)
      }
    },
    {
      title: 'Завершённые',
      value: 'finished',
      setValue: () => {
        setParams({ status: 'finished', page: '1', per_page: '20', department: currentDepartment }, true)
      }
    },
    {
      title: 'Архив',
      value: 'archive',
      setValue: () => {
        setParams({ status: 'archive', page: '1', per_page: '20', department: currentDepartment }, true)
      }
    }
  ]

  const { ref, entry } = useIntersection({
    root: null,
    threshold: 1
  })

  const { status, error, data, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['surveys', currentFilter, currentDepartment, searchQuery],
    queryFn: ({ pageParam = currentPage }) => {
      return getAllSurveys(pageParam, currentFilter, currentDepartment, searchQuery)
    },
    initialPageParam: 1,
    getNextPageParam: lastPage => (lastPage?.has_next ? lastPage.page + 1 : undefined)
  })

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [entry?.isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage])

  const allSurveys = useMemo(() => {
    return data?.pages?.flatMap(page => page?.data) || []
  }, [data])

  return (
    <>
      <Header
        title={'Опросы'}
        actions={
          <>
            <SearchInput />
            <Button onClick={() => navigate(routes.new_survey())}>Новый опрос</Button>
          </>
        }
      >
        <Filter filters={filters} value={currentFilter} />
      </Header>

      <div className={classes.container}>
        {status === 'pending' ? (
          <Skeleton />
        ) : error ? (
          <TextNotification variant={'data_not_loaded'} />
        ) : (
          <>
            <List
              styles={{
                root: { display: 'flex', flexDirection: 'column', gap: '20px' },
                itemWrapper: {
                  display: 'grid',
                  gridTemplateColumns: 'min-content 1fr',
                  gridTemplateRows: '1fr 1fr'
                },
                itemIcon: {
                  display: 'grid',
                  gridRow: '1/2',
                  placeItems: 'center',
                  gap: '12px',
                  gridTemplateColumns: 'minmax(35px, 1fr)',
                  justifyItems: 'center',
                  gridAutoFlow: 'column'
                },
                itemLabel: {
                  display: 'grid',
                  gridRow: '1/3',
                  columnGap: '15px',
                  gridTemplateColumns: 'minmax(min-content, max-content) 1fr',
                  gridTemplateRows: '1fr auto',
                  alignSelf: 'start',
                  marginTop: '-3px'
                }
              }}
            >
              {allSurveys.length === 0 ? (
                <TextNotification variant={'no_search_result'} />
              ) : (
                allSurveys?.map((item: SurveyResults) => {
                  const departmentName = departmentData?.find(dep => dep.department_name === item.department?.name)
                  let employeeCount: number = 0
                  if (departmentName) {
                    employeeCount = departmentName.employees_count
                  }
                  return (
                    <SurveyItem
                      key={item.id}
                      surveyId={item.id}
                      name={item.name}
                      status={item.status}
                      comment={item.comment}
                      isFavorite={item.is_favorite}
                      finishedCount={item.finished_count}
                      allCount={employeeCount}
                      departmentName={item.department?.name}
                      className={clsx(classes.item, { [classes.itemToDelete]: item.to_delete })}
                      onContextMenu={evt => handleRightClick(evt, item.id)}
                    >
                      <span className={classes.comment}>{item.comment ?? ''}</span>

                      {contextMenu.isVisible && contextMenu.selectedId === item.id && !item.to_delete && (
                        <PopupMenu
                          type={'context'}
                          items={[
                            {
                              type: 'action',
                              label: 'Редактировать',
                              action: () => navigate(routes.edit_survey(item.id))
                            },
                            {
                              type: 'action',
                              label: item.is_favorite === true ? 'Убрать из избранного' : 'В избранное',
                              action: () => {
                                toggleFavoriteMutate(item)
                                handleContextMenuClose()
                              }
                            },
                            {
                              type: 'divider'
                            },
                            {
                              type: 'action',
                              label: 'Удалить',
                              important: true,
                              action: () => {
                                deleteSurveyMutate(item.id)
                                handleContextMenuClose()
                              }
                            }
                          ]}
                          onClose={handleContextMenuClose}
                          positionX={contextMenu?.left}
                          positionY={contextMenu?.top}
                        />
                      )}

                      <SurveyCancelDelete
                        isAddedToDelete={item.to_delete}
                        handleClick={e => {
                          e.preventDefault()

                          cancelDeleteSurveyMutate({ ...item, to_delete: !item.to_delete })
                        }}
                      />
                    </SurveyItem>
                  )
                })
              )}
            </List>

            <div ref={ref}>{isFetchingNextPage && <Loader />}</div>
          </>
        )}
      </div>
    </>
  )
}

export default Surveys
