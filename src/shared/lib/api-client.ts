type HeadersType = Record<string, string>

type MethodType = 'PUT' | 'PATCH' | 'DELETE' | 'POST' | 'GET'

interface RequestType {
  url: string
  headers?: HeadersType
  method: MethodType
  body?: unknown
}

export class ApiClient {
  defaultHeaders: HeadersType
  baseUrl: string
  constructor(headers?: HeadersType) {
    this.baseUrl = import.meta.env.VITE_API_DOMAIN || ''
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...(headers || {})
    }
  }

  private async refreshTokens(): Promise<boolean> {
    try {
      const resp = await fetch(`${this.baseUrl}/api/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
        headers: this.defaultHeaders
      })
      return resp.ok
    } catch {
      return false
    }
  }

  private async doFetch(input: RequestType): Promise<Response> {
    const { url, headers, method, body } = input
    return fetch(`${this.baseUrl}${url}`, {
      method,
      credentials: 'include',
      headers: {
        ...this.defaultHeaders,
        ...(headers || {})
      },
      body: body !== undefined ? JSON.stringify(body) : undefined
    })
  }

  private async request<T>({
    url,
    headers,
    method,
    body
  }: RequestType): Promise<
    { status: string; error: unknown; message: string; statusCode?: number } | { status: string; data: T }
  > {
    try {
      let response = await this.doFetch({ url, headers, method, body })

      if (response.status === 401 && !url.startsWith('/api/auth/refresh')) {
        const refreshed = await this.refreshTokens()
        if (refreshed) {
          response = await this.doFetch({ url, headers, method, body })
        }
      }

      const contentType = response.headers.get('content-type') || ''

      let data
      if (response.status === 204 || response.headers.get('content-length') === '0') {
        data = {} as T
      } else if (contentType.includes('application/json')) {
        data = await response.json().catch(() => ({}))
      } else {
        const text = await response.text().catch(() => '')
        data = text.trim() === '' ? {} : { message: text.trim() }
      }

      if (!response.ok) {
        return {
          status: 'error',
          error: data,
          message: data?.message || response.statusText || 'Unexpected error',
          statusCode: response.status
        }
      }

      return { status: 'success', data }
    } catch (error: unknown) {
      return {
        status: 'error',
        error,
        message: error instanceof Error ? error.message : 'Unexpected error'
      }
    }
  }

  async get<T>(url: string, headers?: HeadersType) {
    return this.request<T>({ url, headers, method: 'GET' })
  }

  async post<T>(url: string, body?: unknown, headers?: HeadersType) {
    return this.request<T>({ url, headers, method: 'POST', body })
  }

  async put<T>(url: string, headers?: HeadersType, body?: unknown) {
    return this.request<T>({ url, headers, method: 'PUT', body })
  }

  async patch<T>(url: string, body?: unknown, headers?: HeadersType) {
    return this.request<T>({ url, headers, method: 'PATCH', body })
  }

  async delete<T>(url: string, headers?: HeadersType) {
    return this.request<T>({ url, headers, method: 'DELETE' })
  }
}

export const apiClient = new ApiClient()
