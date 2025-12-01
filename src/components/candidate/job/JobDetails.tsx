import Spinner from '@/components/Spinner'
import { applicationService } from '@/services/applicationService'
import { useEffect, useState } from 'react'

function JobDetails({ job, user, setJobs }: any) {
  const [loading, setLoading] = useState(false)
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false)

  useEffect(() => {
    // Check if user has already applied to this job
    const hasApplied = job?.applications?.some(
      (application: any) => (application?.user?._id || application?.user) === user?._id
    )
    setIsAlreadyApplied(hasApplied)
  }, [job, user])

  const handleApply = async () => {
    // Add your apply logic here
    setLoading(true)
    try {
      const payload = { job: job._id }
      const response = await applicationService.post(payload)
      const newApplication = response.data

      if (newApplication)
        setJobs((prevJobs: any) =>
          prevJobs.map((prevJob: any) => {
            if (prevJob._id === job._id) {
                setIsAlreadyApplied(true)
              return {
                ...prevJob,
                applications: [...(prevJob.applications || []), newApplication],
              }
            }
            return prevJob
          })
        )
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h2>
        <p className="text-lg text-gray-600 mb-4">
          {job.companyName}, {job.location}
        </p>

        {/* Job Meta Information */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1 capitalize">
            <img src="/svg/gray-resume.svg" alt="Job Type" className="w-4 h-4" />
            <span>{job.jobType}</span>
          </div>
          {job.salaryRange?.min && job.salaryRange?.max && (
            <div className="flex items-center gap-1">
              <img src="/svg/gray-dollar.svg" alt="Salary" className="w-4 h-4" />
              <span>
                ${job.salaryRange.min} - ${job.salaryRange.max}
              </span>
            </div>
          )}
          {job.experience && (
            <div className="flex items-center gap-1">
              <span>{job.experience}</span>
            </div>
          )}
          {job.department && (
            <div className="flex items-center gap-1">
              <img src="/svg/gray-corporation.svg" alt="Department" className="w-4 h-4" />
              <span>{job.department}</span>
            </div>
          )}
        </div>
      </div>

      {/* Apply Button */}
      <div className="flex justify-start">
        <button
          onClick={handleApply}
          disabled={isAlreadyApplied || loading}
          className={`px-8 py-3 ${
            isAlreadyApplied || loading ? 'bg-primary-600/80' : 'bg-primary-600 hover:bg-red-700'
          } text-white rounded-lg 
            font-medium transition-colors`}
        >
          {loading ? <Spinner /> : isAlreadyApplied ? 'Applied' : 'Apply Now'}
        </button>
      </div>

      {/* Job Description */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h3>
        <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
      </div>

      {/* Responsibilities */}
      {job.responsibilities && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Responsibilities</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{job.responsibilities}</p>
        </div>
      )}

      {/* Requirements */}
      {job.requirements && job.requirements.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {job.requirements.map((requirement: string, index: number) => (
              <li key={index}>{requirement}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Skills */}
      {job.skills && job.skills.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills Required</h3>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill: string, index: number) => (
              <span
                key={index}
                className="px-3 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Benefits */}
      {job.benefits && job.benefits.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Benefits & Perks</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {job.benefits.map((benefit: string, index: number) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Additional Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
        {/* Left Column */}
        <div className="space-y-4">
          {job.contract && (
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Contract Type</h4>
              <p className="text-gray-700">{job.contract}</p>
            </div>
          )}

          {job.joiningDate && (
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Expected Joining Date</h4>
              <p className="text-gray-700">
                {new Date(job.joiningDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          )}

          {job.channels && job.channels.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Application Channels</h4>
              <div className="space-y-1">
                {job.channels.map((channel: string, index: number) => (
                  <p key={index} className="text-gray-700">
                    • {channel}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {job.expiryDate && (
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Application Deadline</h4>
              <p className="text-gray-700">
                {new Date(job.expiryDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          )}

          {job.jobBoards && job.jobBoards.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Posted On</h4>
              <div className="space-y-1">
                {job.jobBoards.map((board: string, index: number) => (
                  <p key={index} className="text-gray-700">
                    • {board}
                  </p>
                ))}
              </div>
            </div>
          )}

          {job.notes && (
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Additional Notes</h4>
              <p className="text-gray-700">{job.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default JobDetails
