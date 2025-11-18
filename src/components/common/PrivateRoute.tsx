import { Navigate, useLocation } from "react-router-dom"
import { useAppSelector } from "@hooks/redux"
import { type ReactNode } from "react"

interface PrivateRouteProps {
  children: ReactNode
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAppSelector((state) => state.auth)
  const location = useLocation();

  console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm')
  console.log(user?.role,'ddddd')
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/signin" state={{ from: location }} replace />
  }

  if (user?.role && user.role === 'recruiter') {
    return <Navigate to="/recruiter" state={{ from: location }} replace />
  }

  if (user?.role && user.role === 'admin') {
    return <Navigate to="/admin" state={{ from: location }} replace />
  }

  return <>{children}</>
}
