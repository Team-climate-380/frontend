import { create } from 'zustand'
import { Session, SessionActions } from './types'
import { getCookie, setCookie } from '@/shared/lib/cookies'
import { SESSION_COOKIE_NAME, SESSION_EXP_TIME } from './constants'
import { deleteCookie } from '@/shared/lib/cookies/set-cookie'
import { clearAuthMode, hasSavedAuth } from '@/features/login-form/model/remember-me-storage'

const initialState: Session = {
  isAuth: false,
  email: undefined
}

export const useSessionState = create<Session & SessionActions>(set => {
  return {
    isAuth: initialState.isAuth,
    email: initialState.email,

    login: (email: string) => {
      const newState: Session = {
        isAuth: true,
        email
      }

      const currentDate = new Date()
      currentDate.setTime(currentDate.getTime() + SESSION_EXP_TIME)

      set(newState)
      setCookie(SESSION_COOKIE_NAME, { expired: currentDate, data: newState })
    },

    logout: () => {
      set(initialState)
      deleteCookie(SESSION_COOKIE_NAME)
      clearAuthMode()
    }
  }
})

export const stateInitialization = () => {
  try {
    if (typeof window !== 'undefined' && !hasSavedAuth()) {
      return
    }

    const cookie = getCookie<Session>(SESSION_COOKIE_NAME)

    if (cookie && cookie.isAuth) {
      useSessionState.setState({
        isAuth: cookie.isAuth,
        email: cookie.email
      })
    }
  } catch (error) {
    console.log('session cookie error', error)
  }
}
