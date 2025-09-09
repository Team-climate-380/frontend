import { useLocation, useNavigate } from 'react-router-dom'
import { useCallback, useMemo } from 'react'

export function useQueryParams() {
  const location = useLocation()
  const navigate = useNavigate()

  const queryParams = useMemo(() => {
    const params = new URLSearchParams(location.search)
    const result: Record<string, string> = {}
    params.forEach((value, key) => {
      result[key] = value
    })
    return result
  }, [location.search])

  const getParam = useCallback(
    (param: string): string | undefined => {
      return queryParams[param]
    },
    [queryParams]
  )

  const setParams = useCallback(
    (newParams: Record<string, string>, replaceHistory: boolean) => {
      const searchParams = new URLSearchParams()
      Object.entries(newParams).forEach(([key, value]) => {
        searchParams.set(key, value)
      })

      navigate(
        {
          pathname: location.pathname,
          search: `?${searchParams.toString()}`
        },
        { replace: replaceHistory }
      )
    },
    [navigate, location.pathname]
  )

  return { queryParams, getParam, setParams }
}
