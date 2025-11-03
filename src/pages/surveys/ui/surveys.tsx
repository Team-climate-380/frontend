import { useNavigate } from 'react-router'
import { useEffect, useMemo } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useIntersection } from '@mantine/hooks'
import { useQueryParams } from '@/shared/hooks/useQueryParams'
import { routes } from '@/shared/configs/routs/routes.config'
import { getAllSurveys } from '@entities/survey/api/api'
import { List } from '@mantine/core'
import { Header } from '@widgets/header/header'
import { Filter } from '@/features/filters'
import { SearchInput } from '@/widgets/search-input'
import { StatusEnum } from '@entities/survey-results/results-model'
import { FavoriteIcon } from '@/features/filters/ui/favorite-icon'
import { SurveyItem } from '@features/survey-item'
import { Loader } from '@shared/ui/loader'
import { Skeleton } from '@shared/ui/skeleton'
import { Button } from '@shared/ui/button'
import classes from './styles.module.scss'

const Surveys: React.FC = () => {
  const { ref, entry } = useIntersection({
    root: null,
    threshold: 1
  })

  const navigate = useNavigate()

  const { queryParams, setParams } = useQueryParams()
  const filters = [
    {
      icon: <FavoriteIcon />,
      value: 'favorite',
      setValue: () => {
        setParams({ filter: 'favorite', page: '1', per_page: '20' }, true)
      }
    },
    {
      title: 'Все',
      value: 'all',
      setValue: () => {
        setParams({ filter: 'all', page: '1', per_page: '20' }, true)
      }
    },
    {
      title: 'Текущие',
      value: 'current',
      setValue: () => {
        setParams({ filter: 'current', page: '1', per_page: '20' }, true)
      }
    },
    {
      title: 'Черновики',
      value: 'drafts',
      setValue: () => {
        setParams({ filter: 'drafts', page: '1', per_page: '20' }, true)
      }
    },
    {
      title: 'Завершённые',
      value: 'finished',
      setValue: () => {
        setParams({ filter: 'finished', page: '1', per_page: '20' }, true)
      }
    },
    {
      title: 'Архив',
      value: 'archive',
      setValue: () => {
        setParams({ filter: 'archive', page: '1', per_page: '20' }, true)
      }
    }
  ]
  const currentFilter = queryParams?.filter ?? 'all'
  const currentPage = Number(queryParams.page ?? '1')
  const currentDepartment = Number(queryParams?.department)
  const searchQuery = queryParams?.search?.toLowerCase()

  const { status, data, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery({
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

  const completedSurveys = useMemo(() => {
    return allSurveys?.filter(item => item?.status === StatusEnum.Completed)
  }, [allSurveys])

  const activeSurveys = useMemo(() => {
    return allSurveys?.filter(item => item?.status === StatusEnum.Active)
  }, [allSurveys])

  const draftSurveys = useMemo(() => {
    return allSurveys?.filter(item => item?.status === StatusEnum.Draft)
  }, [allSurveys])

  const archivedSurveys = useMemo(() => {
    return allSurveys?.filter(item => item?.status === StatusEnum.Archived)
  }, [allSurveys])

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
        ) : (
          <>
            <List
              styles={{
                root: { display: 'flex', flexDirection: 'column', gap: '20px' },
                itemWrapper: { display: 'grid', gridTemplateColumns: 'min-content 1fr' },
                itemIcon: {
                  display: 'grid',
                  alignItems: 'center',
                  gap: '12px',
                  gridTemplateColumns: 'minmax(35px, 1fr)',
                  justifyItems: 'center',
                  gridAutoFlow: 'column'
                }
              }}
            >
              <SurveyItem surveys={draftSurveys} />
              <SurveyItem surveys={activeSurveys} />
              <SurveyItem surveys={completedSurveys} />
              <SurveyItem surveys={archivedSurveys} />
            </List>
            <div ref={ref}>{isFetchingNextPage && <Loader />}</div>
          </>
        )}
      </div>
    </>
  )
}

export default Surveys
