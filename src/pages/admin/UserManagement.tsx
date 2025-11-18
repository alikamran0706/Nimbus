import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

const users = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2024-06-15 10:30',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'Recruiter',
    status: 'active',
    lastLogin: '2024-06-15 09:15',
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael@example.com',
    role: 'Recruiter',
    status: 'inactive',
    lastLogin: '2024-06-10 16:10',
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily@example.com',
    role: 'Recruiter',
    status: 'active',
    lastLogin: '2024-06-14 14:20',
  },
  {
    id: 5,
    name: 'Robert Wilson',
    email: 'robert@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2024-06-15 08:42',
  },
]

export default function AdminUserManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('All Roles')
  const [statusFilter, setStatusFilter] = useState('All Statuses')

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === 'All Roles' || user.role === roleFilter
    const matchesStatus = statusFilter === 'All Statuses' || user.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  return (
    <div className="space-y-6 p-6 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-base font-bold text-gray-900">User Management</h1>
        <Button
          className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 rounded-lg"
          startIcon={<img src="/svg/white-plus.svg" alt="add" className="w-4 h-4" />}
          label="Add User"
        />
      </div>

      {/* Filters */}
      <Card className="bg-white shadow-sm border border-gray-100">
        <CardContent>
          <h3 className="text-base">Filters</h3>
          <div className="py-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
              {/* Role Filter */}
              <div className="w-full">
                <label className="text-sm font-medium text-gray-700">Role</label>
                <select
                  value={roleFilter}
                  onChange={e => setRoleFilter(e.target.value)}
                  className="mt-1 border border-gray-300 rounded-lg px-3 py-2 w-full h-[42px] text-sm focus:ring-2 focus:ring-red-600"
                >
                  <option>All Roles</option>
                  <option>Admin</option>
                  <option>Recruiter</option>
                  <option>Manager</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="w-full">
                <label className="text-sm font-medium text-gray-700">Status</label>
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="mt-1 border border-gray-300 rounded-lg px-3 py-2 w-full h-[42px] text-sm focus:ring-2 focus:ring-red-600"
                >
                  <option>All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Search */}
              <div className="w-full">
                <label className="text-sm font-medium text-gray-700">Search</label>
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="mt-1 w-full h-[42px]"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="bg-white shadow-sm border border-gray-100">
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-150">
              <tr>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Name</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Email</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Role</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Last Login</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr
                  key={user.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-6 text-gray-900 font-medium">{user.name}</td>
                  <td className="py-3 px-6 text-gray-600">{user.email}</td>
                  <td className="py-3 px-6 text-gray-600">{user.role}</td>
                  <td className="py-3 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-gray-600 text-xs">{user.lastLogin}</td>
                  <td className="py-3 px-6 flex items-center gap-2">
                    <img src="/svg/admin/red-edit.svg" alt="edit" className="icon" />
                    <img src="/svg/admin/red-delete.svg" alt="delete" className="icon" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Footer */}
      <footer className="border-t border-gray-150 mt-12 pt-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-gray-600">
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Admin Panel</h4>
          <p>Powerful AI recruitment and candidate management system for professionals.</p>
          <div className="flex gap-x-4 mt-4">
            <img src="/svg/gray-github.svg" alt="delete" className="icon" />
            <img src="/svg/gray-twitter.svg" alt="delete" className="icon" />
            <img src="/svg/gray-linkedin.svg" alt="delete" className="icon" />
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Quick Links</h4>
          <ul className="space-y-1">
            <li>Dashboard</li>
            <li>User Management</li>
            <li>Integrations</li>
            <li>Job Categories</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Resources</h4>
          <ul className="space-y-1">
            <li className="flex gap-x-2">
              {' '}
              <img src="/svg/gray-book.svg" alt="delete" className="icon" />
              Documentation
            </li>
            <li className="flex gap-x-2">
              {' '}
              <img src="/svg/gray-help.svg" alt="delete" className="icon" />
              Developer Tools
            </li>
            <li className="flex gap-x-2">
              {' '}
              <img src="/svg/gray-message.svg" alt="delete" className="icon" />
              Support
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Legal</h4>
          <ul className="space-y-1">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Admin License</li>
            <li className="flex gap-x-2">
              {' '}
              <img src="/svg/gray-shield.svg" alt="delete" className="icon" />
              Audit Logs
            </li>
          </ul>
        </div>
      </footer>
    </div>
  )
}
