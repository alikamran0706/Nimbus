import { useAppDispatch } from "@/hooks/redux";
import { logout } from "@/store/slices/authSlice";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function UserDropdown({ user }: { user: any }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
   const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

    const handleLogout = () => {
      dispatch(logout());
      navigate('/auth/signin');
    }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-gray-700 focus:outline-none transition"
      >
        <span className="capitalize text-xs text-gray-800">{user?.role || "Recruiter"}</span>

        {/* Clean Arrow Down SVG (chevron) */}
       <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={`w-4 h-4 ml-1 text-gray-700 transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-md border border-gray-150 z-50 animate-fadeIn">
          <ul className="py-2 text-sm text-gray-700">
            <li>
              <Link to='/recruiter/profile' className="w-full text-left px-4 py-2 hover:bg-gray-100">Your Profile</Link>
            </li>
            <li>
              <Link to={'/recruiter/settings'} className="w-full text-left px-4 py-2 hover:bg-gray-100">Settings</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-primary-600 hover:bg-gray-100">
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
