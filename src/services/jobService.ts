import type { ApiResponse } from '../types'

const API_BASE_URL = `${window.location.origin}/api`;

class JobService {
    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const token = localStorage.getItem('token')

        const config: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
                ...options.headers,
            },
            ...options,
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, config)

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'Network error' }))
            throw new Error(error.message || `HTTP error! status: ${response.status}`)
        }

        return response.json()
    }

    async post<T = any>(payload: any): Promise<T> {
        return this.request<T>('/jobs', {
            method: 'POST',
            body: JSON.stringify(payload),
        });
    }

    async get(): Promise<ApiResponse> {
        return this.request<ApiResponse>('/jobs', {
            method: 'GET',
        })
    }

}

export const jobService = new JobService()
