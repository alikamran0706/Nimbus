"use client"

import { useState } from "react"
import { useAppDispatch } from "@hooks/redux"
import { logout } from "@store/slices/authSlice"
import { useNavigate } from "react-router-dom"

export const ConfigureSetting = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
  })
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    activityVisible: false,
  })

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
  }

  const handlePrivacyChange = (key: string, value: boolean) => {
    setPrivacy((prev) => ({ ...prev, [key]: value }))
  }

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      // Implement account deletion logic
      console.log("Delete account")
      dispatch(logout())
      navigate("/auth/signin")
    }
  }

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {/* Notifications */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
          </div>
          <div className="p-4 sm:p-6 space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <div
                key={key}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <h3 className="text-sm font-medium text-gray-900 capitalize">
                    {key} Notifications
                  </h3>
                  <p className="text-sm text-gray-500">
                    Receive notifications via {key}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) =>
                      handleNotificationChange(key, e.target.checked)
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Privacy</h2>
          </div>
          <div className="p-4 sm:p-6 space-y-4">
            {Object.entries(privacy).map(([key, value]) => (
              <div
                key={key}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {key === "profileVisible"
                      ? "Profile Visibility"
                      : "Activity Visibility"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {key === "profileVisible"
                      ? "Make your profile visible to other users"
                      : "Show your activity to other users"}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) =>
                      handlePrivacyChange(key, e.target.checked)
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Security</h2>
          </div>
          <div className="p-4 sm:p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Change Password</h3>
                <p className="text-sm text-gray-500">
                  Update your account password
                </p>
              </div>
              <button className="px-4 py-2 border border-gray-300 text-sm text-gray-700 rounded hover:bg-gray-50 transition">
                Change Password
              </button>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Two-Factor Authentication
                </h3>
                <p className="text-sm text-gray-500">
                  Add an extra layer of security
                </p>
              </div>
              <button className="px-4 py-2 border border-gray-300 text-sm text-gray-700 rounded hover:bg-gray-50 transition">
                Enable 2FA
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-lg shadow border border-red-200">
          <div className="px-4 sm:px-6 py-4 border-b border-red-200">
            <h2 className="text-lg font-semibold text-red-900">Danger Zone</h2>
          </div>
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-medium text-red-900">
                  Delete Account
                </h3>
                <p className="text-sm text-primary-600">
                  Permanently delete your account and all associated data
                </p>
              </div>
              <button
                onClick={handleDeleteAccount}
                className="bg-primary-600 hover:bg-red-700 text-white font-medium py-2 px-4 text-sm rounded-lg transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
