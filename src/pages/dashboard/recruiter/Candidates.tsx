import type React from 'react'

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function RecruiterCandidates() {
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([])
  const [candidates, setCandidates] = useState<any>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    phone: '',
  })

  const fetchCandidates = async () => {
    try {
      const res = await fetch(`${process.env.BACKEND_BASE_API}/api/candidates`)
      const json = await res.json()
      setCandidates(json.data)
    } catch (error) {
      console.error('Error fetching candidates:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCandidates()
  }, [])

  const getAIMatchColor = (score: number) => {
    if (score >= 75) return 'bg-green-100 text-green-700'
    if (score >= 60) return 'bg-yellow-100 text-yellow-700'
    return 'bg-red-100 text-red-700'
  }

  const getAIMatchBgColor = (score: number) => {
    if (score >= 75) return 'bg-green-500'
    if (score >= 60) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'Website':
        return '/svg/gray-globe.svg' // Example: blue color for LinkedIn
      case 'LinkedIn':
        return '/svg/blue-linkedin.svg' // Example: gray color for GitHub
      case 'Email':
        return '/svg/red-mail.svg' // Example: blue color for Twitter
      default:
        return '/svg/gray-globe.svg' // Default color for unknown source
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Saved':
        return 'bg-blue-100 text-blue-800'
      case 'Shortlisted':
        return 'bg-green-100 text-green-800'
      case 'Rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const toggleCandidate = (id: number) => {
    setSelectedCandidates(prev => (prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]))
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-8 max-w-screen-xl mx-auto">
      {/* Back Button */}
      <div className="flex items-center gap-2 mb-6">
        <button className="text-gray-600 hover:text-gray-900">
          <img src={'/svg/gray-back-arrow.svg'} alt="icon" />
        </button>
        <span className="text-base text-gray-700 font-medium">Candidate Sourcing</span>
      </div>

      {/* Import Candidates Section */}
      <div className="mb-8 bg-white border border-gray-150 p-4 rounded-lg">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Import Candidates</h3>
        <div className="overflow-x-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 min-w-[300px]">
            {[
              {
                label: 'Import from LinkedIn',
                emoji: '📱',
                bg: 'bg-blue-100',
                text: 'text-blue-600',
                image: '/svg/blue-linkedin.svg',
              },
              {
                label: 'Import from Gmail',
                emoji: '📧',
                bg: 'bg-red-100',
                text: 'text-red-600',
                image: '/svg/red-mail.svg',
              },
              {
                label: 'Import from Whatsapp',
                emoji: '🌱',
                bg: 'bg-green-100',
                text: 'text-green-600',
                image: '/svg/green-whatsapp.svg',
              },
              {
                label: 'Upload CSV/Resume',
                emoji: '📄',
                bg: 'bg-gray-100',
                text: 'text-gray-600',
                image: '/svg/black-file-upload.svg',
              },
            ].map(({ label, bg, image }) => (
              <div
                key={label}
                className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md cursor-pointer transition"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center`}>
                    {/* <span className={`${text}`}>{emoji}</span> */}
                    <img src={image} alt="icon" />
                  </div>
                  <span className="text-sm text-gray-600">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Candidates Section */}
      <div className="bg-white rounded-lg border border-gray-150">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Candidates ({candidates.length})
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              <button className="text-sm text-gray-900 border border-gray-150 p-2 rounded-lg flex items-center gap-2">
                <img src={'/svg/gray-filter.svg'} alt="icon" />
                Filter
              </button>
              <button className="text-sm rounded-lg bg-primary-100 p-2 text-primary-600 hover:text-red-700 flex items-center gap-2">
                <img src={'/svg/red-tuning.svg'} alt="icon" className="w-4 h-4" />
                Rules
              </button>
              <button className="text-sm rounded-lg bg-primary-100 p-2 text-primary-600 hover:text-red-700">
                Set Workflow
              </button>
            </div>
          </div>

          {/* Filter Form */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {[
              {
                name: 'refrenceNumber',
                placeholder: 'Enter reference number',
                type: 'text',
                label: 'Reference no',
              },
              { name: 'firstName', placeholder: 'First Name', type: 'text', label: 'First Name' },
              { name: 'lastName', placeholder: 'Last Name', type: 'text', label: 'Last Name' },
              {
                name: 'dateOfBirth',
                placeholder: 'mm/dd/yyyy',
                type: 'date',
                label: 'Reference no',
              },
            ].map(({ name, placeholder, type, label }) => (
              <div>
                <label className="text-sm text-gray-900">{label}</label>
                <input
                  key={name}
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  // value={filters[name]}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {[
              {
                name: 'email',
                placeholder: 'Email Address',
                type: 'email',
                label: 'Email Address',
              },
              { name: 'phone', placeholder: 'Phone Number', type: 'tel', label: 'Phone Number' },
              {
                name: 'lastName',
                placeholder: 'Last Name',
                type: 'select',
                label: 'Email Address',
                options: [
                  { value: '', label: 'Select nationality' },
                  { value: 'pk', label: 'Pakistan' },
                  { value: 'us', label: 'United States' },
                  { value: 'uk', label: 'United Kingdom' },
                ],
              },
              {
                name: 'lastName',
                placeholder: 'Minimum Experience (no of months)',
                type: 'text',
                label: 'Enter months',
              },
            ].map(({ name, placeholder, type, label, options = [] }) =>
              type === 'select' ? (
                <div>
                  <label className="text-sm text-gray-900">Nationality</label>
                  <select
                    name={name}
                    // value={formData[select.name as keyof typeof formData]}
                    // onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[0.5px] focus:ring-gray-100"
                  >
                    {options.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div>
                  <label className="text-sm text-gray-900">{label}</label>
                  <input
                    key={name}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    // value={filters[name]}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              )
            )}
          </div>
          <div className="flex justify-end">
            <button className="sm:w-auto px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition">
              Apply Filters
            </button>
          </div>
        </div>
        <div className="bg-[#EFF6FF] p-2 m-4 flex items-center gap-2 border border-[#BFDBFE] rounded-lg">
          <span
            className={`inline-flex items-center justify-center w-5 h-5 ms-2 text-xs 
            font-semibold text-blue-800  rounded-full bg-[#DBEAFE]`}
          >
            i
          </span>
          <p className="text-[#1D4ED8]">
            AI-powered shortlisting is active. Candidates with match scores above 80 are recommended
            for shortlisting.
          </p>
        </div>
        {/* Candidates Table */}
        {loading ? (
          <div className="p-6 text-center">Loading candidates...</div>
        ) : (
          <div className="overflow-x-auto px-4">
            <table className="w-full min-w-[800px]">
              <thead className=" border-b border-gray-150">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input type="checkbox" className="rounded" />
                  </th>
                  {['Name', 'Role', 'Skills', 'AI Match', 'Source', 'Status', 'Actions'].map(
                    header => (
                      <th
                        key={header}
                        className={`px-6 py-3 text-left text-sm font-semibold text-gray-900 ${
                          header === 'AI Match'
                            ? 'w-[170px]'
                            : header === 'Skills'
                            ? 'w-[220px]'
                            : ''
                        }`}
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-150">
                {candidates.map((candidate: any, index: number) => (
                  <tr key={candidate.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedCandidates.includes(candidate.id)}
                        onChange={() => toggleCandidate(candidate.id)}
                        className="rounded"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {candidate.name}
                      </div>
                      <div className="text-xs text-gray-600 truncate">{candidate.email}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {candidate.role}
                      </div>
                      <div className="text-xs text-gray-600">{index + 1} years</div>
                      <div className="text-xs text-gray-600 truncate">
                        {candidate.roleDescription}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {candidate.skills.map((skill: any, idx: number) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xsmall"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {/* Percentage Text */}
                      <div className="flex items-center space-x-1">
                        <button
                          type="button"
                          className="inline-flex items-center rounded-lg cursor-pointer-none"
                        >
                          <span
                            className={`inline-flex items-center justify-center w-7 h-7 ms-2 text-xs 
                            font-semibold text-blue-800 ${getAIMatchColor(
                              candidate.aiMatch
                            )} rounded-full`}
                          >
                            {candidate.aiMatch}
                          </span>
                        </button>
                        <div className="w-full">
                          {/* Progress Bar Container */}
                          <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                            {/* Progress Bar (Filled part with AI match color) */}
                            <div
                              className={`${getAIMatchBgColor(
                                candidate.aiMatch
                              )} h-1.5 rounded-full`}
                              style={{ width: `${candidate.aiMatch}%` }}
                            ></div>
                          </div>
                          <p className="text-[7px] text-gray-600">AI Match Score</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="flex w-[60px] gap-x-2">
                        <img
                          src={getSourceIcon(candidate.source)}
                          height={15}
                          width={15}
                          alt="icon"
                        />
                        <p className="text-xs">{candidate.source}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-1 py-1 rounded-md text-xsmall font-semibold ${getStatusColor(
                          candidate.status
                        )}`}
                      >
                        {candidate.status}
                      </span>
                    </td>
                    <td className="px-2 py-4">
                      <div className="flex items-center gap-1">
                        <img src={'/svg/green-tick.svg'} alt="icon" />
                        <img src={'/svg/red-cross.svg'} alt="icon" />
                        <Link
                          to={'/recruiter/candidate'}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          View
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Bulk Actions */}
        <div className="px-4 sm:px-6 py-4 m-4 rounded-lg bg-gray-50 border border-gray-150 flex flex-col sm:flex-row sm:justify-between gap-4 sm:items-center">
          <span className="text-sm text-gray-600">
            {selectedCandidates.length} candidates selected
          </span>
          <div className="flex flex-wrap gap-2">
            <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition">
              <img src={'/svg/white-tick.svg'} alt="icon" className="mr-1" />
              <p>Shortlist Selected</p>
            </button>

            <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
              <img src={'/svg/gray-cross-text.svg'} alt="icon" className="mr-1" />
              Reject Selected
            </button>

            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
              More Actions
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
