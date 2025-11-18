import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

const jobs = [
  {
    id: 1,
    title: 'Ship Captain',
    category: 'Marine Crew',
    department: 'Operations',
    location: 'Miami, FL',
    salaryRange: '$120,000 - $180,000',
    postedDate: 'Jul 15, 2023',
    applications: 12,
    status: 'Active',
  },
  {
    id: 2,
    title: 'Chief Engineer',
    category: 'Marine Crew',
    department: 'Engineering',
    location: 'Seattle, WA',
    salaryRange: '$110,000 - $160,000',
    postedDate: 'Jul 10, 2023',
    applications: 18,
    status: 'Active',
  },
  {
    id: 3,
    title: 'Cruise Director',
    category: 'Passenger Ship',
    department: 'Entertainment',
    location: 'Miami, FL',
    salaryRange: '$85,000 - $110,000',
    postedDate: 'Jul 8, 2023',
    applications: 28,
    status: 'Active',
  },
  {
    id: 4,
    title: 'Head Chef',
    category: 'Hotel Staff',
    department: 'Food Service',
    location: 'Los Angeles, CA',
    salaryRange: '$75,000 - $100,000',
    postedDate: 'Jul 5, 2023',
    applications: 19,
    status: 'Active',
  },
  {
    id: 5,
    title: 'Port Manager',
    category: 'Marine Shore Jobs',
    department: 'Operations',
    location: 'New York, NY',
    salaryRange: '$90,000 - $120,000',
    postedDate: 'Jul 3, 2023',
    applications: 24,
    status: 'Active',
  },
  {
    id: 6,
    title: 'Offshore Technician',
    category: 'Offshore Construction',
    department: 'Engineering',
    location: 'Houston, TX',
    salaryRange: '$85,000 - $115,000',
    postedDate: 'Jun 28, 2023',
    applications: 18,
    status: 'Active',
  },
  {
    id: 7,
    title: 'Seismic Data Analyst',
    category: 'Seismic/Survey Project Crew',
    department: 'Data Processors',
    location: 'New Orleans, LA',
    salaryRange: '$75,000 - $100,000',
    postedDate: 'Jun 25, 2023',
    applications: 9,
    status: 'Draft',
  },
  {
    id: 8,
    title: 'Senior Surveyor',
    category: 'Seismic/Survey Project Crew',
    department: 'Surveyors',
    location: 'Houston, TX',
    salaryRange: '$90,000 - $125,000',
    postedDate: 'Jun 22, 2023',
    applications: 8,
    status: 'Active',
  },
  {
    id: 9,
    title: 'Survey Party Chief',
    category: 'Seismic/Survey Project Crew',
    department: 'Party Chief',
    location: 'Aberdeen, UK',
    salaryRange: '$110,000 - $140,000',
    postedDate: 'Jun 20, 2023',
    applications: 6,
    status: 'Active',
  },
  {
    id: 10,
    title: 'Navigation Officer',
    category: 'Seismic/Survey Project Crew',
    department: 'Navigators',
    location: 'Singapore',
    salaryRange: '$85,000 - $115,000',
    postedDate: 'Jun 19, 2023',
    applications: 11,
    status: 'Active',
  },
  {
    id: 11,
    title: 'Wind Farm Technician',
    category: 'Renewable Energy',
    department: 'Engineering',
    location: 'Boston, MA',
    salaryRange: '$70,000 - $95,000',
    postedDate: 'Jun 20, 2023',
    applications: 15,
    status: 'Active',
  },
  {
    id: 12,
    title: 'Marine Biologist',
    category: 'Other',
    department: 'Research',
    location: 'San Diego, CA',
    salaryRange: '$65,000 - $90,000',
    postedDate: 'Jun 18, 2023',
    applications: 13,
    status: 'Active',
  },
]

export default function AdminJobsManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    phone: '',
  })

  const filteredJobs = jobs.filter(
    job =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="space-y-6 py-6">
      <div className="flex flex-col">
        <h1 className="text-base font-bold text-gray-900">Jobs List</h1>
        <p className='text-gray-600 text-xsplus'>Browse and filter available maritime job openings</p>
      </div>

      <div className="px-4 sm:px-6 py-4 bg-white rounded-md border border-gray-150 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <p className="text-gray-900 text-sm">Filters</p>
          <button className="text-sm text-gray-900 flex items-center gap-2">
            <img src={'/svg/gray-filter.svg'} className="w-4 h-4" alt="icon" />
            Filter jobs
          </button>
        </div>

        {/* Filter Form */}
        <div>
          <label className="text-800 text-xsplus">Searh Jobs</label>
          <div className="grid grid-cols-1 mb-4">
            <div className="relative w-full">
              <svg
                className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search by job title or keywords..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pr-3 pl-9 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="text-800 text-xsplus">Min Salary</label>
            <input
              type={'number'}
              name={'min'}
              placeholder={'Min'}
              // value={filters[name]}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="text-800 text-xsplus">Max Salary</label>
            <input
              type={'number'}
              name={'min'}
              placeholder={'Max'}
              // value={filters[name]}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="text-800 text-xsplus">Job Title</label>
            <select
              name={'name'}
              // value={formData[select.name as keyof typeof formData]}
              // onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[0.5px] focus:ring-gray-100"
            >
              {[
                { value: '', label: 'All Jobs Title' },
                { value: 'pk', label: 'Pakistan' },
                { value: 'us', label: 'United States' },
                { value: 'uk', label: 'United Kingdom' },
              ].map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-x-4">
          <div className="w-1/3">
            <label className="text-800 text-xsplus">Location</label>
            <select
              name={'name'}
              // value={formData[select.name as keyof typeof formData]}
              // onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[0.5px] focus:ring-gray-100"
            >
              {[
                { value: '', label: 'All Locations' },
                { value: 'pk', label: 'Pakistan' },
                { value: 'us', label: 'United States' },
                { value: 'uk', label: 'United Kingdom' },
              ].map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="w-1/3">
            <label className="text-800 text-xsplus">Department</label>
            <select
              name={'name'}
              // value={formData[select.name as keyof typeof formData]}
              // onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[0.5px] focus:ring-gray-100"
            >
              {[
                { value: '', label: 'All Departments' },
                { value: 'pk', label: 'Pakistan' },
                { value: 'us', label: 'United States' },
                { value: 'uk', label: 'United Kingdom' },
              ].map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <Card className="bg-white border border-gray-150 rounded-2xl shadow-sm">
        <div className="">
          {/* Header */}
          <div className="flex justify-between items-center mb-4 px-4 pt-4">
            <h1 className="text-base font-bold text-gray-900">Available Jobs</h1>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 rounded-md text-sm px-3 py-2"
              startIcon={<img src="/svg/white-plus.svg" alt="add" className="w-4 h-4" />}
              label="Add New Job"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-y border-gray-200 text-left">
                  <th className="py-3 px-5 font-semibold text-gray-700">Job Title</th>
                  <th className="py-3 px-5 font-semibold text-gray-700">Category</th>
                  <th className="py-3 px-5 font-semibold text-gray-700">Department</th>
                  <th className="py-3 px-5 font-semibold text-gray-700">Location</th>
                  <th className="py-3 px-5 font-semibold text-gray-700">Salary Range</th>
                  <th className="py-3 px-5 font-semibold text-gray-700">Posted Date</th>
                  <th className="py-3 px-5 font-semibold text-gray-700">Applications</th>
                  <th className="py-3 px-5 font-semibold text-gray-700">Status</th>
                  <th className="py-3 px-5 font-semibold text-gray-700 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredJobs.map(job => (
                  <tr
                    key={job.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-5 text-gray-900 font-medium">{job.title}</td>
                    <td className="py-3 px-5 text-gray-600">{job.category}</td>
                    <td className="py-3 px-5 text-gray-600">{job.department}</td>
                    <td className="py-3 px-5 text-gray-600">{job.location}</td>
                    <td className="py-3 px-5 text-gray-600">{job.salaryRange}</td>
                    <td className="py-3 px-5 text-gray-600">{job.postedDate}</td>
                    <td className="py-3 px-5 text-gray-900 font-semibold">{job.applications}</td>
                    <td className="py-3 px-5">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          job.status === 'Active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="py-3 px-5 flex justify-end items-center gap-3">
                      <img
                        src="/svg/blue-eye.svg"
                        alt="view"
                        className="w-4 h-4 cursor-pointer hover:opacity-80"
                      />
                      <img
                        src="/svg/pencil.svg"
                        alt="edit"
                        className="w-4 h-4 cursor-pointer hover:opacity-80"
                      />
                      <img
                        src="/svg/admin/red-delete.svg"
                        alt="delete"
                        className="w-4 h-4 cursor-pointer hover:opacity-80"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center px-5 py-4 text-sm text-gray-600">
            <p>Showing 1 to 12 of 12 jobs</p>
            <div className="flex gap-2">
              <button className="border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-100">
                Previous
              </button>
              <button className="border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-100">
                Next
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
