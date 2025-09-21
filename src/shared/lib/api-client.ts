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
    this.baseUrl = import.meta.env.VITE_API_DOMAIN || 'http://localhost:3000'
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...(headers || {})
    }
  }
  private async request<T>({
    url,
    headers,
    method,
    body
  }: RequestType): Promise<{ status: string; error: unknown; message: string } | { status: string; data: T }> {
    try {
      const response = await fetch(`${this.baseUrl}${url}`, {
        method: method,
        body: body ? JSON.stringify(body) : undefined,
        headers: {
          ...this.defaultHeaders,
          ...(headers || {})
        }
      })
      const data = await response.json()
      if (!response.ok) {
        return {
          status: 'error',
          error: data,
          message: data?.message || 'Unexpected error'
        }
      }
      return {
        status: 'success',
        data
      }
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

  async post<T>(url: string, headers?: HeadersType, body?: unknown) {
    return this.request<T>({ url, headers, method: 'POST', body })
  }

  async put<T>(url: string, headers?: HeadersType, body?: unknown) {
    return this.request<T>({ url, headers, method: 'PUT', body })
  }

  async patch<T>(url: string, headers?: HeadersType, body?: unknown) {
    return this.request<T>({ url, headers, method: 'PATCH', body })
  }

  async delete<T>(url: string, headers?: HeadersType) {
    return this.request<T>({ url, headers, method: 'DELETE' })
  }
}
