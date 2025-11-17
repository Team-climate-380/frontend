import { useInfiniteQuery } from '@tanstack/react-query'
import { useQueryParams } from '@/shared/hooks/useQueryParams'
import { getQuestions } from '@/entities/question/api/get-questions'
import { IQuestion } from '@/entities/question/type'

export const UseQuestionsQuery = () => {
  const { queryParams } = useQueryParams()

  const currentFilter = queryParams.filter ?? 'all'
  const currentPage = Number(queryParams.page ?? '1')
  const currentPerPage = Number(queryParams.per_page ?? '20')
  const currentSearch = queryParams.search ?? ''

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = useInfiniteQuery({
    queryKey: ['questions', currentFilter, currentPerPage, currentSearch],
    queryFn: async ({ pageParam = currentPage }) =>
      await getQuestions({
        filter: currentFilter,
        page: pageParam,
        per_page: currentPerPage,
        search: currentSearch
      }),
    initialPageParam: 1,
    getNextPageParam: lastPage => (lastPage?.has_next ? lastPage.page + 1 : undefined)
  })

  const numList =
    data?.pages
      .flatMap(pageItem => pageItem?.data)
      .filter((q): q is IQuestion => Boolean(q))
      .reverse() ?? []

  const totalLength = data?.pages[0]?.total ?? 0

  const questions = numList.map((question, index) => {
    return {
      ...question,
      numeration: totalLength - index
    }
  })

  return { questions, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error }
}
