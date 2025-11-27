import { jobService } from '@/services/jobService'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const stats = [
  {
    label: 'Open Roles',
    value: '12',
    icon: '📋',
    color: 'bg-green-50',
    textColor: 'text-green-600',
    image: '/svg/green-tick.svg',
  },
  {
    label: 'Total Applicants',
    value: '184',
    icon: '👥',
    color: 'bg-blue-50',
    textColor: 'text-blue-600',
  },
  {
    label: 'Interviews Scheduled',
    value: '23',
    color: 'bg-yellow-50',
    textColor: 'text-yellow-300',
    icon: '$',
  },
]

export default function RecruiterJobPostings() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<any>([]);
  const [filters, setFilters] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    phone: '',
  })

  const navigate = useNavigate();

  const onBack = () => {
    navigate(-1);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  const fetchJobs = async () => {
    setLoading(true)
    try {
      const { data } = await jobService.get()
      setJobs(data);
      console.log('sssssssddddddddddssss', data, 'sdsd')
      return data;
    } catch (error: any) {
      console.log(error, 'ffffffffffffffffffffffffffff')
    }
  }

  useEffect(() => {
    fetchJobs();
  }, [filters])

  return (
    <div className="px-8 pb-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <button className="flex items-center gap-x-1" onClick={onBack}>
            <img src="/svg/gray-back-arrow.svg" alt="job" className="w-5 h-5 object-contain" />
            <h2 className="text-lg font-bold text-gray-900">Active Job Postings</h2>
          </button>
          <p className="text-gray-600 text-sm ml-6">
            Browse and filter all currently active job positions
          </p>
        </div>
        <Link
          to="/recruiter/create-job"
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-center w-full sm:w-auto"
        >
          + New Job Posting
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map(stat => (
          <div
            key={stat.label}
            className={`bg-white rounded-lg border border-gray-200 overflow-hidden`}
          >
            <div className="flex items-start gap-x-2 p-6 justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                <p className="text-sm font-bold text-gray-900">{stat.value}</p>
              </div>
              <div
                className={`w-10 h-10 ${stat.color} flex items-center justify-center rounded-full`}
              >
                {stat.image ? <img src={stat.image} alt="icon" /> : stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 sm:px-6 py-4 bg-white rounded-md border border-gray-150 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <button className="text-sm text-gray-900 flex items-center gap-2">
            <img src={'/svg/gray-filter.svg'} className="w-4 h-4" alt="icon" />
            Filter jobs
          </button>
          <button className="text-sm text-primary-500 hover:text-red-700">Clear all filters</button>
        </div>

        {/* Filter Form */}

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="text-800 text-xsplus">Salary Range</label>
            <div className="flex gap-2 items-center">
              <input
                type={'number'}
                name={'min'}
                placeholder={'Min'}
                // value={filters[name]}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <p className="text-gray-500 text-sm">to</p>
              <input
                type={'number'}
                name={'min'}
                placeholder={'Max'}
                // value={filters[name]}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
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
          <div>
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

      {/* Active Job Postings */}
      <div className="mb-8">
        <div className="font-sans">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 mt-8">
            <h2 className="text-lg font-semibold text-gray-900">5 Active Jobs Posted</h2>

            <div className="flex gap-3 text-sm text-gray-600">
              <button className="hover:text-primary-600 font-medium">Sort by:</button>
              <button className="hover:text-primary-600 font-medium">Most Recent</button>
            </div>
          </div>

          {/* Job List */}
          <div className="space-y-3">
            {jobs.map((job: any) => (
              <div
                key={job.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border border-gray-150 bg-white rounded-md p-4"
              >
                {/* Left Section */}
                <div className="flex items-start gap-3 flex-1">
                  {/* Job Icon */}
                  <div className="w-10 h-10 bg-primary-50 rounded-md flex items-center justify-center">
                    <img src="/svg/red-job.svg" alt="job" className="w-5 h-5 object-contain" />
                  </div>

                  {/* Job Info */}
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 leading-tight">
                      {job.title}
                    </h3>
                    <p className="text-xs text-gray-600">{job.company}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                      <img src="/svg/gray-location.svg" alt="location" className="w-3 h-3" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                      <img src="/svg/gray-dollar.svg" alt="salary" className="w-3 h-3" />
                      <span>{job.salaryRange?.min} / {job.salaryRange?.max}</span>
                    </div>

                    <div className="flex flex-col sm:hidden items-start">
                      <p className="text-xs text-gray-600 mb-1">{job.posted}</p>
                      <p className="text-sm text-gray-900 font-medium">{job.applicants} Applicants</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div
                          className={`h-2 w-2 rounded-full ${job.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
                            }`}
                        ></div>
                        <p
                          className={`text-xs font-medium ${job.status === 'Active' ? 'text-green-600' : 'text-red-600'
                            }`}
                        >
                          {job.status}
                        </p>
                      </div>
                      <Link to='/recruiter/candidate' className="flex gap-2 items-center">
                        <p className="text-primary-600 text-sm font-medium">View details</p>
                        <img src="/svg/red-arrow-down.svg" alt="location" className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Right Section */}
                <div className="flex-col hidden sm:block items-end sm:text-right">
                  <p className="text-xs text-gray-600 mb-1">{job.posted}</p>
                  <p className="text-sm text-gray-900 font-medium">{job.applicants} Applicants</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div
                      className={`h-2 w-2 rounded-full ${job.status === 'published' ? 'bg-green-500' : 'bg-red-500'
                        }`}
                    ></div>
                    <p
                      className={`text-xs font-medium ${job.status === 'published' ? 'text-green-600' : 'text-red-600 capitalize'
                        }`}
                    >
                      {job.status}
                    </p>
                  </div>
                  <Link to='/recruiter/candidate' className="flex gap-2 items-center">
                    <p className="text-primary-600 text-sm font-medium">View details</p>
                    <img src="/svg/red-arrow-down.svg" alt="location" className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
