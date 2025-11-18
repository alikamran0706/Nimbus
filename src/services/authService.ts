import type { LoginCredentials, RegisterCredentials, User, ApiResponse } from '../types'

const API_BASE_URL = `${window.location.origin}/api`;

class AuthService {
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

  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    return this.request<{ user: User; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
  }

  async register(userData: RegisterCredentials): Promise<{ user: User }> {
    return this.request<{ user: User }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  async verifyEmail(email: string, code: string): Promise<{ user: User; token: string }> {
    return this.request<{ user: User; token: string }>('/auth/verify', {
      method: 'POST',
      body: JSON.stringify({ email, code }),
    })
  }

  async resendVerificationCode(email: string): Promise<ApiResponse> {
    return this.request<ApiResponse>('/auth/resend', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  }

  async getCurrentUser(): Promise<User> {
    return this.request<User>('/auth/me', {
      method: 'GET',
  })
  }
}

export const authService = new AuthService()
