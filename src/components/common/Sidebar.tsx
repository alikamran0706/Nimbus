import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@hooks/redux'
import { logout } from '@store/slices/authSlice'

type SidebarProps = {
  isOpen: boolean
  onClose: () => void
}

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="space-y-2">
      <NavLink
        onClick={onNavigate}
        to="/applications"
        className={({ isActive }) =>
          isActive
            ? 'flex items-center gap-3 px-4 py-3 bg-red-50 text-red-600 rounded-lg font-medium'
            : 'flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg'
        }
      >
        {({ isActive }) => (
          <>
            <img
              src={isActive ? '/images/active-application.png' : '/images/application.png'}
              alt="Applications"
              className="h-5 w-5"
            />
            Applications
          </>
        )}
      </NavLink>
      <NavLink
        onClick={onNavigate}
        to="/resume"
        className={({ isActive }) =>
          isActive
            ? 'flex items-center gap-3 px-4 py-3 bg-red-50 text-red-600 rounded-lg font-medium'
            : 'flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg'
        }
      >
        {({ isActive }) => (
          <>
            <img
              src={isActive ? '/images/active-resume.png' : '/images/resume.png'}
              alt="Resume"
              className="h-[18px] w-[18px]"
            />
            Resume
          </>
        )}
      </NavLink>
      <NavLink
        onClick={onNavigate}
        to="/communications"
        className={({ isActive }) =>
          isActive
            ? 'flex items-center gap-3 px-4 py-3 bg-red-50 text-red-600 rounded-lg font-medium'
            : 'flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg'
        }
      >
        {({ isActive }) => (
          <>
            <img
              src={isActive ? '/images/active-message.png' : '/images/message.png'}
              alt="Resume"
              className="h-[18px] w-[18px]"
            />
            Message
          </>
        )}
      </NavLink>
      <NavLink
        onClick={onNavigate}
        to="/settings"
        className={({ isActive }) =>
          isActive
            ? 'flex items-center gap-3 px-4 py-3 bg-red-50 text-red-600 rounded-lg font-medium'
            : 'flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg'
        }
      >
        {({ isActive }) => (
          <>
            <img
              src={isActive ? '/images/active-setting.png' : '/images/setting.png'}
              alt="Resume"
              className="h-[18px] w-[18px]"
            />
            Setting
          </>
        )}
      </NavLink>
    </nav>
  )
}

function SidebarFooter({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="mt-auto p-4">
      <button
        onClick={onLogout}
        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg w-full"
      >
        Sign out
      </button>
    </div>
  )
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth/signin');
    onClose?.();
  }

  return (
    <>
      {/* Mobile overlay + drawer */}
      <div className={`md:hidden fixed inset-0 z-40 ${isOpen ? '' : 'pointer-events-none'}`}>
        <div
          className={`absolute inset-0 bg-black/30 transition-opacity ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={onClose}
          aria-hidden="true"
        />
        <aside
          id="mobile-sidebar"
          className={`absolute inset-y-0 left-0 w-72 bg-white border-r border-gray-100 shadow-lg transform transition-transform ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex h-full flex-col w-full">
            <div className="flex items-center justify-between px-4 h-14 border-b">
              <span className="text-base font-semibold">Menu</span>
              <button
                onClick={onClose}
                className="rounded-md p-2 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-600"
                aria-label="Close sidebar"
              >
                X
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-6">
              <NavList onNavigate={onClose} />
            </div>
            <SidebarFooter onLogout={handleLogout} />
          </div>
        </aside>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed top-16 left-0 z-20 h-[calc(100vh-4rem)] w-64 bg-white shadow-sm border-r border-gray-100">
        <div className="flex flex-col h-full w-full">
          {/* Scrollable nav list */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <NavList />
          </div>
          <SidebarFooter onLogout={handleLogout} />
        </div>
      </aside>
    </>
  )
}
