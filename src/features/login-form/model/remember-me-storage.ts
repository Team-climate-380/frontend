const REMEMBER_KEY = 'rememberMy'

export function saveAuthMode(remember: boolean) {
  if (remember) {
    localStorage.setItem(REMEMBER_KEY, '1')
    sessionStorage.removeItem(REMEMBER_KEY)
  } else {
    sessionStorage.setItem(REMEMBER_KEY, '1')
    localStorage.removeItem(REMEMBER_KEY)
  }
}

export function hasSavedAuth() {
  return !!localStorage.getItem(REMEMBER_KEY) || !!sessionStorage.getItem(REMEMBER_KEY)
}

export function clearAuthMode() {
  localStorage.removeItem(REMEMBER_KEY)
  sessionStorage.removeItem(REMEMBER_KEY)
}
