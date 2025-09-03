export const getCookie = (name: string): object | undefined => {
  if (!name) {
    return undefined
  }

  const cookiesStrArr = document.cookie ? document.cookie.split('; ') : []

  for (const cookie of cookiesStrArr) {
    const [name, value] = cookie.split('=')
    if (decodeURIComponent(name) === name) {
      try {
        return JSON.parse(decodeURIComponent(value))
      } catch {
        return undefined
      }
    }
  }
  return undefined
}
