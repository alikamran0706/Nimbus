import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const candidates = [
  {
    id: 1,
    name: 'John Smith',
    department: 'Tech',
    jobTitle: 'Shipyard Technician',
    location: 'Miami, FL',
    status: 'Pending',
    appliedDate: 'Jun 13, 2023',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    department: 'Office',
    jobTitle: 'Front Desk Manager',
    location: 'New York, NY',
    status: 'Shortlisted',
    appliedDate: 'Jun 12, 2023',
  },
  {
    id: 3,
    name: 'Michael Brown',
    department: 'Admin',
    jobTitle: 'Chef',
    location: 'Los Angeles, CA',
    status: 'Rejected',
    appliedDate: 'Jun 9, 2023',
  },
  {
    id: 4,
    name: 'Emily Davis',
    department: 'Security',
    jobTitle: 'Night Guard',
    location: 'Houston, TX',
    status: 'Pending',
    appliedDate: 'Jun 5, 2023',
  },
  {
    id: 5,
    name: 'David Wilson',
    department: 'Admin',
    jobTitle: 'Janitor',
    location: 'New York, NY',
    status: 'Shortlisted',
    appliedDate: 'May 18, 2023',
  },
  {
    id: 6,
    name: 'Jennifer Taylor',
    department: 'Security',
    jobTitle: 'Port Captain',
    location: 'Miami, FL',
    status: 'Pending',
    appliedDate: 'May 12, 2023',
  },
  {
    id: 7,
    name: 'Robert Martinez',
    department: 'Engineering',
    jobTitle: 'Marine Engineer',
    location: 'Boston, MA',
    status: 'Shortlisted',
    appliedDate: 'May 7, 2023',
  },
  {
    id: 8,
    name: 'Lisa Anderson',
    department: 'Admin',
    jobTitle: 'Deputy Head Chef',
    location: 'Seattle, WA',
    status: 'Rejected',
    appliedDate: 'May 1, 2023',
  },
]

export default function AdminCandidatesList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [jobFilter, setJobFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
   const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Shortlisted':
        return 'bg-green-100 text-green-700'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'Rejected':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const filteredCandidates = candidates.filter(
    c =>
      (c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === 'All' || c.status === statusFilter) &&
      (departmentFilter === 'All' || c.department === departmentFilter) &&
      (jobFilter === 'All' || c.jobTitle === jobFilter) &&
      (locationFilter === 'All' || c.location === locationFilter) &&
      (dateFilter === 'All' || c.appliedDate.includes(dateFilter))
  )

  return (
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <img src="/svg/gray-back-arrow.svg" alt="add" className="w-4 h-4" />
          <h1 className="text-base font-semibold text-gray-900">Candidate List</h1>
        </div>
        <span className="text-sm text-gray-600">{filteredCandidates.length} candidates</span>
      </div>

      <div className="bg-white border border-gray-150 rounded-lg p-4">
        {/* Search Bar */}
        <div className="mb-4">
          <Input
            placeholder="Search candidates..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full text-sm bg-gray-50 border-gray-200"
          />
        </div>
        {/* Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div className="flex flex-col">
            <label className="text-800 text-xsplus">Status</label>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-gray-300"
            >
              <option>All</option>
              <option>Shortlisted</option>
              <option>Pending</option>
              <option>Rejected</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-800 text-xsplus">Department</label>
            <select
              value={departmentFilter}
              onChange={e => setDepartmentFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-gray-300"
            >
              <option>All</option>
              <option>Tech</option>
              <option>Office</option>
              <option>Admin</option>
              <option>Engineering</option>
              <option>Security</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-800 text-xsplus">Job Title</label>
            <select
              value={jobFilter}
              onChange={e => setJobFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-gray-300"
            >
              <option>All</option>
              <option>Shipyard Technician</option>
              <option>Front Desk Manager</option>
              <option>Chef</option>
              <option>Night Guard</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-800 text-xsplus">Location</label>
            <select
              value={locationFilter}
              onChange={e => setLocationFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-gray-300"
            >
              <option>All</option>
              <option>Miami, FL</option>
              <option>New York, NY</option>
              <option>Los Angeles, CA</option>
              <option>Boston, MA</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-800 text-xsplus">Date Applied</label>
            <select
              value={dateFilter}
              onChange={e => setDateFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-gray-300"
            >
              <option>All</option>
              <option>Jun</option>
              <option>May</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <Card className="bg-white border border-gray-100 ">
        <div className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-150">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Candidate</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Department</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Applied Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.map(c => (
                <tr
                  key={c.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <Link to={'/admin/candidate'}>
                      <div className="flex gap-2">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <img src="/svg/gray-user.svg" alt="user" className="w-4 h-4" />
                        </div>

                        <div>
                          <p className="font-medium text-gray-900">{c.name}</p>
                          <p className="text-xs text-gray-600">{c.jobTitle}</p>
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        c.status
                      )}`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{c.department}</td>
                  <td className="py-3 px-4 text-gray-600 text-xs">{c.appliedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
