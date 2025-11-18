import { useState } from 'react'
import { useAppDispatch } from '@hooks/redux'
import { logout } from '@store/slices/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import ProfileTab from '@/components/settings/ProfileTab'
import NotificationTab from '@/components/settings/NotificationTab'
import PrivacyTab from '@/components/settings/PrivacyTab'
import PasswordTab from '@/components/settings/PasswordTab'

export const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [profile, setProfile] = useState({
    firstName: 'John',
    email: 'john.doe@example.com',
    phoneNumber: '+1 (555) 123-4567',
    location: 'New York, NY',
    dateOfBirth: 'January 15, 1990',
  })
  const [jobPreferences, setJobPreferences] = useState({
    preferredJobTitle: 'Senior Frontend Developer',
    jobType: 'Full-time',
    salaryRange: '$80,000 - $120,000',
    preferredLocation: 'Hybrid',
  })

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleDeleteAccount = () => {
    if (
      window.confirm('Are you sure you want to delete your account? This action cannot be undone.')
    ) {
      console.log('Delete account')
      dispatch(logout())
      navigate('/auth/signin')
    }
  }

  const handleSave = () => {
    console.log('Saving settings...')
    // Implement save logic
  }

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'privacy', label: 'Privacy' },
    { id: 'password', label: 'Password' },
  ]

  return (
    <>
      <div className="p-4">
        <Link
          to="/applications"
          className="inline-flex items-center gap-2 text-primary-500 hover:text-red-500 text-sm sm:text-base"
        >
          <img src={'/svg/back-arrow.svg'} alt="icon" />
          Back to Dashboard
        </Link>
      </div>
      <div className="w-full pt-6 bg-white rounded-lg border border-gray-150 overflow-hidden mb-4">
        <div className="mb-6 px-4">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-700 mt-1">
            Manage your account, preferences and settings
          </p>
        </div>

        <div className="bg-transparent">
          <nav className="flex gap-8 px-4 py-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-sm font-medium transition-colors ${
                  activeTab === tab.id ? 'text-primary-600' : 'text-gray-600 hover:text-primary-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {activeTab === 'profile' && (
          <ProfileTab profile={profile} jobPreferences={jobPreferences} handleSave={handleSave} />
        )}

        {activeTab === 'notifications' && <NotificationTab />}

        {activeTab === 'privacy' && <PrivacyTab />}

        {activeTab === 'password' && <PasswordTab />}
      </div>
      {/* Account Settings */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-lg border border-gray-150">
          <div className="px-6 py-4 border-b border-gray-150">
            <h2 className="text-base font-semibold text-gray-900">Account Settings</h2>
          </div>
          <div>
            <div className="flex items-center justify-between border-b border-gray-150 p-4">
              <div className="flex gap-x-2 ">
                <div className="w-10 h-10 bg-primary-100 flex items-center justify-center rounded-full">
                  <img src={'/svg/red-bell.svg'} alt="icon" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                  <p className="text-sm text-gray-700">Manage your notification preferences</p>
                </div>
              </div>
              <button className="text-sm text-primary-600 hover:text-primary-600 font-[500]">
                Config
              </button>
            </div>
            <div className="flex items-center justify-between border-b border-gray-150 p-4">
              <div className="flex gap-x-2 ">
                <div className="w-10 h-10 bg-primary-100 flex items-center justify-center rounded-full">
                  <img src={'/svg/red-globe.svg'} alt="icon" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Privacy</h3>
                  <p className="text-sm text-gray-700">Make change in your privacy setting</p>
                </div>
              </div>
              <button className="text-sm text-primary-600 hover:text-primary-600 font-[500]">
                Config
              </button>
            </div>

            <div className="flex items-center justify-between border-b border-gray-150 p-4">
              <div className="flex gap-x-2 ">
                <div className="w-10 h-10 bg-primary-100 flex items-center justify-center rounded-full">
                  <img src={'/svg/red-lock.svg'} alt="icon" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Password & Security</h3>
                  <p className="text-sm text-gray-700">
                    Update your password and security settings
                  </p>
                </div>
              </div>
              <button className="text-sm text-primary-600 hover:text-primary-600 font-[500]">
                Config
              </button>
            </div>

            <div className="flex items-center justify-between border-b border-gray-150 p-4">
              <div className="flex gap-x-2 ">
                <div className="w-10 h-10 bg-primary-100 flex items-center justify-center rounded-full">
                  <img src={'/svg/red-profile.svg'} alt="icon" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                  <p className="text-sm text-gray-700">Manage your notification preferences</p>
                </div>
              </div>
              <button
                onClick={handleDeleteAccount}
                className="text-sm text-primary-600 hover:text-primary-600 font-[500]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
