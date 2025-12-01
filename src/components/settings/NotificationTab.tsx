import { useState } from 'react';

const NotificationTab = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    message: false,
    job: false,
    marketing: false,
  })
  const [pushNotifications, setPushNotifications] = useState({
    application: true,
    message: false,
  })
  const [smsNotifications, setSmsNotifications] = useState({
    interview: true,
    job: false,
  })

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }))
  }

  const handlePushNotificationChange = (key: string, value: boolean) => {
    setPushNotifications(prev => ({ ...prev, [key]: value }))
  }

  const handleSmsNotificationChange = (key: string, value: boolean) => {
    setSmsNotifications(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-4">
      {/* Notifications */}
      <div className="px-4 py-4">
        <h2 className="text-base font-medium text-gray-900">Notification Preferences</h2>
        <p className="text-sm text-gray-600 mt-1">
          Control how and when you receive notifications from TalentHub.
        </p>
      </div>
      <div className="mx-4 space-y-4 border-b border-gray-100 pb-4">
        <h3 className="text-sm font-medium text-gray-900 capitalize">Email Notifications</h3>
        {Object.entries(notifications).map(([key, value]) => (
          <div
            key={key}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div>
              <div className="flex gap-x-4">
                {/* <label className="relative inline-flex cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={e => handleNotificationChange(key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div
                    className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 
                    peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full 
                    peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
                    after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full 
                    after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"
                  ></div>
                </label> */}

                <label className="cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={e => handleNotificationChange(key, e.target.checked)}
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
                      Application updates
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Receive emails when there are updates to your job applications
                    </p>
                  </div>
                ) : key === 'message' ? (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 capitalize">New messages</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Receive emails when you get new messages from recruiters
                    </p>
                  </div>
                ) : key === 'job' ? (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 capitalize">
                      Job recommendations
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Receive weekly emails with job recommendations based on your profile
                    </p>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 capitalize">
                      Marketing emails
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Receive emails about TalentHub features, updates and tips
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="hidden md:block">
              <img src={'/svg/mail.svg'} alt="Icon" />
            </div>
          </div>
        ))}
      </div>

      <div className="mx-4 space-y-4 border-b border-gray-100 pb-4">
        <h3 className="text-sm font-medium text-gray-900 capitalize">Push Notifications</h3>
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
                      Application updates
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Receive push notifications when there are updates to your job applications
                    </p>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 capitalize">New messages</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Receive push notifications when you get new messages from recruiters
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="hidden md:block">
              <img src={'/svg/bell.svg'} alt="Icon" />
            </div>
          </div>
        ))}
      </div>

      <div className="mx-4 space-y-4 border-b border-gray-100 pb-4">
        <h3 className="text-sm font-medium text-gray-900 capitalize">SMS Notifications</h3>
        {Object.entries(smsNotifications).map(([key, value]) => (
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
                    onChange={e => handleSmsNotificationChange(key, e.target.checked)}
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

                {key === 'interview' ? (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 capitalize">
                      Interview reminders
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Receive text message reminders before scheduled interviews
                    </p>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 capitalize">Job offers</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Receive text message notifications when you receive a job offer
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="hidden md:block">
              <img src={'/svg/mobile.svg'} alt="Icon" />
            </div>
          </div>
        ))}
      </div>

      {/* Security */}
     <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Pause all notifications</h3>
              <p className="text-sm text-gray-600">Temporarily disable all notifications from TalentHub</p>
            </div>
            <button className="flex w-40 sm:w-auto gap-x-2 px-4 py-2 font-[500] bg-gray-100 text-sm text-gray-800 
                rounded-full hover:bg-gray-50 transition">
              <img src={'/svg/pause-notification.svg'} alt="Icon" />
              Pause for 24h
            </button>
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

export default NotificationTab
