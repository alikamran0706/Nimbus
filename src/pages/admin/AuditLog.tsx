import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'

const auditLogs = [
  {
    id: 1,
    timestamp: '2023-07-10 09:23:45',
    user: 'admin@jobcompany.com',
    action: 'User Created',
    details: 'Created user recruiter@company.com',
    status: 'success',
    ip: '192.168.1.1',
  },
  {
    id: 2,
    timestamp: '2023-07-10 09:15:22',
    user: 'admin@jobcompany.com',
    action: 'Integration Updated',
    details: 'Updated LinkedIn API credentials',
    status: 'warning',
    ip: '192.168.1.3',
  },
  {
    id: 3,
    timestamp: '2023-07-09 18:05:31',
    user: 'sarah.j@company.com',
    action: 'Login',
    details: 'Successful login',
    status: 'success',
    ip: '192.168.1.5',
  },
  {
    id: 4,
    timestamp: '2023-07-09 11:43:33',
    user: 'michael.b@company.com',
    action: 'Permission Changed',
    details: 'Added admin role to user emily.d@company.com',
    status: 'warning',
    ip: '192.168.1.12',
  },
  {
    id: 5,
    timestamp: '2023-07-09 10:14:20',
    user: 'emily.d@company.com',
    action: 'Backup Completed',
    details: 'Automated daily backup completed successfully',
    status: 'success',
    ip: '177.0.0.1',
  },
  {
    id: 6,
    timestamp: '2023-07-08 12:12:09',
    user: 'emily.d@company.com',
    action: 'Category Created',
    details: "Created job category 'Machine Learning'",
    status: 'success',
    ip: '192.168.1.80',
  },
  {
    id: 7,
    timestamp: '2023-07-08 09:45:18',
    user: 'admin@jobcompany.com',
    action: 'User Deleted',
    details: 'Deleted user john.d@company.com',
    status: 'warning',
    ip: '192.168.1.7',
  },
  {
    id: 8,
    timestamp: '2023-07-08 09:21:44',
    user: 'system',
    action: 'Error',
    details: 'WhatsApp API connection failed',
    status: 'error',
    ip: '127.0.0.1',
  },
]

export default function AdminAuditLogs() {
  const [actionFilter, setActionFilter] = useState('All Actions')
  const [userFilter, setUserFilter] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  const filteredLogs = auditLogs.filter(
    log =>
      (actionFilter === 'All Actions' || log.action === actionFilter) &&
      (userFilter === '' || log.user.toLowerCase().includes(userFilter.toLowerCase()))
  )

  return (
    <div className="space-y-6 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Title + Subtitle */}
        <div>
          <h1 className="text-lg font-bold text-gray-900">Audit Logs</h1>
          <p className="text-sm text-gray-600">
            System activity tracking for security and compliance
          </p>
        </div>

        {/* Export Button */}
        <div className="w-full sm:w-auto">
          <Button
            className="w-full sm:w-auto bg-gray-100 text-gray-800 hover:bg-gray-200 text-sm rounded-md flex items-center justify-center gap-2"
            label="Export Logs"
            variant="gray"
            startIcon={<img src="/svg/gray-file-download.svg" alt="export" className="w-4 h-4" />}
          />
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-white border border-gray-100 shadow-sm">
        <CardContent className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
            {/* Date Range */}
            <div className="md:col-span-2">
              <label className="text-xs font-medium text-gray-600">Date Range</label>
              <div className="flex gap-2 items-center">
                <Input
                  type="date"
                  value={fromDate}
                  onChange={e => setFromDate(e.target.value)}
                  className="mt-1 w-full"
                />
                <span className="text-gray-600 text-sm">to</span>
                <Input
                  type="date"
                  value={toDate}
                  onChange={e => setToDate(e.target.value)}
                  className="mt-1 w-full"
                />
              </div>
            </div>

            {/* Action Type */}
            <div>
              <label className="text-xs font-medium text-gray-600">Action Type</label>
              <select
                value={actionFilter}
                onChange={e => setActionFilter(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-600"
              >
                <option>All Actions</option>
                <option>User Created</option>
                <option>Integration Updated</option>
                <option>Login</option>
                <option>Permission Changed</option>
                <option>Backup Completed</option>
                <option>Category Created</option>
                <option>User Deleted</option>
                <option>Error</option>
              </select>
            </div>

            {/* User Filter */}
            <div className="md:col-span-2">
              <label className="text-xs font-medium text-gray-600">User</label>
              <Input
                placeholder="Filter by user"
                value={userFilter}
                onChange={e => setUserFilter(e.target.value)}
                className="mt-1 w-full"
              />
            </div>

            {/* Apply Button */}
            <div className="flex items-end justify-end">
              <Button
                label="Apply Filters"
                className="bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-lg"
                startIcon={<img src="/svg/white-filter.svg" alt="filter" className="w-4 h-4" />}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="bg-white border border-gray-100 ">
        <div className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-150">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Timestamp</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">User</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Action</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Details</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">IP Address</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map(log => (
                <tr
                  key={log.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 text-gray-600 text-xs">{log.timestamp}</td>
                  <td className="py-3 px-4 text-gray-900">{log.user}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        log.action.includes('Created')
                          ? 'bg-green-100 text-green-700'
                          : log.action.includes('Updated') ||
                            log.action.includes('Changed') ||
                            log.action.includes('Deleted')
                          ? 'bg-red-100 text-red-700'
                          : log.action.includes('Error')
                          ? 'bg-red-200 text-red-800'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{log.details}</td>
                  <td className="py-3 px-4 text-gray-600 text-xs">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Pagination */}
      <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
        <p>Showing 1–8 of 265 logs</p>
        <div className="flex items-center gap-2">
          <button className="border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-100">
            Previous
          </button>
          <button className="border border-gray-300 rounded-md px-3 py-1 bg-gray-100">1</button>
          <button className="border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-100">
            2
          </button>
          <button className="border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-100">
            3
          </button>
          <button className="border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-100">
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
