import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/Checkbox'
import { useNavigate } from 'react-router-dom'

export default function CreateJobPosting() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: '',
    industry: '',
    department: '',
    location: '',
    experience: '',
    jobType: '',
    contract: '',
    salary: '',
    joiningDate: '',
    expiryDate: '',
    description: '',
    responsibilities: '',
    requirements: '',
    skills: '',
    internalNotes: '',
    boards: {
      website: true,
      linkedin: true,
      indeed: false,
      glassdoor: false,
    },
    channels: {
      email: true,
      whatsapp: true,
    },
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckbox = (category: string, key: string, value: boolean) => {
    setFormData((prev: any) => ({
      ...prev,
      [category]: { ...prev[category], [key]: value },
    }))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log('Form Submitted:', formData)
  }

  return (
    <div className="max-w-full md:max-w-screen-lg mx-4 lg:mx-auto bg-white rounded-lg border border-gray-150 shadow-sm font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6 border-b border-gray-150 p-4">
        {/* Back Button */}
        <button
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium w-full sm:w-auto"
          onClick={() => window.history.back()}
        >
          <img src="/svg/gray-back-arrow.svg" alt="back" className="w-5 h-5" />
          Create Job Posting
        </button>

        {/* Button Group */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button
            label="AI Job Posting"
            variant="white"
            onClick={() => navigate('/recruiter/create-ai-job')}
            fullWidth
            className="whitespace-nowrap"
          />
          <Button label="Save as Draft" variant="white" fullWidth className="whitespace-nowrap" />
          <Button label="Publish Job" variant="primary" fullWidth className="whitespace-nowrap" />
        </div>
      </div>

      <div className="p-4">
        {/* Job Details */}
        <h2 className="font-semibold text-gray-900 text-base">Job Details</h2>
        <p className="text-xsplus text-gray-600 mb-4">
          This information will be displayed publicly so be careful what you share.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 1st Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xsplus font-medium text-gray-900 mb-1 block">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                name="title"
                placeholder="E.g. Senior React Developer"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xsplus focus:outline-none focus:ring-2 focus:ring-primary-600"
              />
            </div>
            <div>
              <label className="text-xsplus font-medium text-gray-900 mb-1 block">
                Industry <span className="text-red-500">*</span>
              </label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xsplus focus:outline-none focus:ring-2 focus:ring-primary-600"
              >
                <option value="">Select Industry</option>
                <option value="it">Information Technology</option>
                <option value="shipping">Shipping</option>
                <option value="hospitality">Hospitality</option>
              </select>
            </div>
          </div>

          {/* 2nd Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xsplus font-medium text-gray-900 mb-1 block">
                Category/Department <span className="text-red-500">*</span>
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xsplus focus:outline-none focus:ring-2 focus:ring-primary-600"
              >
                <option value="">Select Department</option>
                <option value="engineering">Engineering</option>
                <option value="management">Management</option>
              </select>
            </div>
            <div>
              <label className="text-xsplus font-medium text-gray-900 mb-1 block">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                name="location"
                placeholder="E.g. Remote, New York"
                value={formData.location}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xsplus focus:outline-none focus:ring-2 focus:ring-primary-600"
              />
            </div>
          </div>

          {/* 3rd Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xsplus font-medium text-gray-900 mb-1">
                Experience Required
              </label>
              <input
                name="experience"
                placeholder="E.g. 3-5 years"
                value={formData.experience}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2 text-xsplus 
                focus:outline-none focus:ring-2 focus:ring-primary-600 w-full"
              />
            </div>
            <div>
              <label className="block text-xsplus font-medium text-gray-900 mb-1">Job Type</label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xsplus focus:outline-none focus:ring-2 focus:ring-primary-600"
              >
                <option value="">Select Job Type</option>
                <option value="full">Full-Time</option>
                <option value="part">Part-Time</option>
                <option value="contract">Contract</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xsplus font-medium text-gray-900 mb-1">
                Contract Duration
              </label>
              <input
                name="experience"
                placeholder="E.g. 6 months"
                value={formData.experience}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2 text-xsplus 
                focus:outline-none focus:ring-2 focus:ring-primary-600 w-full"
              />
            </div>
            <div>
              <label className="block text-xsplus font-medium text-gray-900 mb-1">
                Salary Range
              </label>
              <input
                name="salary"
                placeholder="E.g. $80,000 - $120,000"
                value={formData.salary}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xsplus focus:outline-none focus:ring-2 focus:ring-primary-600"
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xsplus font-medium text-gray-900 mb-1">
                Joining Date
              </label>
              <input
                type="date"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xsplus focus:outline-none focus:ring-2 focus:ring-primary-600"
              />
            </div>
            <div>
              <label className="block text-xsplus font-medium text-gray-900 mb-1">
                Expiry Date
              </label>
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xsplus focus:outline-none focus:ring-2 focus:ring-primary-600"
              />
              <p className="text-xsmall text-gray-600 mt-1">
                Job will be automatically archived after this date
              </p>
            </div>
          </div>

          {/* Job Image */}
          <div className="mb-2">
            <h3 className="font-medium text-gray-900 text-xsplus mb-2">Job Image</h3>
            <div className="border border-dashed border-gray-300 rounded-lg py-10 flex flex-col items-center justify-center text-gray-650 text-xsplus">
              <img src="/svg/gray-file-upload.svg" alt="upload" className="w-8 h-8 mb-3" />
              <p className="text-xsplus">Click to upload or drag and drop</p>
              <p className="text-xsmall mt-1 text-gray-600">PNG, JPG or JPEG (1 max, 1MB)</p>
            </div>
          </div>

          {/* Voice Note Section */}
          <div className="mt-6">
            <div className="flex gap-2 items-center mb-2">
              <h3 className="font-medium text-gray-900 text-xsplus">Voice Note with AI</h3>
              <p className="py-[2px] px-2 bg-gray-100 text-xsmall">AI</p>
            </div>
            <button
              type="button"
              className="flex items-center justify-center w-full py-4 border border-gray-300 rounded-lg text-gray-600 text-xsplus hover:bg-gray-100 transition"
            >
              <img src="/svg/black-mic.svg" alt="mic" className="w-5 h-5 mr-2" />
              Tap to record voice note
            </button>
            <p className="text-xsmall text-gray-600 mt-2">
              Record a voice note to automatically generate job description
            </p>
          </div>

          {/* Textareas */}
          <div>
            <label className="text-xsplus font-medium text-gray-900 mb-1 block">
              Job Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              rows={4}
              placeholder="Enter a detailed description of the job..."
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xsplus focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
          </div>

          <div>
            <label className="text-xsplus font-medium text-gray-900 mb-1 block">
              Key Responsibilities
            </label>
            <textarea
              name="responsibilities"
              rows={3}
              placeholder="List the key responsibilities for this job..."
              value={formData.responsibilities}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xsplus focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
          </div>

          <div>
            <label className="text-xsplus font-medium text-gray-900 mb-1 block">Requirements</label>
            <textarea
              name="requirements"
              rows={3}
              placeholder="List the requirements for this role..."
              value={formData.requirements}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xsplus focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
          </div>

          <div>
            <label className="text-xsplus font-medium text-gray-900 mb-1 block">
              Skills (comma separated)
            </label>
            <input
              name="skills"
              placeholder="E.g. React, TypeScript, Node.js"
              value={formData.skills}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xsplus focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
          </div>

          {/* Publishing Options */}
          <div>
            <h3 className="font-medium text-gray-900 text-xsplus">Publishing Options</h3>
            <p className="text-xsmall text-gray-600 mb-2">
              Choose where to publish your job posting and how to communicate with candidates.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Job Boards */}
              <div>
                <p className="font-medium text-xsplus text-gray-900 mb-2">Job Boards</p>
                {Object.entries(formData.boards).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2 mb-2">
                    <Checkbox
                      checked={value}
                      onCheckedChange={(checked: boolean) => handleCheckbox('boards', key, checked)}
                    />
                    <label className="text-xsplus text-gray-700 capitalize">{key}</label>
                  </div>
                ))}
              </div>

              {/* Communication Channels */}
              <div>
                <p className="font-medium text-xsplus text-gray-900 mb-2">Communication Channels</p>
                {Object.entries(formData.channels).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2 mb-2">
                    <Checkbox
                      checked={value}
                      onCheckedChange={(checked: boolean) =>
                        handleCheckbox('channels', key, checked)
                      }
                    />
                    <label className="text-xsplus text-gray-700 capitalize">{key}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Internal Notes */}
          <div>
            <label className="text-xsplus font-medium text-gray-900 block">Internal Notes</label>
            <p className="text-xsmall text-gray-600 mb-2">
              These notes will only be visible to recruiters, not to candidates.
            </p>
            <textarea
              name="internalNotes"
              rows={3}
              placeholder="Add any internal notes here..."
              value={formData.internalNotes}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xsplus focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 border-t border-gray-150 pt-4">
            <Button label="Cancel" variant="white" />
            <Button label="Save as Draft" variant="white" />
            <Button label="Publish Job" variant="primary" />
          </div>
        </form>
      </div>
    </div>
  )
}
