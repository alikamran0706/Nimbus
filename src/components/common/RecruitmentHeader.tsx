import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { logout } from '@/store/slices/authSlice'
import type React from 'react'
import { use, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import UserDropdown from './RecruiterDropdown'

interface NavbarProps {
  title: string
  navItems: Array<{ label: string; path: string }>
  id: any
}

export default function Navbar({ id, navItems }: NavbarProps) {
  const { user } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationCount] = useState(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout())
    navigate('/signin')
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery)
    }
  }

  const handleNavClick = (path: string) => {
    navigate(path)
    setMobileMenuOpen(false)
  }

  return (
    <>
      <nav id={id} className="bg-white border-b border-gray-150 sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}

            <div className="flex flex-col gap-1 py-2">
              <img src="/images/logo.png" alt="Nimbus" className="h-auto w-12" />
              <span className="text-lg sm:text-xl font-semibold text-gray-900">Nimbus</span>
            </div>

            {/* Desktop Navigation Items */}
            <div className="hidden lg:flex items-center gap-6">
              {navItems.map(item => (
                <NavLink
                  key={item.path}
                 
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? 'flex items-center gap-3 text-primary-600 font-medium'
                      : 'flex items-center gap-3 text-gray-700 hover:tex-primary-600'
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            <form
              onSubmit={handleSearch}
              className="hidden lg:flex items-center flex-1 max-w-[238px] mx-4"
            >
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pr-4 pl-8 py-2 
                  text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 
                  focus:ring-red-500 focus:border-transparent"
                />
                <svg
                  className="absolute left-2 top-2.5 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </form>

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

              {/* User Profile */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {user?.firstName?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="hidden sm:flex flex-row">
                  {/* <span className="text-sm font-medium text-gray-900">{user?.firstName}</span> */}
                  {/* <span className="text-xs text-gray-800 capitalize">{user?.role}</span> */}

                  <UserDropdown user={user} />
                  
                </div>
              </div>

              {/* Logout Button */}
              {/* <button
                onClick={handleLogout}
                className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-primary-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Logout
              </button> */}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 lg:hidden transform transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 space-y-4">
          {/* Close Button */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-4 right-4 p-2 text-gray-600 hover:text-primary-600"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Mobile Navigation Items */}
          <div className="mt-8 space-y-2">
            {navItems.map(item => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className="w-full text-left px-4 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="mt-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <svg
                className="absolute right-3 top-2.5 h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </form>

          {/* Mobile User Info */}
          <div className="border-t border-gray-200 pt-4 mt-4">
            <Link to='/recruiter/profile' className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                {user?.firstName?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">{user?.firstName}</span>
                <span className="text-xs text-gray-500 capitalize">{user?.role}</span>
              </div>
            </Link>

            {/* Mobile Notification Count */}
            <div className="flex items-center gap-2 mb-4 p-2 bg-gray-50 rounded-lg">
              <svg
                className="h-5 w-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="text-sm text-gray-600">
                {notificationCount} notification{notificationCount !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Mobile Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
