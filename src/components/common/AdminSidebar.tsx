import { NavLink } from "react-router-dom"
import { useAppDispatch } from "@hooks/redux"
import { logout } from "@store/slices/authSlice"
import { useNavigate } from "react-router-dom"

type SidebarProps = {
  isOpen: boolean
  onClose: () => void
}

const adminMenu = [
  { label: "Dashboard", path: "/admin/dashboard", icon: "/svg/admin/dashboard.svg" },
  { label: "User Management", path: "/admin/user-management", icon: "/svg/admin/user-management.svg" },
  { label: "Integrations", path: "/admin/integrations", icon: "/svg/admin/integrations.svg" },
  { label: "Job Categories", path: "/admin/jobs", icon: "/svg/admin/jobs.svg" },
  { label: "Audit Logs", path: "/admin/audit-logs", icon: "/svg/admin/audit.svg" },
  { label: "Support", path: "/admin/support", icon: "/svg/admin/support.svg" },
  { label: "Candidate List", path: "/admin/candidates", icon: "/svg/admin/candidates.svg" },
  { label: "Interview Scheduling", path: "/admin/interview", icon: "/svg/admin/interview.svg" },
  { label: "Automation Rules", path: "/admin/automation", icon: "/svg/admin/automation.svg" },
  { label: "Data Migration", path: "/admin/migration", icon: "/svg/admin/migration.svg" },
]

function AdminNavList({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="space-y-1 mt-2">
      {adminMenu.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all
            ${
              isActive
                ? "bg-red-50 text-red-600"
                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <img
                src={item.icon}
                alt={item.label}
                className={`h-[18px] w-[18px] object-contain ${
                  isActive ? "opacity-100" : "opacity-80"
                }`}
              />
              <span>{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}

function SidebarFooter({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="mt-auto border-t border-gray-100 px-8 py-3">
      <button
        onClick={onLogout}
        className="flex items-center gap-3 text-gray-700 hover:text-red-600 transition-colors w-full"
      >
        <img src="/svg/lock.svg" alt="logout" className="h-5 w-5" />
        <span className="text-sm font-medium">Sign out</span>
      </button>
    </div>
  )
}

export const AdminSidebar = ({ isOpen, onClose }: SidebarProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate("/auth/signin")
    onClose?.()
  }

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } lg:hidden`}
        onClick={onClose}
      />

      {/* Sidebar Drawer (mobile) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg border-r border-gray-100 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:hidden`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-14 px-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Admin Panel</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-900"
              aria-label="Close sidebar"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <AdminNavList onNavigate={onClose} />
          </div>

          <SidebarFooter onLogout={handleLogout} />
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed top-16 left-0 z-30 w-60 h-[calc(100vh-4rem)] bg-white border-r border-gray-100 shadow-sm flex-col">
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-4">
            <AdminNavList />
          </div>
          <SidebarFooter onLogout={handleLogout} />
        </div>
      </aside>
    </>
  )
}
