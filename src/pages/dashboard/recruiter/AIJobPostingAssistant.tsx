import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface Message {
  sender: 'ai' | 'user'
  text: string
}

interface JobFormData {
  jobTitle: string
  companyName: string
  location: string
  jobType: string
  salaryRange: string
  description: string
  requirements: string[]
  benefits: string[]
}

export default function AIJobPostingAssistant() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: `Hello! I’m your AI Job Posting Assistant. Let’s create a great job posting together. What position are you hiring for?`,
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState<JobFormData>({
    jobTitle: 'Data Entry Accuracy',
    companyName: 'Tech Innovations Inc.',
    location: 'USA',
    jobType: 'Full-time',
    salaryRange: '$100k-150k',
    description:
      'Detect, interpret and efficiently code a specialty with a proven track record of accurately entering, updating and managing large volumes of data.',
    requirements: ['Data Entry', 'International Trade Practices'],
    benefits: ['Health Insurance', 'Easy work', '401k'],
  })

  // --- Chat Simulation ---
  const handleSend = () => {
    if (!input.trim()) return
    const userMsg: Message = { sender: 'user', text: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsLoading(true)

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(input)
      setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }])
      setIsLoading(false)
    }, 1000)
  }

  const generateAIResponse = (input: string) => {
    const lower = input.toLowerCase()
    if (lower.includes('salary'))
      return 'Got it! What’s the expected salary range for this position?'
    if (lower.includes('data')) return 'What are the key skills required for this role?'
    if (lower.includes('skills')) return 'Tell me a bit about your company culture.'
    if (lower.includes('culture'))
      return 'Is there anything else you’d like to add to the job posting?'
    if (lower.includes('no'))
      return 'Perfect! I’ve prepared your job posting based on our conversation. Click below to view and edit.'
    return 'Thanks! Could you share a few more details about this role?'
  }

  // --- Handlers for form ---
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAddRequirement = () => {
    setFormData(prev => ({ ...prev, requirements: [...prev.requirements, ''] }))
  }

  const handleRemoveRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }))
  }

  const handleRequirementChange = (index: number, value: string) => {
    setFormData(prev => {
      const newRequirements = [...prev.requirements]
      newRequirements[index] = value
      return { ...prev, requirements: newRequirements }
    })
  }

  const handleAddBenefit = () => {
    setFormData(prev => ({ ...prev, benefits: [...prev.benefits, ''] }))
  }

  const handleRemoveBenefit = (index: number) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index),
    }))
  }

  const handleBenefitChange = (index: number, value: string) => {
    setFormData(prev => {
      const newBenefits = [...prev.benefits]
      newBenefits[index] = value
      return { ...prev, benefits: newBenefits }
    })
  }

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleContinueToForm = () => {
    navigate('/recruiter/jobs')
  }

  // --- UI ---
  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-8 w-full md:max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-gray-900">AI Job Posting Assistant</h1>
        <p className="text-gray-600 mt-1 text-sm">Create better job postings with AI assistance</p>
      </div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          {[1, 2, 3, 4, 5].map(step => (
            <div key={step} className="flex flex-col items-center flex-1">
              <div className="flex items-center w-full">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                    step <= currentStep ? 'bg-red-600 text-white' : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {step}
                </div>
                {step < 5 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      step < currentStep ? 'bg-red-600' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Labels */}
        <div className="flex justify-between text-xs text-gray-600">
          {['Chat', 'Summary', 'Edit', 'Review', 'Publish'].map((label, index) => (
            <div key={index} className="flex-1 text-start">
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Chat */}
      {currentStep === 1 && (
        <div className="bg-white rounded-lg shadow p-8 flex flex-col justify-between">
          <div className="space-y-4 pr-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`px-4 py-2 rounded-lg max-w-[70%] text-sm ${
                    msg.sender === 'ai' ? 'bg-gray-100 text-gray-800' : 'bg-red-600 text-white'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="px-4 py-2 rounded-lg bg-gray-100 text-gray-500 text-sm italic">
                  AI is typing...
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center gap-3">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your response..."
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-600"
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium"
            >
              Send
            </button>
          </div>

          <div className="flex justify-end mt-8">
            <button
              onClick={handleNext}
              className="truncate w-full sm:w-auto px-6 py-2 bg-red-600 hover:bg-red-700 text-white 
                rounded-lg font-medium transition-colors flex gap-2 items-center text-sm justify-center"
            >
              Next and Continue{' '}
              <img
                src={'/svg/white-forward-arrow.svg'}
                height={18}
                width={18}
                className="w-4 h-4"
                alt="icon"
              />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Review (was Step 3 previously) */}
      {currentStep === 2 && (
        <div>
          <div className="text-center bg-green-50 border border-green-100 rounded-tr-lg rounded-tl-lg py-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
              <img src="/svg/circle-green-tick.svg" alt="upload" className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Job Information Collected</h2>
            <p className="text-gray-600 mt-2">
              We've gathered the following information for your job posting. Continue to edit
              fine-tune the details.
            </p>
          </div>

          <div className="bg-white rounded-br-lg rounded-bl-lg mb-8 border-b border-l border-r border-gray-150">
            <div className="py-6 px-6 lg:px-20 space-y-6">
              <div className="border border-gray-150 bg-gray-40 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-600 mb-1">Job Title</h3>
                <p className="text-lg font-semibold text-gray-900">{formData.jobTitle}</p>
              </div>

              <div className="border border-gray-150 bg-gray-40 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-600 mb-1">Company</h3>
                <p className="text-lg font-semibold text-gray-900">{formData.companyName}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-150 bg-gray-40 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-600 mb-1">Location</h3>
                  <p className="text-lg font-semibold text-gray-900">{formData.location}</p>
                </div>
                <div className="border border-gray-150 bg-gray-40 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-600 mb-1">Type</h3>
                  <p className="text-lg font-semibold text-gray-900">{formData.jobType}</p>
                </div>
                <div className="border border-gray-150 bg-gray-40 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-600 mb-1">Salary</h3>
                  <p className="text-lg font-semibold text-gray-900">{formData.salaryRange}</p>
                </div>
              </div>

              <div className="border border-gray-150 bg-gray-40 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Description</h3>
                <p className="text-gray-700">{formData.description}</p>
              </div>

              <div className="border border-gray-150 bg-gray-40 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Requirements</h3>
                <ul className="list-disc list-inside space-y-1">
                  {formData.requirements.map((req, index) => (
                    <li key={index} className="text-gray-700">
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-gray-150 bg-gray-40 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Benefits</h3>
                <ul className="list-disc list-inside space-y-1">
                  {formData.benefits.map((benefit, index) => (
                    <li key={index} className="text-gray-700">
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-start sm:items-center justify-between p-4 border-t border-gray-150">
              <button
                onClick={() => setCurrentStep(1)}
                className="text-gray-900 font-normal truncate flex gap-x-2 text-sm"
              >
                <img src={'/svg/gray-back-arrow.svg'} alt="icon" /> Back to Chat
              </button>
              <button
                onClick={handleNext}
                className="text-sm truncate px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                Next and Continue <img src={'/svg/white-forward-arrow.svg'} alt="icon" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Edit (was Step 1 previously) */}
      {currentStep === 3 && (
        <div className="bg-white rounded-lg shadow p-8">
          <div className="relative flex items-center justify-center mb-6">
            {/* Centered title */}
            <h2 className="text-lg font-bold text-gray-900">Edit Job Details</h2>

            {/* Left-aligned back button */}
            <button
              onClick={() => setCurrentStep(0)}
              className="absolute left-0 text-red-600 hover:text-red-700 text-sm font-medium flex gap-2 items-center"
            >
              <img src="/svg/back-arrow.svg" alt="icon" className="w-4 h-4" />
              Back to Summary
            </button>
          </div>

          <div className="space-y-6">
            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Job Title</label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>

            {/* Location, Job Type, Salary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Job Type</label>
                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Temporary</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Salary Range</label>
                <input
                  type="text"
                  name="salaryRange"
                  value={formData.salaryRange}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
              </div>
            </div>

            {/* Job Description */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Job Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>

            {/* Requirements */}
            <div>
              <div className="flex flex-wrap items-start sm:items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-900">Requirements</label>
                <button
                  onClick={handleAddRequirement}
                  className="text-red-600 hover:text-red-700 text-sm font-medium truncate"
                >
                  + Add Requirement
                </button>
              </div>
              <div className="space-y-2">
                {formData.requirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-2 w-full">
                    <input
                      type="text"
                      value={req}
                      onChange={e => handleRequirementChange(index, e.target.value)}
                      placeholder="Enter requirement"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    />
                    <button
                      onClick={() => handleRemoveRequirement(index)}
                      className="text-red-600 hover:text-red-700 font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div>
              <div className="flex flex-wrap items-start sm:items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-900">Benefits</label>
                <button
                  onClick={handleAddBenefit}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  + Add Benefit
                </button>
              </div>
              <div className="space-y-2">
                {formData.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={benefit}
                      onChange={e => handleBenefitChange(index, e.target.value)}
                      placeholder="Enter benefit"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    />
                    <button
                      onClick={() => handleRemoveBenefit(index)}
                      className="text-red-600 hover:text-red-700 font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => navigate('/recruiter/jobs')}
              className="w-full sm:w-auto px-6 py-2 border border-gray-300 rounded-lg text-gray-700 
              font-medium hover:bg-gray-50 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleNext}
              className="truncate w-full sm:w-auto px-6 py-2 bg-red-600 hover:bg-red-700 text-white 
                rounded-lg font-medium transition-colors flex gap-2 items-center text-sm justify-center"
            >
              <img
                src={'/svg/white-save.svg'}
                height={18}
                width={18}
                className="w-4 h-4"
                alt="icon"
              />
              Save and Continue{' '}
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Review Job Posting */}
      {currentStep === 4 && (
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Job Posting</h2>
          <p className="text-gray-600 mb-8">Here's how your job post will appear to candidates.</p>
          <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{formData.jobTitle}</h3>
            <p className="text-sm text-gray-600 mb-4">{formData.companyName}</p>
            <p className="text-gray-700 mb-2">{formData.description}</p>
          </div>

          <div className="flex justify-between mt-8 border-t pt-4">
            <button onClick={handleBack} className="text-gray-700 flex items-center gap-2">
              <img src="/svg/gray-back-arrow.svg" className="w-4 h-4" alt="icon" /> Back
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
            >
              Continue <img src="/svg/white-forward-arrow.svg" className="w-4 h-4" alt="icon" />
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Publish */}
      {currentStep === 5 && (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Publish Job Posting</h2>
          <p className="text-gray-600 mb-6">
            Your job posting is ready. Click below to publish it.
          </p>
          <button
            onClick={() => navigate('/recruiter/jobs')}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium"
          >
            Publish Job
          </button>
        </div>
      )}
    </div>
  )
}
