import type { ApiResponse } from '../types'

const API_BASE_URL = `${window.location.origin}/api`

class JobService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = localStorage.getItem('token')

    const config: RequestInit = {
      ...options,
      headers: {
        ...(options.body instanceof FormData
          ? {} // ❗ Do NOT set Content-Type for FormData — browser will set the boundary
          : { 'Content-Type': 'application/json' }),
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config)

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }))
      throw new Error(error.message || `HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  async post<T = any>(payload: any): Promise<T> {
    const isFormData = payload instanceof FormData

    return this.request<T>('/jobs', {
      method: 'POST',
      body: isFormData ? payload : JSON.stringify(payload),
    })
  }

  async put<T = any>(payload: any, id: string): Promise<T> {
    const isFormData = payload instanceof FormData

    return this.request<T>(`/jobs/${id}`, {
      method: 'PUT',
      body: isFormData ? payload : JSON.stringify(payload),
    })
  }

  // async get(): Promise<ApiResponse> {
  //   return this.request<ApiResponse>("/jobs", {
  //     method: "GET",
  //   });
  // }
  // ?includeApplications=true
  async get(filters: any = {}): Promise<ApiResponse> {
    const queryString = new URLSearchParams(filters).toString()
    return this.request<ApiResponse>(`/jobs?${queryString}`, {
      method: 'GET',
    })
  }

  async getById(id: string, includeApplications?: boolean): Promise<ApiResponse> {
    const queryParams = new URLSearchParams()
    if (includeApplications) {
      queryParams.append('includeApplications', 'true')
    }

    const queryString = queryParams.toString()
    const url = queryString ? `/jobs/${id}?${queryString}` : `/jobs/${id}`

    return this.request<ApiResponse>(url, {
      method: 'GET',
    })
  }
}

export const jobService = new JobService()
