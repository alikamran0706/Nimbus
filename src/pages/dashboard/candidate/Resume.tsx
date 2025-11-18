import type React from 'react'

import { Link } from 'react-router-dom'
import { useState } from 'react'

export function Resume() {
  const [formData, setFormData] = useState({
    referenceNo: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    contactNo: '',
    nationality: '',
    experience: '',
    industry: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <div className="flex flex-col w-full">
      {/* Main Content */}
      <div className="flex-1">
        <div className="pt-4">
          <div className="bg-white border-b border-gray-100 p-4 rounded-t-lg">
            <Link
              to="/applications"
              className="inline-flex items-center gap-2 text-primary-500 hover:text-red-500 text-sm sm:text-base"
            >
              <img src={'/svg/back-arrow.svg'} alt="icon" />
              Back to Dashboard
            </Link>
          </div>

          <div className="bg-white shadow-sm p-6 rounded-b-lg">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4 sm:gap-0">
              <div>
                <h1 className="text-lg sm:text-semixl font-semibold text-gray-900 mb-1">Resume</h1>
                <p className="text-gray-600 text-xsplus">Update your resume to improve job matches</p>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <button className="text-sm w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
                  <img src={'/svg/preview.svg'} alt="icon" /> Preview
                </button>
                <button className="text-sm w-full sm:w-auto px-3 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 flex items-center justify-center gap-2">
                  <img src={'/svg/upload.svg'} alt="icon" /> Upload New
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Input Fields */}
              {[
                { name: 'referenceNo', label: 'Reference No', type: 'text', placeholder: 'Enter reference number' },
                { name: 'firstName', label: 'First Name', type: 'text', placeholder: 'Enter first name' },
                { name: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Enter last name' },
                { name: 'dateOfBirth', label: 'Date Of Birth', type: 'date', placeholder: 'mm/dd/yyyy' },
                { name: 'email', label: 'Email Address', type: 'email', placeholder: 'Enter email address' },
                { name: 'contactNo', label: 'Contact No', type: 'tel', placeholder: 'Enter contact number' },
              ].map(field => (
                <div key={field.name} className="border border-gray-150 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">{field.label}</label>
                    <img src={'/svg/pencil.svg'} alt="icon" />
                  </div>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[0.5px] focus:ring-gray-100"
                  />
                </div>
              ))}

              {/* Select Fields */}
              {[
                {
                  name: 'nationality',
                  label: 'Nationality',
                  options: [
                    { value: '', label: 'Select nationality' },
                    { value: 'us', label: 'United States' },
                    { value: 'uk', label: 'United Kingdom' },
                    { value: 'ca', label: 'Canada' },
                    { value: 'au', label: 'Australia' },
                  ],
                },
                {
                  name: 'experience',
                  label: 'Minimum Experience',
                  options: [
                    { value: '', label: 'Select experience' },
                    { value: '0-1', label: '0-1 years' },
                    { value: '1-3', label: '1-3 years' },
                    { value: '3-5', label: '3-5 years' },
                    { value: '5+', label: '5+ years' },
                  ],
                },
                {
                  name: 'industry',
                  label: 'Industry',
                  options: [
                    { value: '', label: 'Select industry' },
                    { value: 'tech', label: 'Technology' },
                    { value: 'finance', label: 'Finance' },
                    { value: 'healthcare', label: 'Healthcare' },
                    { value: 'hospitality', label: 'Hospitality' },
                  ],
                },
              ].map(select => (
                <div key={select.name} className="border border-gray-200/70 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">{select.label}</label>
                    <img src="/images/pencil.png" alt="Edit" className="h-4 w-4" />
                  </div>
                  <select
                    name={select.name}
                    value={formData[select.name as keyof typeof formData]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[0.5px] focus:ring-gray-100"
                  >
                    {select.options.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="text-sm px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 w-full sm:w-auto"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  )
}
