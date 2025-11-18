import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Switch } from '@/components/ui/Switch'
import { Checkbox } from '@/components/ui/Checkbox'

type SettingsTab = 'general' | 'notifications' | 'security'

export default function RecruiterSettings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general')
  const [hasChanges, setHasChanges] = useState(false)

  // General Settings State
  const [generalSettings, setGeneralSettings] = useState({
    language: 'English',
    timeZone: 'Pacific Time (PT)',
    dateFormat: 'MM/DD/YYYY',
    autoSaveChanges: true,
  })

  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState({
    deliveryMethods: {
      email: true,
      pushNotifications: false,
      sms: false,
    },
    notificationTypes: {
      newCandidates: true,
      interviewReminders: true,
      applicationUpdates: true,
      marketingEmails: false,
    },
  })

  // Security Settings State
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30 minutes',
  })

  const handleGeneralChange = (key: string, value: string | boolean) => {
    setGeneralSettings(prev => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }

  const handleNotificationChange = (
    category: 'deliveryMethods' | 'notificationTypes',
    key: string,
    value: boolean
  ) => {
    setNotificationSettings(prev => ({
      ...prev,
      [category]: { ...prev[category], [key]: value },
    }))
    setHasChanges(true)
  }

  const handleSecurityChange = (key: string, value: string | boolean) => {
    setSecuritySettings(prev => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }

  const handleSaveChanges = () => {
    // Handle save logic here
    setHasChanges(false)
  }

  const tabItems = [
    {
      id: 'general',
      label: 'General',
      activeImage: '/svg/red-user.svg',
      image: '/svg/black-user.svg',
    },
    {
      id: 'notifications',
      label: 'Notifications',
      activeImage: '/svg/red-bell.svg',
      image: '/svg/black-bell.svg',
    },
    {
      id: 'security',
      label: 'Security',
      activeImage: '/svg/red-lock.svg',
      image: '/svg/black-lock.svg',
    },
  ]

  return (
    <div className="flex flex-col lg:max-w-screen-xl mx-auto w-full px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3 mt-4">
        <div>
          <h1 className="text-base font-bold text-foreground">Settings</h1>
          <p className="text-sm text-gray-600">Manage your account settings and preferences</p>
        </div>
        <Button label={!hasChanges ? 'Save Changes' : 'Saved'} onClick={handleSaveChanges} />
      </div>

      {/* Layout */}
      <div className="flex flex-col md:flex-row pb-6">
        {/* Sidebar Navigation */}
        <div className="flex md:flex-col md:w-56 w-full bg-gray-50 shadow-md">
          <nav className="flex md:flex-col overflow-x-auto md:overflow-visible gap-2 p-3 md:p-4 w-full">
            {tabItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as SettingsTab)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg flex-shrink-0 transition-colors ${
                  activeTab === item.id
                    ? 'bg-primary-200 text-primary-700'
                    : 'text-foreground hover:bg-gray-100'
                }`}
              >
                <img
                  src={activeTab === item.id ? item.activeImage : item.image}
                  alt={item.label}
                  className="h-5 w-5"
                />
                <span className="font-medium text-sm whitespace-nowrap">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 md:p-8 bg-white rounded-lg overflow-hidden">
          <div className="space-y-6">
            {/* GENERAL TAB */}
            {activeTab === 'general' && (
              <div className="space-y-6 ">
                <div>
                  <h2 className="text-base font-semibold text-foreground mb-1">General Settings</h2>
                  <p className="text-xsplus text-gray-600 mb-4">
                    Configure your basic user preferences for the application.
                  </p>
                </div>

                <div className="space-y-4 p-4 shadow-md rounded-lg overflow-hidden">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xsplus font-medium text-foreground mb-2">
                        Language
                      </label>
                      <input
                        type="text"
                        value={generalSettings.language}
                        onChange={e => handleGeneralChange('language', e.target.value)}
                        className="w-full border rounded-md p-2 text-xsplus"
                      />
                    </div>
                    <div>
                      <label className="block text-xsplus font-medium text-foreground mb-2">
                        Time Zone
                      </label>
                      <input
                        type="text"
                        value={generalSettings.timeZone}
                        onChange={e => handleGeneralChange('timeZone', e.target.value)}
                        className="w-full border rounded-md p-2 text-xsplus"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xsplus font-medium text-foreground mb-2">
                      Date Format
                    </label>
                    <input
                      type="text"
                      value={generalSettings.dateFormat}
                      onChange={e => handleGeneralChange('dateFormat', e.target.value)}
                      className="w-full border rounded-md p-2 text-xsplus"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                    <div>
                      <p className="font-medium text-foreground text-base">Auto-save changes</p>
                      <p className="text-xsplus text-gray-600">
                        Automatically save changes as you work
                      </p>
                    </div>
                    <Switch
                      checked={generalSettings.autoSaveChanges}
                      onCheckedChange={(v: any) => handleGeneralChange('autoSaveChanges', v)}
                    />
                  </div>
                </div>

                <div className="p-4 shadow-md rounded-lg">
                  <h3 className="text-base font-semibold text-foreground mb-4">Export Data</h3>
                  <p className="text-xsplus text-gray-600 mb-4">
                    Download all your data including candidates, jobs, and communications.
                  </p>
                  <Button label="Export to CSV" />
                </div>
              </div>
            )}

            {/* NOTIFICATIONS TAB */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-base font-semibold text-foreground mb-1">
                    Notification Preferences
                  </h2>
                  <p className="text-xsplus text-gray-600 mb-4">
                    Decide how and when you want to be notified.
                  </p>
                </div>

                <div className='shadow-md rounded-lg p-4'>
                  <h3 className="text-base font-semibold text-foreground mb-2">Delivery Method</h3>
                  <div className="space-y-3">
                    {[
                      {
                        key: 'email',
                        label: 'Email',
                        description: 'Receive notifications via email',
                      },
                      {
                        key: 'pushNotifications',
                        label: 'Push Notifications',
                        description: 'Receive notifications in your browser',
                      },
                      {
                        key: 'sms',
                        label: 'SMS',
                        description: 'Receive notifications via text messages',
                      },
                    ].map(method => (
                      <div
                        key={method.key}
                        className="flex items-start gap-3 rounded-lg hover:bg-secondary"
                      >
                        <Checkbox
                          checked={
                            notificationSettings.deliveryMethods[
                              method.key as keyof typeof notificationSettings.deliveryMethods
                            ]
                          }
                          onCheckedChange={(v: any) =>
                            handleNotificationChange('deliveryMethods', method.key, v as boolean)
                          }
                        />
                        <div>
                          <p className="text-xsplus font-medium text-foreground">{method.label}</p>
                          <p className="text-xsplus text-gray-600">{method.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="shadow-md rounded-lg p-4">
                  <h3 className="text-base font-semibold text-foreground mb-4">Notification Types</h3>
                  <div className="space-y-3">
                    {[
                      {
                        key: 'newCandidates',
                        label: 'New Candidates',
                        description: 'When new candidates apply for a position',
                      },
                      {
                        key: 'interviewReminders',
                        label: 'Interview Reminders',
                        description: 'Reminders for upcoming interviews',
                      },
                      {
                        key: 'applicationUpdates',
                        label: 'Application Updates',
                        description: 'Updates to pending applications',
                      },
                      {
                        key: 'marketingEmails',
                        label: 'Marketing Emails',
                        description: 'Receive product updates and marketing communications',
                      },
                    ].map(notifType => (
                      <div
                        key={notifType.key}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary"
                      >
                        <Checkbox
                          checked={
                            notificationSettings.notificationTypes[
                              notifType.key as keyof typeof notificationSettings.notificationTypes
                            ]
                          }
                          onCheckedChange={(v: any) =>
                            handleNotificationChange(
                              'notificationTypes',
                              notifType.key,
                              v as boolean
                            )
                          }
                        />
                        <div>
                          <p className="font-medium text-foreground text-xsplus">{notifType.label}</p>
                          <p className="text-xsplus text-gray-600">{notifType.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SECURITY TAB */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-base font-semibold text-foreground mb-1">Security Settings</h2>
                  <p className="text-xsplus text-gray-600 mb-6">
                    Manage your account security and authentication methods.
                  </p>
                </div>

                <div className="border border-gray-150 rounded-lg p-4">
                  <h3 className="text-base font-semibold text-foreground mb-1">Password</h3>
                  <p className="text-xsplus text-gray-600 mb-4">
                    Update your password regularly to keep your account secure.
                  </p>
                  <Button label="Change Password" variant="white" />
                </div>

                <div className="border border-gray-150 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-foreground">
                        Two-Factor Authentication
                      </h3>
                      <p className="text-xsplus text-gray-600 mt-1">
                        Add an extra layer of security by requiring both your password and a
                        verification code.
                      </p>
                    </div>
                    <Switch
                      checked={securitySettings.twoFactorAuth}
                      onCheckedChange={(v: any) => handleSecurityChange('twoFactorAuth', v)}
                    />
                  </div>
                </div>

                <div className="border border-gray-150 rounded-lg p-4">
                  <h3 className="text-base font-semibold text-foreground mb-1">
                    Session Management
                  </h3>
                  <p className="text-xsplus text-gray-600 mb-4">
                    Control how long you stay logged in before requiring re-authentication.
                  </p>

                  <p className="text-xsplus text-gray-800 mb-2">Session Timeout</p>
                  <p className="text-xsplus text-gray900 mb-4">30 minutes</p>
                </div>

                <div className="border border-gray-150 rounded-lg p-4">
                  <h3 className="text-base font-semibold text-foreground mb-1">
                    Device Management
                  </h3>
                  <p className="text-xsplus text-gray-600 mb-4">
                    View and manage devices currently signed in to your account.
                  </p>
                  <Button label="View Active Devices" variant="white" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
