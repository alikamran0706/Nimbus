import { useState } from 'react'

const PrivacyTab = () => {

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
        <h2 className="text-base font-medium text-gray-900">Privacy Settings</h2>
        <p className="text-sm text-gray-600 mt-1">
          Control who can see your information and how your data is used.
        </p>
      </div>
      <div className="space-y-4 border-b border-gray-100 pb-4">
        <h3 className="text-sm font-medium text-gray-900 capitalize mx-4">Profile Visibility</h3>
        {[
          {
            key: 'email',
            label: 'Public profile',
            description: 'Your profile is visible to all recruiters on TalentHub',
          },
          {
            key: 'message',
            label: 'Limited visibility',
            description: 'Only recruiters from companies you apply to can see your full profile',
          },
          {
            key: 'job',
            label: 'Private profile',
            description:
              'Your profile is hidden from search results and only visible when you apply',
          },
        ].map(({ key, label, description }) => (
          <div
            key={key}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mx-2"
          >
            <div>
              <div className="flex gap-x-4">
                <label className="cursor-pointer flex space-x-2">
                  <input
                    type="radio"
                    name="notificationRadio"
                    value={key}
                    checked={selectedNotification === key}
                    onChange={() => handleRadioChange(key)}
                    className="sr-only peer"
                  />
                  <div
                    className={`w-[18px] h-[18px] border-2 border-gray-300 rounded-full flex items-center justify-center 
                    ${
                      selectedNotification === key
                        ? 'bg-white border-primary-600'
                        : 'bg-white border-gray-300'
                    }
                    peer-checked:bg-white-600 peer-checked:border-primary-600 peer-focus:ring-2 peer-focus:ring-red-300`}
                  >
                    <div
                      className={`w-[12px] h-[12px] rounded-full ${
                        selectedNotification === key ? 'bg-primary-600' : 'bg-transparent'
                      }`}
                    ></div>
                  </div>
                </label>

                <div>
                  <h3 className="text-sm font-medium text-gray-900 capitalize">{label}</h3>
                  <p className="text-sm text-gray-600 mt-1">{description}</p>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              {selectedNotification === key ? (
                <img src={'/svg/open-eye.svg'} alt="Icon" />
              ) : (
                <img src={'/svg/close-eye.svg'} alt="Icon" />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mx-4 space-y-4 border-b border-gray-100 pb-4">
        <h3 className="text-sm font-medium text-gray-900 capitalize">Resume Privacy</h3>
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
                    className="w-[18px] h-[18px] border-2 border-gray-300 rounded-sm peer-checked:bg-primary-600 
                    peer-checked:border-primary-600 flex items-center justify-center peer-focus:ring-2 
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
                      Show contact information
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Display your email and phone number on your resume
                    </p>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 capitalize">Hide current employer</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Hide your current employer's name on your public profile
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="hidden md:block">
              <img src={'/svg/shield.svg'} alt="Icon" />
            </div>
          </div>
        ))}
      </div>

       <div className="space-y-4 pb-4">
        <h3 className="mx-4 text-sm font-medium text-gray-900 capitalize">Job Search Status</h3>
        {[
          {
            key: 'email',
            label: 'Actively looking',
            description: "Show recruiters that you're actively searching for a new position",
          },
          {
            key: 'message',
            label: 'Open to opportunities',
            description: "Let recruiters know you're open but not actively searching",
          },
          {
            key: 'job',
            label: 'Not looking',
            description:
              'Hide your job search status from recruiters',
          },
        ].map(({ key, label, description }) => (
          <div
            key={key}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mx-2"
          >
            <div>
              <div className="flex gap-x-4">
                <label className="cursor-pointer flex space-x-2">
                  <input
                    type="radio"
                    name="notificationRadio"
                    value={key}
                    checked={selectedNotification === key}
                    onChange={() => handleRadioChange(key)}
                    className="sr-only peer"
                  />
                  <div
                    className={`w-[18px] h-[18px] border-2 border-gray-300 rounded-full flex items-center justify-center 
                    ${
                      selectedNotification === key
                        ? 'bg-white border-primary-600'
                        : 'bg-white border-gray-300'
                    }
                    peer-checked:bg-white-600 peer-checked:border-primary-600 peer-focus:ring-2 peer-focus:ring-red-300`}
                  >
                    <div
                      className={`w-[12px] h-[12px] rounded-full ${
                        selectedNotification === key ? 'bg-primary-600' : 'bg-transparent'
                      }`}
                    ></div>
                  </div>
                </label>

                <div>
                  <h3 className="text-sm font-medium text-gray-900 capitalize">{label}</h3>
                  <p className="text-sm text-gray-600 mt-1">{description}</p>
                </div>
              </div>
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

export default PrivacyTab
