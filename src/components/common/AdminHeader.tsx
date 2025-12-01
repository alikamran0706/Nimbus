import { useAppSelector } from '@/hooks/redux'
import UserDropdown from './RecruiterDropdown'
import { useState } from 'react'

type HeaderProps = {
  onMenuClick?: () => void
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const { user } = useAppSelector(state => state.auth)
  const [notificationCount] = useState(1)

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={onMenuClick}
              className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-600"
              aria-label="Open sidebar"
              aria-controls="mobile-sidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <div className="flex flex-col gap-1 py-2">
              {/* <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%201-ipIH4sCpFZkBtk5klUe1etfgg1WV6H.png"
                alt="Nimbus" className="h-auto w-12" />  */}
              <span className="text-base sm:text-xl font-semibold text-gray-900">Admin Panel</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-3">
              {/* Desktop Right Section - Notifications and User */}
              <div className="hidden lg:flex items-center gap-3 sm:gap-4">
                {/* Notification Button */}
                <button className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  {notificationCount > 0 && (
                    <span className="absolute top-3 right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-primary-600 rounded-full">
                      {notificationCount}
                    </span>
                  )}
                </button>

                {/* Logout Button */}
                {/* <button
                                onClick={handleLogout}
                                className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-primary-600 hover:bg-red-700 rounded-lg transition-colors"
                              >
                                Logout
                              </button> */}
              </div>
              <div className="w-10 h-10 bg-gray-150 rounded-full flex items-center justify-center text-black font-semibold">
                <img src="/svg/gray-user.svg" alt="user" className="w-4 h-4" />
              </div>
              {/* <span className="text-gray-700 capitalize">Candidate</span> */}
              <div className="hidden sm:flex flex-row">
                <UserDropdown user={user} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
