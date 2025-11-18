import { Navigate, useLocation } from "react-router-dom"
import { useAppSelector } from "@hooks/redux"
import { type ReactNode } from "react"

interface RecruiterPrivateRouteProps {
  children: ReactNode
}

export const RecruiterPrivateRoute = ({ children }: RecruiterPrivateRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAppSelector((state) => state.auth)
  const location = useLocation();

  console.log(user,'useruseruser')

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

   if (user?.role && user.role === 'candidate') {
    return <Navigate to="/applications" state={{ from: location }} replace />
  }

  return <>{children}</>
}
