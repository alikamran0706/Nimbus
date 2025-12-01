import { Outlet, Navigate } from 'react-router-dom'
import { useAppSelector } from '@hooks/redux'
import { Helmet } from 'react-helmet'

export const AuthLayout = () => {
  const { isAuthenticated, user } = useAppSelector(state => state.auth)

  // Redirect to dashboard if already authenticated
  if (isAuthenticated && user?.role !== 'candidate') {
    return <Navigate to="/dashboard" replace />
  } else if (isAuthenticated && user?.role === 'candidate') return <Navigate to="/jobs" replace />

  return (
    <>
      <Helmet>
        <body style={{ overflow: 'auto' }} />
      </Helmet>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <Outlet />
        </div>
      </div>
    </>
  )
}
