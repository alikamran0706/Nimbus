import type React from 'react'

import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import { verifyEmail, clearError } from '@store/slices/authSlice'
import { authService } from '@services/authService'

export const VerifyEmail = () => {
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [isResending, setIsResending] = useState(false)
  const [timer, setTimer] = useState(60)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { isLoading, error, isAuthenticated, user } = useAppSelector(state => state.auth)

  const email = location.state?.email || 'user@example.com'

  useEffect(() => {
    if (timer === 0) return

    const interval = setInterval(() => {
      setTimer(prev => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [timer])

  useEffect(() => {
    if (isAuthenticated && user?.role!=='candidate') {
      navigate('/dashboard', { replace: true })
    }
    else if(user?.role === 'candidate')
      navigate('/jobs', { replace: true })
  }, [isAuthenticated, navigate])

  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const verificationCode = code.join('')
    if (verificationCode.length === 6) {
      dispatch(verifyEmail({ email, code: verificationCode }))
    }
  }

  const handleResendCode = async () => {
    setIsResending(true)
    try {
      await authService.resendVerificationCode(email)
      setTimer(60)
      // Show success message
    } catch (error) {
      console.error('Failed to resend code:', error)
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%201-ipIH4sCpFZkBtk5klUe1etfgg1WV6H.png"
          alt="Nimbus"
          className="h-12 w-auto mx-auto"
        />
        <h2 className="text-center text-xl font-medium text-gray-700 m-0 p-0">
          <span className="text-primary-600 text-4xl font-bold ml-6">Nimbus</span>
        </h2>
      </div>
      <div className="auth-card">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            ← Enter verification <span className="text-primary-600">code</span>
          </h3>
          <p className="text-sm text-gray-600">We sent a 6-digit code to {email}</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {timer > 0 && (
            <p className="text-sm text-gray-600 text-center">Resend available in {timer}s</p>
          )}
          <div className="flex justify-center space-x-3">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                maxLength={1}
                className="w-12 h-12 bg-[#D9D9D9] text-center text-lg font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                value={digit}
                onChange={e => handleCodeChange(index, e.target.value)}
                onKeyDown={e => handleKeyDown(index, e)}
              />
            ))}
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">{"Didn't receive the code?"}</p>

            {timer === 0 && (
              <button
                type="button"
                onClick={handleResendCode}
                disabled={isResending}
                className="text-sm text-primary-600 hover:text-primary-500 font-medium"
              >
                {isResending ? 'Sending...' : 'Resend Code'}
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || code.join('').length !== 6}
            className="btn-primary w-full"
          >
            {isLoading ? 'Verifying...' : 'Verify code'}
          </button>
        </form>
      </div>
    </div>
  )
}
