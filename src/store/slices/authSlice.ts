import { AuthState, User, LoginCredentials, RegisterCredentials } from "@/types"
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { authService } from "@services/authService"

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  isLoading: false,
  error: null,
}

// Async thunks
export const loginUser = createAsyncThunk("auth/login", async (credentials: LoginCredentials, { rejectWithValue }) => {
  try {
    const response = await authService.login(credentials)

    return response
  } catch (error: any) {
    return rejectWithValue(error.message || "Login failed")
  }
})

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: RegisterCredentials, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData)

      return response
    } catch (error: any) {
      return rejectWithValue(error.message || "Registration failed")
    }
  },
)

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async ({ email, code }: { email: string; code: string }, { rejectWithValue }) => {
    try {
      const response = await authService.verifyEmail(email, code)

      return response
    } catch (error: any) {
      return rejectWithValue(error.message || "Verification failed")
    }
  },
)

export const getCurrentUser = createAsyncThunk("auth/getCurrentUser", async (_, { rejectWithValue }) => {
  try {
    const response = await authService.getCurrentUser()

    return response
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to get user")
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null
      localStorage.removeItem("token")
    },
    clearError: (state) => {
      state.error = null
    },
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      localStorage.setItem("token", action.payload.token)
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        localStorage.setItem("token", action.payload.token)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        // Don't set user as authenticated until email is verified
        state.user = action.payload.user
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Verify Email
      .addCase(verifyEmail.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        localStorage.setItem("token", action.payload.token)
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Get Current User
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.isLoading = false
        state.user = null
        state.token = null
        state.isAuthenticated = false
        localStorage.removeItem("token")
      })
  },
})

export const { logout, clearError, setCredentials } = authSlice.actions
export default authSlice.reducer
