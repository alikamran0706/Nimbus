import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'

const connectedGroups = [
  {
    id: 1,
    name: 'Recruiter team',
    members: 25,
    messages: 342,
    status: 'Active',
    lastSync: 'Today 10:15 AM',
  },
  {
    id: 2,
    name: 'Tech support',
    members: 14,
    messages: 190,
    status: 'Active',
    lastSync: 'Yesterday 8:42 PM',
  },
  {
    id: 3,
    name: 'Manager escalation',
    members: 8,
    messages: 72,
    status: 'Disconnected',
    lastSync: '2 days ago',
  },
]

const importLogs = [
  {
    id: 1,
    name: 'Gmail Import',
    records: '1,256 emails imported',
    color: 'bg-green-100',
    status: 'Completed',
    log: 'View log',
    icon: '/svg/circle-dark-green-tick.svg',
  },
  {
    id: 2,
    name: 'CSV Import',
    records: '584 candidates imported',
    color: 'bg-red-100',
    status: 'Completed',
    log: 'View log',
    icon: '/svg/red-circle-cross.svg',
  },
  {
    id: 3,
    name: 'WhatsApp Import',
    records: '12 groups imported',
    color: 'bg-yellow-100',
    status: 'Completed',
    log: 'View log',
    icon: '/svg/yellow-triangle-alert.svg',
  },
  {
    id: 4,
    name: 'Resume Bulk Upload',
    records: '87 resumes imported',
    color: 'bg-green-100',
    status: 'Completed',
    log: 'View log',
    icon: '/svg/circle-dark-green-tick.svg',
  },
]

const stats = [
  { id: 1, label: 'Total Imports', value: '12', desc: 'Last 30 days', icon: '/svg/red-mail.svg' },
  {
    id: 2,
    label: 'Emails Imported',
    value: '1,256',
    desc: 'From Gmail',
    icon: '/svg/red-mail.svg',
  },
  {
    id: 3,
    label: 'WhatsApp Imported',
    value: '584',
    desc: 'Messages processed',
    icon: '/svg/green-message.svg',
  },
  {
    id: 4,
    label: 'Resumes Imported',
    value: '87',
    desc: 'From bulk uploads',
    icon: '/svg/purple-file.svg',
  },
]

export default function AdminDataMigration() {
  const [activeTab, setActiveTab] = useState('upload')

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-lg font-semibold text-gray-900">Data Migration Tool</h1>
        <p className="text-sm text-gray-600">Import recruiter, candidate, and communication data</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {[
          { key: 'upload', label: 'Upload Data' },
          { key: 'import', label: 'Import History' },
          { key: 'settings', label: 'Settings' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === tab.key
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* ================= TAB 1: UPLOAD DATA ================= */}
      {activeTab === 'upload' && (
        <>
          {/* Import Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-white border border-gray-100 shadow-sm text-center">
              <CardContent className="py-6">
                <img src="/svg/red-mail.svg" alt="gmail" className="mx-auto w-6 h-6 mb-3" />
                <p className="font-semibold text-gray-900 text-sm mb-1">Gmail Import</p>
                <p className="text-xs text-gray-600 mb-3">
                  Import recruiter conversations from Gmail inbox
                </p>
                <Button
                  className="text-xsplus px-3 py-1.5 rounded-md w-full"
                  label="Connect Gmail"
                  variant="white"
                />
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-100 shadow-sm text-center">
              <CardContent className="py-6">
                <img src="/svg/green-message.svg" alt="whatsapp" className="mx-auto w-6 h-6 mb-3" />
                <p className="font-semibold text-gray-900 text-sm mb-1">WhatsApp Import</p>
                <p className="text-xs text-gray-600 mb-3">Import WhatsApp messages & group chats</p>

                <Button
                  className="text-xsplus px-3 py-1.5 rounded-md w-full"
                  label=" Upload WhatsApp Export"
                  variant="white"
                />
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-100 shadow-sm text-center">
              <CardContent className="pt-6">
                <img src="/svg/purple-file.svg" alt="csv" className="mx-auto w-6 h-6 mb-3" />
                <p className="font-semibold text-gray-900 text-sm mb-1">CSV Upload Import</p>
                <p className="text-xs text-gray-600 mb-3">
                  Import candidate data from spreadsheets
                </p>
                <Button
                  className="text-xsplus px-3 py-1.5 rounded-md w-full"
                  label="Select File"
                  variant="white"
                />
              </CardContent>
            </Card>
          </div>

          {/* WhatsApp Integration */}
          <Card className="bg-white border border-gray-100 shadow-sm">
            <CardContent className="space-y-4 py-4">
              <div className="text-gray-900 text-sm font-semibold">WhatsApp Group Integration</div>
              <p className="text-xs text-gray-600">
                Connect to WhatsApp groups to automatically import conversations and manage
                messages.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left side - Form */}
                <div className="space-y-4">
                  {/* Group Name */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Group Name
                    </label>
                    <input
                      type="text"
                      placeholder="Recruiter Group"
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  {/* Group Phone Number */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Group Phone Number
                    </label>
                    <input
                      type="text"
                      placeholder="+92 300 1234567"
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  {/* Button */}
                  <div className="flex items-end">
                    <Button
                      label="Connect to WhatsApp"
                      className="text-xsplus px-4 py-2 rounded-md"
                      variant="green"
                    />
                  </div>
                </div>

                {/* Right side - Notes */}
                <div className="bg-gray-50 p-4 rounded-lg text-xs text-gray-700 flex flex-col justify-center">
                  <p className="font-semibold mb-1 text-gray-800">Setup Notes:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Scan the QR code from your WhatsApp app</li>
                    <li>Wait until the group sync completes</li>
                    <li>Once synced, imported data will display in the connected group list</li>
                  </ul>
                  <p className="bg-yellow-50 text-[#854D0E] p-2 rounded-lg mt-2 text-xsmall">
                    Note: You must be an admin of the WhatsApp group to enable certain integration
                    features.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Connected Groups */}
          <Card className="bg-white border border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900 text-sm font-semibold pt-6">
                Connected WhatsApp Groups
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Group Name
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Members</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Messages</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Last Sync</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {connectedGroups.map(group => (
                      <tr key={group.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-900 font-medium">{group.name}</td>
                        <td className="py-3 px-4 text-gray-600">{group.members}</td>
                        <td className="py-3 px-4 text-gray-600">{group.messages}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              group.status === 'Active'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {group.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600 text-xs">{group.lastSync}</td>
                        <td className="py-3 px-4 flex items-center gap-2">
                          <img
                            src="/svg/blue-eye.svg"
                            alt="sync"
                            className="w-4 h-4 cursor-pointer"
                          />
                          <img
                            src="/svg/admin/red-delete.svg"
                            alt="delete"
                            className="w-4 h-4 cursor-pointer"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Resume Upload Section */}
          <Card className="bg-white border border-gray-100 shadow-sm">
            <div className="px-4 pt-4">
              <p className="text-gray-900 text-sm font-semibold">Bulk Resume Upload</p>
            </div>
            <div className="px-4 pb-4">
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-10 rounded-lg text-center">
                <img
                  src="/svg/black-file-upload.svg"
                  alt="upload"
                  className="w-6 h-6 mb-3 opacity-70"
                />
                <p className="text-sm text-gray-700 font-medium mb-2">
                  Drag and drop your resume files
                </p>
                <p className="text-xs text-gray-500 mb-4">PDF, DOCX, and TXT formats supported</p>
                <Button className="text-xsplus px-4 py-2 rounded-lg" label="Browse Files" />
              </div>
            </div>
          </Card>
        </>
      )}

      {/* ================= TAB 2: IMPORT HISTORY ================= */}
      {activeTab === 'import' && (
        <>
          <Card className="bg-white border border-gray-100 shadow-sm">
            <CardContent className="py-4">
              <p className="text-gray-900 text-sm font-semibold mb-4">Recent Imports</p>
              <div className="space-y-3">
                {importLogs.map(log => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between border border-gray-100 rounded-lg p-3 hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 ${log.color} flex items-center justify-center rounded-full`}
                      >
                        <img src={log.icon} alt={log.name} className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{log.name}</p>
                        <p className="text-xs text-gray-600">{log.records}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-green-600 font-medium">{log.status}</span>
                      <button className="text-xs text-primary-600 font-semibold hover:underline">
                        {log.log}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Import Stats */}
          <Card className="bg-white border border-gray-100 shadow-sm">
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-4">
              {stats.map(item => (
                <div
                  key={item.id}
                  className="flex justify-between gap-3 border border-gray-100 rounded-lg p-3"
                >
                  <div>
                    <p className="text-xs text-gray-600">{item.label}</p>
                    <p className="text-gray-900 font-semibold text-sm">{item.value}</p>
                    <p className="text-xs text-gray-600">{item.desc}</p>
                  </div>
                  <img src={item.icon} alt={item.label} className="w-4 h-4" />
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      )}

      {/* ================= TAB 3: SETTINGS ================= */}
      {activeTab === 'settings' && (
        <Card className="bg-white border border-gray-100 shadow-sm">
          <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-6">
            {/* Left Side: Import Settings */}
            <div className="space-y-4">
              <p className="text-gray-900 text-sm font-semibold">Import Settings</p>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Default Data Format</label>
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full">
                  <option>MM/DD/YYYY</option>
                  <option>DD/MM/YYYY</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Duplicate Handling</label>
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full">
                  <option>Skip duplicates</option>
                  <option>Overwrite existing</option>
                </select>
              </div>

              <div className="space-y-2 text-xs text-gray-700">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  Auto-detect candidate information from emails
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  Discard contact drafts from resume uploads
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  Email notifications after import completion
                </label>
              </div>
            </div>

            {/* Right Side: Connected Accounts */}
            <div className="space-y-4">
              <p className="text-gray-900 text-sm font-semibold">Connected Accounts</p>

              <div className="border border-gray-200 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src="/svg/red-mail.svg" className="w-5 h-5" />
                  <span className="text-sm text-gray-800">Gmail</span>
                </div>
                <button className="text-xs text-primary-600 font-medium">Disconnect</button>
              </div>

              <div className="border border-gray-200 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 bg-gray-50 flex items-center justify-center rounded-full`}
                  >
                    <img src="/svg/gray-drum.svg" className="w-5 h-5" />
                  </div>
                  <span className="text-sm text-gray-800">Legacy ATS</span>
                </div>
                <button className="text-xs text-green-600 font-medium">Connected</button>
              </div>

              <button className="text-xs text-primary-600 font-medium hover:underline">
                + Connect New Account
              </button>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Data Retention</label>
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full">
                  <option>30 days</option>
                  <option>90 days</option>
                  <option>1 year</option>
                </select>
              </div>

              {/* <Button
                className="bg-red-50 text-primary-600 hover:bg-red-100 text-xsplus px-4 py-2 rounded-md w-full mt-2"
                label="Clear All Import History"
              /> */}
               <button className="text-primary-600 border border-primary-600  text-xs font-medium px-3 py-1.5 rounded-lg">
                      Clear All Import History
                    </button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
