import type { ApiResponse } from '../types'

const API_BASE_URL = `${window.location.origin}/api`

class ResumeService {
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

        return this.request<T>('/resumes', {
            method: 'POST',
            body: isFormData ? payload : JSON.stringify(payload),
        })
    }

    async put<T = any>(payload: any, id: string): Promise<T> {
        const isFormData = payload instanceof FormData

        return this.request<T>(`/resumes/${id}`, {
            method: 'PUT',
            body: isFormData ? payload : JSON.stringify(payload),
        })
    }

    async get(filters: any = {}): Promise<ApiResponse> {
        const queryString = new URLSearchParams(filters).toString()
        return this.request<ApiResponse>(`/resumes?${queryString}`, {
            method: 'GET',
        })
    }

    async getById(id: string): Promise<ApiResponse> {
        const queryParams = new URLSearchParams()
        const queryString = queryParams.toString()
        const url = queryString ? `/resumes/${id}?${queryString}` : `/resumes/${id}`

        return this.request<ApiResponse>(url, {
            method: 'GET',
        })
    }

    async parseResume(formData: any) {
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_BASE_URL}/resumes/upload`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Upload failed');
        }

        return response.json();
    }

    async parseResumeText(text: any) {
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_BASE_URL}/resumes/parse`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });

        return response.json();
    }
}

export const resumeService = new ResumeService()
