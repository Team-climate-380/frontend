export type typeParams = Record<string, string>

export const createUrl = <T extends Record<string, string> = typeParams, Q extends Record<string, string> = typeParams>(
  uri: string,
  params: T = {} as T,
  queryParams: Q = {} as Q
): string => {
  const formattedUri = uri.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => encodeURIComponent(params[key] ?? `:${key}`))

  const queryString = Object.entries(queryParams)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')

  return queryString ? `${formattedUri}?${queryString}` : formattedUri
}
