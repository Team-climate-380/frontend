export type Session = {
  isAuth: boolean
  email?: string
}

export type SessionActions = {
  login: (email: string) => void
  logout: () => void
}
