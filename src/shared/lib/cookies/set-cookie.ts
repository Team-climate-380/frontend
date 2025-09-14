export const setCookie = (name: string, options: { expired: Date; data: object }) => {
  if (!name) {
    return
  }

  const expiredDate = options.expired.toUTCString()

  const encodedData = encodeURIComponent(JSON.stringify(options.data))

  const cookieString = `${encodeURIComponent(name)}=${encodedData}; Expires=${expiredDate}`

  document.cookie = cookieString
}
