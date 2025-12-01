import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/Button'
import { Switch } from '@/components/ui/Switch'

export default function AutomaticSchedulingPage() {
  const [enabled, setEnabled] = useState(true)
  const [activeTab, setActiveTab] = useState('settings')

  const [availability, setAvailability] = useState([
    { day: 'Monday', start: '9:00 AM', end: '5:00 PM' },
    { day: 'Tuesday', start: '9:00 AM', end: '5:00 PM' },
    { day: 'Wednesday', start: '9:00 AM', end: '5:00 PM' },
    { day: 'Thursday', start: '9:00 AM', end: '5:00 PM' },
    { day: 'Friday', start: '9:00 AM', end: '5:00 PM' },
    { day: 'Saturday', start: '', end: '', unavailable: true },
    { day: 'Sunday', start: '', end: '', unavailable: true },
  ])

  const [blockDates, setBlockDates] = useState([
    { id: 1, date: 'July 4, 2023', reason: 'Independence Day' },
    { id: 2, date: 'May 1, 2023', reason: 'Labor Day' },
  ])

  const interviewers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@company.com',
      role: 'Ship Management',
      types: ['Technical', 'Cultural Fit'],
      status: 'Active',
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'mchen@company.com',
      role: 'Night Supervisor',
      types: ['Technical'],
      status: 'Inactive',
    },
    {
      id: 3,
      name: 'Rachel Kim',
      email: 'rkim@company.com',
      role: 'Port Captain',
      types: ['Portfolio Review'],
      status: 'Online',
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-semibold text-gray-900">Automatic Scheduling</h1>
          <p className="text-sm text-gray-600">
            Configure how candidates can schedule interviews automatically
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-700">Enabled</span>
          <Switch checked={enabled} onCheckedChange={setEnabled} />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-gray-200 scrollbar-hide">
        <div className="flex gap-4 min-w-max px-2">
          {['Settings', 'Availability', 'Calendar Integration', 'Interviewers'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase().replace(' ', '-'))}
              className={`whitespace-nowrap px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.toLowerCase().replace(' ', '-')
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ========== SETTINGS TAB ========== */}
      {activeTab === 'settings' && (
        <Card className="bg-white border border-gray-100 shadow-sm">
          <CardContent className="space-y-6 p-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">General Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Default Interview Duration" value="60 minutes" />
                <InputField label="Buffer Time Between Interviews" value="15 minutes" />
                <InputField label="Scheduling Window (Days in advance)" value="14 days" />
                <InputField label="Minimum Notice Period" value="24 hours" />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Candidate Experience</h3>
              <InputField
                label="Scheduling Page Title"
                value="Schedule Your Interview with ACME Corp"
              />
              <TextareaField
                label="Welcome Message"
                value="Thank you for your interest in ACME Corp. Please select a convenient time for your interview from the available slots below."
              />
              <div>
                <label className="text-xs text-gray-600 font-medium">Scheduling Page URL</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-600 text-xs rounded-l-md">
                    https://interviews.company.com/
                  </span>
                  <input
                    type="text"
                    defaultValue="acme-interviews"
                    className="border border-gray-300 rounded-r-md px-3 py-2 text-sm w-full"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                label="Cancel"
                variant="white"
                className="text-xsplus px-4 py-2 rounded-md border"
              />
              <Button
                label="Save Settings"
                className="text-xsplus px-4 py-2 rounded-md bg-primary-600 text-white"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* ========== AVAILABILITY TAB ========== */}
      {activeTab === 'availability' && (
        <Card className="bg-white border border-gray-100 shadow-sm">
          <CardContent className="p-6 space-y-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Default Availability</h3>

            <div className="space-y-3">
              {availability.map((day, idx) => (
                <div key={idx} className="flex flex-wrap items-center gap-2">
                  <div className="w-24 text-sm text-gray-800">{day.day}</div>
                  {day.unavailable ? (
                    <span className="text-xs text-gray-500 italic">Unavailable</span>
                  ) : (
                    <>
                      <input
                        type="text"
                        value={day.start}
                        className="border border-gray-300 rounded-md px-3 py-1.5 text-xs"
                        readOnly
                      />
                      <span className="text-gray-500 text-xs">to</span>
                      <input
                        type="text"
                        value={day.end}
                        className="border border-gray-300 rounded-md px-3 py-1.5 text-xs"
                        readOnly
                      />
                      <button className="text-primary-600 text-xs font-medium ml-2 hover:underline">
                        + Add new slot
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Blockout Dates */}
            <div className="pt-6 border-t border-gray-200 space-y-3">
              <h3 className="text-sm font-semibold text-gray-900">Blockout Dates</h3>
              <p className="text-xs text-gray-500">
                Add dates where interviews should not be scheduled (holidays, company events, etc.)
              </p>

              <div className="space-y-2">
                {blockDates.map(b => (
                  <div
                    key={b.id}
                    className="flex items-center justify-between border rounded-lg p-2"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">{b.date}</p>
                      <p className="text-xs text-gray-600">{b.reason}</p>
                    </div>
                    <button className="text-xs text-primary-600 hover:underline">Remove</button>
                  </div>
                ))}
                <Button
                  label="Add Blockout Date"
                  variant="white"
                  className="text-xsplus px-4 py-2 border rounded-md text-primary-600"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button label="Cancel" variant="white" className="text-xsplus border" />
                <Button label="Save Availability" className="text-xsplus bg-primary-600 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ========== CALENDAR INTEGRATION TAB ========== */}
      {activeTab === 'calendar-integration' && (
        <Card className="bg-white border border-gray-100 shadow-sm">
          <CardContent className="p-6 space-y-6">
            <h3 className="text-sm font-semibold text-gray-900">Calendar Connections</h3>

            {[
              { name: 'Google Calendar', email: 'sarah@company.com', connected: true },
              { name: 'Microsoft Outlook', email: '', connected: false },
              { name: 'Apple iCloud', email: '', connected: false },
            ].map((cal, i) => (
              <div
                key={i}
                className="border rounded-lg flex items-center justify-between p-3 hover:bg-gray-50"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{cal.name}</p>
                  {cal.email && <p className="text-xs text-gray-600">{cal.email}</p>}
                </div>
                {cal.connected ? (
                  <button className="text-xs text-green-700 font-medium border border-green-200 rounded-md px-3 py-1">
                    Connected
                  </button>
                ) : (
                  <button className="text-xs text-primary-600 border border-red-200 rounded-md px-3 py-1">
                    Connect
                  </button>
                )}
              </div>
            ))}

            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900">Calendar Settings</h3>
              <div className="space-y-2 mt-3 text-xs text-gray-700">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                  Create calendar events automatically
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  Check for calendar conflicts
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  Automatically invite interviewers via calendar events
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button label="Cancel" variant="white" className="text-xsplus border" />
                <Button label="Save Settings" className="text-xsplus bg-primary-600 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ========== INTERVIEWERS TAB ========== */}
     {activeTab === 'interviewers' && (
  <Card className="bg-white border border-gray-100 shadow-sm">
    <CardContent className="p-6 space-y-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Manage Interviewers</h3>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <table className="min-w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-left text-xs text-gray-600">
              <th className="py-2 px-4 whitespace-nowrap">Name</th>
              <th className="py-2 px-4 whitespace-nowrap">Role</th>
              <th className="py-2 px-4 whitespace-nowrap">Interview Types</th>
              <th className="py-2 px-4 whitespace-nowrap">Status</th>
              <th className="py-2 px-4 text-right whitespace-nowrap">Action</th>
            </tr>
          </thead>

          <tbody>
            {interviewers.map(i => (
              <tr key={i.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <p className="font-medium text-gray-900">{i.name}</p>
                  <p className="text-xs text-gray-500 truncate max-w-[160px]">{i.email}</p>
                </td>

                <td className="px-4">{i.role}</td>

                <td className="px-4">
                  <div className="flex flex-wrap gap-1">
                    {i.types.map((t, idx) => (
                      <span
                        key={idx}
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          t === 'Technical'
                            ? 'bg-blue-50 text-blue-700'
                            : t === 'Cultural Fit'
                            ? 'bg-purple-50 text-purple-700'
                            : 'bg-yellow-50 text-yellow-700'
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </td>

                <td className="px-4">
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      i.status === 'Active'
                        ? 'bg-green-50 text-green-700'
                        : i.status === 'Online'
                        ? 'bg-yellow-50 text-yellow-700'
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {i.status}
                  </span>
                </td>

                <td className="px-4 text-right">
                  <button className="text-xs text-primary-600 font-medium hover:underline">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4">
        <Button
          label="+ Add Interviewer"
          variant="white"
          className="text-xsplus border w-full sm:w-auto rounded-md"
        />
        <div className="flex gap-3 w-full sm:w-auto justify-end">
          <Button
            label="Cancel"
            variant="white"
            className="text-xsplus border w-1/2 sm:w-auto rounded-md"
          />
          <Button
            label="Save Settings"
            className="text-xsplus bg-primary-600 text-white w-1/2 sm:w-auto rounded-md"
          />
        </div>
      </div>
    </CardContent>
  </Card>
)}

    </div>
  )
}

function InputField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="text-xs text-gray-600 font-medium">{label}</label>
      <input
        type="text"
        defaultValue={value}
        className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
      />
    </div>
  )
}

function TextareaField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="text-xs text-gray-600 font-medium">{label}</label>
      <textarea
        rows={3}
        defaultValue={value}
        className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
      />
    </div>
  )
}
