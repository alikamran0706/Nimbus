export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  nationality?: string
  country?: string
  dateOfBirth?: string
  isVerified: boolean
  role: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  firstName: string
  lastName: string
  email: string
  password: string
  country: string
  nationality: string
  dateOfBirth: string
  role: 'candidate' | 'recruiter'
}

export interface VerificationData {
  email: string
  code: string
}
