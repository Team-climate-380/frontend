export const getCookie = <T extends object>(name: string): T | undefined => {
  if (!name) {
    return undefined
  }

  const cookiesStrArr = document.cookie ? document.cookie.split('; ') : []

  for (const cookie of cookiesStrArr) {
    const [cookieName, cookieValue] = cookie.split('=')
    if (decodeURIComponent(cookieName) === name) {
      try {
        return JSON.parse(decodeURIComponent(cookieValue))
      } catch {
        return undefined
      }
    }
  }
  return undefined
}
