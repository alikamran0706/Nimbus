import { useState } from 'react'

const PasswordTab = () => {
  const [pushNotifications, setPushNotifications] = useState({
    email: true,
    message: false,
  })

  const [selectedNotification, setSelectedNotification] = useState('email')

  // Handle radio button change
  const handleRadioChange = (value: string) => {
    setSelectedNotification(value) // Update the selected notification
  }

  const handlePushNotificationChange = (key: string, value: boolean) => {
    setPushNotifications(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-4">
      {/* Notifications */}
      <div className="px-4 py-4">
        <h2 className="text-base font-medium text-gray-900">Change Password</h2>
        <p className="text-sm text-gray-600 mt-1">
          Update your password to keep your account secure.
        </p>
      </div>

      <div className="border-b border-gray-100 flex justify-between mx-4 pb-2">
        <p className="text-sm text-gray-700 font-[500]">Current Password</p>
        <img src={'/svg/open-eye.svg'} alt="Icon" />
      </div>

      <div className='mx-4'>
        <div className="border-b border-gray-100 flex justify-between pb-2">
            <p className="text-sm text-gray-700 font-[500]">New Password</p>
            <img src={'/svg/open-eye.svg'} alt="Icon" />
        </div>
        <p className='text-gray-600 text-xs'>Password must be at least 8 characters and include a number and special character.</p>
      </div>

      <div className="border-b border-gray-100 flex justify-between mx-4 pb-2">
        <p className="text-sm text-gray-700 font-[500]">Confirm New Password</p>
        <img src={'/svg/open-eye.svg'} alt="Icon" />
      </div>

      <div className="mx-4 space-y-4 pb-4">
        <h3 className="text-sm font-medium text-gray-900 capitalize">Security Options</h3>
        {Object.entries(pushNotifications).map(([key, value]) => (
          <div
            key={key}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div>
              <div className="flex gap-x-4">
                <label className="cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={e => handlePushNotificationChange(key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div
                    className="w-[18px] h-[18px] border-2 border-gray-300 rounded-sm peer-checked:bg-red-600 
                    peer-checked:border-red-600 flex items-center justify-center peer-focus:ring-2 
                    peer-focus:ring-red-300"
                  >
                    <svg
                      className={`w-[18px] h-[18px] text-white transition-opacity ${
                        value ? 'opacity-100' : 'opacity-0'
                      }`}
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </label>

                {key === 'email' ? (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 capitalize">
                      Enable two-factor authentication
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 capitalize">
                      Login alerts
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Receive email notifications for new login attempts
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="hidden md:block">
                {
                    key === 'email' ?
                    <img src={'/svg/lock.svg'} alt="Icon" />
                    :
                    <img src={'/svg/alert.svg'} alt="Icon" />
                }
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end bg-gray-100 p-4">
        <button
          // onClick={handleSave}
          className="text-sm bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-md 
                transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default PasswordTab
