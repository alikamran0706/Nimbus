import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/Checkbox'
import { useLocation, useNavigate } from 'react-router-dom'
import { TagField } from '@/components/ui/TagField'
import { jobService } from '@/services/jobService'
import { decrypt } from '@/lib/utils/crypto'
import { createFormData } from '@/lib/utils'
import imageCompression from 'browser-image-compression'

type Channels = {
  email: boolean
  whatsapp: boolean
}

type Boards = {
  website: boolean
  linkedin: boolean
  indeed: boolean
  glassdoor: boolean
}

interface JobFormData {
  title: string
  companyName: string
  industry: string
  department: string
  location: string
  experience: string
  jobType: string
  contract: string
  salaryMin: string
  salaryMax: string
  joiningDate: string
  expiryDate: string
  description: string
  isDraft: boolean
  responsibilities: string
  requirements: string[]
  benefits: string[]
  skills: string[]
  notes: string
  boards: Boards
  channels: Channels
}

export default function CreateJobPosting() {
  const navigate = useNavigate()

  // const { data } = useParams()
  // const decryptedJob = data ? JSON.parse(decrypt(data)) : null
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const encryptedData = queryParams.get('job')
  const decoded = encryptedData ? decodeURIComponent(encryptedData) : null
  const decryptedJob = decoded ? JSON.parse(decrypt(decoded)) : null

  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const [loading, setLoading] = useState(false)
  const [loadingVoice, setLoadingVoice] = useState(false)

  const [recording, setRecording] = useState(false)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)

  const [formData, setFormData] = useState<JobFormData>({
    title: decryptedJob?.title || '',
    companyName: decryptedJob?.companyName || '',
    industry: decryptedJob?.industry || '',
    department: decryptedJob?.department || '',
    location: decryptedJob?.location || '',
    experience: decryptedJob?.experience || '',
    jobType: decryptedJob?.jobType || '',
    contract: decryptedJob?.contract || '',
    joiningDate: decryptedJob?.joiningDate || '',
    expiryDate: decryptedJob?.expiryDate || '',
    description: decryptedJob?.description || '',
    responsibilities: decryptedJob?.responsibilities || '',
    salaryMin: decryptedJob?.salaryRange?.min || '',
    salaryMax: decryptedJob?.salaryRange?.max || '',
    requirements: decryptedJob?.requirements || [],
    benefits: decryptedJob?.benefits || [],
    skills: decryptedJob?.skills || [],
    notes: decryptedJob?.notes || '',
    isDraft: decryptedJob?.isDraft || false,
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

  const handleCheckbox = (category: 'boards' | 'channels', key: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      [category]: { ...prev[category], [key]: value },
    }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const formattedPayload = {
      ...formData,
      salaryRange: {
        min: Number(formData.salaryMin),
        max: Number(formData.salaryMax),
      },
      channels: Object.keys(formData.channels).filter(
        key => formData.channels[key as keyof Channels]
      ),
      jobBoards: Object.keys(formData.boards).filter(key => formData.boards[key as keyof Boards]),
    }

    const form = createFormData(formattedPayload)

    if (image) {
      form.append('media', image)
    }

    setLoading(true)
    try {
      let response = null
      if (decryptedJob) response = await jobService.put(form, decryptedJob._id)
      else response = await jobService.post(form)

      return response
    } catch (error: any) {
    } finally {
      setLoading(false)
    }
  }

  const stopRecording = () => {
    mediaRecorder?.stop()
    setRecording(false)
    setLoadingVoice(true)
  }

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const recorder = new MediaRecorder(stream)
    const chunks: any[] = []

    recorder.ondataavailable = e => chunks.push(e.data)
    recorder.onstop = async () => {
      const audioBlob = new Blob(chunks, { type: 'audio/webm' })

      const fd = new FormData()
      fd.append('file', audioBlob)

      const res = await fetch('/api/ai/voice-to-text', {
        method: 'POST',
        body: fd,
      })

      const result = await res.json()
      const output = result?.output
      setLoadingVoice(false)
      if(!output?.role){
        const errorMeessage = output?.message;
        alert(errorMeessage);
      }
      else {
        const text = output?.content
        if (text) setFormData(prev => ({ ...prev, description: text }))
      }
    }

    recorder.start()
    setMediaRecorder(recorder)
    setRecording(true)
  }

  return (
    <div className="px-8 py-8">
      <div
        className="lg:mx-auto bg-white rounded-lg border 
        border-gray-150 shadow-sm font-sans"
      >
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
            <Button
              label="Save as Draft"
              variant="white"
              fullWidth
              loading={formData.isDraft && loading}
              className="whitespace-nowrap"
              onClick={() => {
                setFormData(prev => ({ ...prev, isDraft: true }))
                handleSubmit(new Event('submit'))
              }}
            />
            <Button
              label="Publish Job"
              variant="primary"
              loading={!formData.isDraft && loading}
              fullWidth
              className="whitespace-nowrap"
              onClick={() => {
                setFormData(prev => ({ ...prev, isDraft: false }))
                handleSubmit(new Event('submit'))
              }}
            />
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
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-xsplus font-medium text-gray-900 mb-1 block">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="companyName"
                  placeholder="E.g. XYZ"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xsplus focus:outline-none focus:ring-2 focus:ring-primary-600"
                />
              </div>
            </div>

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
                  type="number"
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
                  <option value="remote">Remote</option>
                  <option value="onsite">Full-Time</option>
                  <option value="hybrid">Hybrid</option>
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
                  name="contract"
                  type="number"
                  placeholder="E.g. 6 months"
                  value={formData.contract}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-xsplus 
                  focus:outline-none focus:ring-2 focus:ring-primary-600 w-full"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xsplus font-medium text-gray-900 mb-1 block">
                    Min Salary <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="salaryMin"
                    type="number"
                    placeholder="Min Salary"
                    value={formData.salaryMin}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xsplus"
                  />
                </div>

                <div>
                  <label className="text-xsplus font-medium text-gray-900 mb-1 block">
                    Max Salary <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="salaryMax"
                    type="number"
                    placeholder="Max Salary"
                    value={formData.salaryMax}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xsplus"
                  />
                </div>
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

              <label
                htmlFor="jobImage"
                className="cursor-pointer border border-dashed border-gray-300 rounded-lg py-10 flex flex-col items-center justify-center text-gray-650 text-xsplus"
              >
                {preview ? (
                  <img src={preview} alt="preview" className="w-32 h-32 object-cover rounded-lg" />
                ) : (
                  <>
                    <img src="/svg/gray-file-upload.svg" alt="upload" className="w-8 h-8 mb-3" />
                    <p className="text-xsplus">Click to upload or drag and drop</p>
                    <p className="text-xsmall mt-1 text-gray-600">PNG, JPG or JPEG (1 max, 1MB)</p>
                  </>
                )}
              </label>

              <input
                id="jobImage"
                type="file"
                accept="image/*"
                hidden
                onChange={async e => {
                  const file = e.target.files?.[0]
                  if (file) {
                    const options = {
                      maxSizeMB: 0.5,
                      maxWidthOrHeight: 800,
                      useWebWorker: true,
                      fileType: 'image/webp',
                    }

                    try {
                      const compressed = await imageCompression(file, options)

                      setImage(compressed)
                      setPreview(URL.createObjectURL(compressed))
                    } catch (error) {
                      console.error('Image compression error:', error)
                    }
                  }
                }}
              />
            </div>

            {/* Voice Note Section */}
            <div className="mt-6">
              <div className="flex gap-2 items-center mb-2">
                <h3 className="font-medium text-gray-900 text-xsplus">Voice Note with AI</h3>
                <p className="py-[2px] px-2 bg-gray-100 text-xsmall">AI</p>
              </div>

              {!recording ? (
                <button
                  onClick={startRecording}
                  disabled={loadingVoice}
                  type="button"
                  className="flex items-center justify-center w-full py-4 border border-gray-300 rounded-lg text-gray-600 text-xsplus hover:bg-gray-100 transition"
                >
                  <img src="/svg/black-mic.svg" alt="mic" className="w-5 h-5 mr-2" />
                  Tap to record voice note
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  type="button"
                  className="flex items-center justify-center w-full py-4 border border-red-500 bg-red-50 rounded-lg text-red-600 text-xsplus hover:bg-red-100 transition"
                >
                  <img src="/svg/black-pause.svg" alt="stop" className="w-5 h-5 mr-2" />
                  Stop Recording
                </button>
              )}

              {loadingVoice && (
                <div className="flex justify-center mt-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              )}

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
                rows={8}
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
              <label className="text-xsplus font-medium text-gray-900 mb-1 block">
                Requirements
              </label>
              {/* <textarea
                name="requirements"
                rows={3}
                placeholder="List the requirements for this role..."
                value={formData.requirements}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xsplus focus:outline-none focus:ring-2 focus:ring-primary-600"
              /> */}

              <TagField
                tags={formData.requirements}
                maxTags={10}
                addTag={tag =>
                  setFormData((prev: any) => ({
                    ...prev,
                    requirements: [...prev.requirements, tag],
                  }))
                }
                removeTag={tag =>
                  setFormData(prev => ({
                    ...prev,
                    requirements: prev.requirements.filter(t => t !== tag),
                  }))
                }
              />
            </div>

            <div>
              <label className="text-xsplus font-medium text-gray-900 mb-1 block">
                Benefits (comma separated)
              </label>
              <TagField
                tags={formData.benefits}
                maxTags={10}
                addTag={tag =>
                  setFormData((prev: any) => ({ ...prev, benefits: [...prev.benefits, tag] }))
                }
                removeTag={tag =>
                  setFormData(prev => ({
                    ...prev,
                    benefits: prev.benefits.filter(t => t !== tag),
                  }))
                }
              />
            </div>

            <div>
              <label className="text-xsplus font-medium text-gray-900 mb-1 block">
                Skills (comma separated)
              </label>
              {/* <input
                name="skills"
                placeholder="E.g. React, TypeScript, Node.js"
                value={formData.skills}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xsplus focus:outline-none focus:ring-2 focus:ring-primary-600"
              /> */}

              <TagField
                tags={formData.skills}
                maxTags={10}
                addTag={tag =>
                  setFormData((prev: any) => ({ ...prev, skills: [...prev.skills, tag] }))
                }
                removeTag={tag =>
                  setFormData(prev => ({
                    ...prev,
                    skills: prev.skills.filter(t => t !== tag),
                  }))
                }
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
                        onCheckedChange={(checked: boolean) =>
                          handleCheckbox('boards', key, checked)
                        }
                      />
                      <label className="text-xsplus text-gray-700 capitalize">{key}</label>
                    </div>
                  ))}
                </div>

                {/* Communication Channels */}
                <div>
                  <p className="font-medium text-xsplus text-gray-900 mb-2">
                    Communication Channels
                  </p>
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
                name="notes"
                rows={3}
                placeholder="Add any internal notes here..."
                value={formData.notes}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xsplus focus:outline-none focus:ring-2 focus:ring-primary-600"
              />
            </div>

            {/* Footer Buttons */}
            {/* <div className="flex justify-end gap-3 border-t border-gray-150 pt-4">
              <Button label="Cancel" variant="white" />
              <Button label="Save as Draft" variant="white" />
              <Button label="Publish Job" variant="primary" />
            </div> */}
          </form>
        </div>
      </div>
    </div>
  )
}
