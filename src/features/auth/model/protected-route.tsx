import { Navigate } from 'react-router-dom'
import { routes } from '@/shared/configs/routs/routes.config'
import { ReactNode } from 'react'
import { useSessionState } from '../../session/model/store'

interface ProtectedRouteProps {
  children: ReactNode
  onlyUnAuth?: boolean
}

export const ProtectedRoute = ({ children, onlyUnAuth = false }: ProtectedRouteProps) => {
  const { isAuth } = useSessionState()
  if (isAuth && onlyUnAuth) {
    //пользователь авторизован и страница не для авторизованного пользователя
    return <Navigate to={routes.home()} replace />
  }
  if (!isAuth && !onlyUnAuth) {
    //пользователь не авторизован и страница для авторизованного пользователя
    return <Navigate to={routes.login()} replace />
  }

  return children
}
