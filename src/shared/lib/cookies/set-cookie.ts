export const setCookie = (name: string, options: { expired: Date; data: object }) => {
  if (!name) {
    return
  }

  const expiredDate = options.expired.toUTCString()

  const encodedData = encodeURIComponent(JSON.stringify(options.data))

  const cookieString = `${encodeURIComponent(name)}=${encodedData}; Expires=${expiredDate}`

  document.cookie = cookieString
}

export const deleteCookie = (name: string) => {
  document.cookie = `${encodeURIComponent(name)}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`
}
