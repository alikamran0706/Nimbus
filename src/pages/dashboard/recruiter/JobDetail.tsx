import { decryptId } from '@/lib/utils/crypto'
import { jobService } from '@/services/jobService'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const JobDetail = () => {
  const { id } = useParams()
  const decryptedId = decryptId(id as string)
  const [loading, setLoading] = useState(false)
  const [job, setJob] = useState<any>(null)

  const fetchJobById = async () => {
    setLoading(true)
    try {
      const { data } = await jobService.getById(decryptedId)
      setJob(data)
      return data
    } catch (error: any) {}
  }

  useEffect(() => {
    fetchJobById()
  }, [])

  if (loading && job === null) return <></>

  return (
    <div>
      <div className="text-center bg-green-50 border border-green-100 rounded-tr-lg rounded-tl-lg py-4">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
          <img src="/svg/circle-green-tick.svg" alt="upload" className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Job Information Collected</h2>
        <p className="text-gray-600 mt-2">
          We've gathered the following information for your job posting. Continue to edit fine-tune
          the details.
        </p>
      </div>

      <div className="bg-white rounded-br-lg rounded-bl-lg mb-8 border-b border-l border-r border-gray-150">
        <div className="py-6 px-6 lg:px-20 space-y-6">
          <div className="border border-gray-150 bg-gray-40 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-600 mb-1">Job Title</h3>
            <p className="text-lg font-semibold text-gray-900">{job?.title}</p>
          </div>

          <div className="border border-gray-150 bg-gray-40 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-600 mb-1">Company</h3>
            <p className="text-lg font-semibold text-gray-900">{job?.companyName}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-150 bg-gray-40 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Location</h3>
              <p className="text-lg font-semibold text-gray-900">{job?.location}</p>
            </div>
            <div className="border border-gray-150 bg-gray-40 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Type</h3>
              <p className="text-lg font-semibold text-gray-900">{job?.jobType}</p>
            </div>
            <div className="border border-gray-150 bg-gray-40 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Salary</h3>
              {/* <p className="text-lg font-semibold text-gray-900">{job.salaryRange}</p> */}
            </div>
          </div>

          <div className="border border-gray-150 bg-gray-40 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Description</h3>
            <p className="text-gray-700">{job?.description}</p>
          </div>

          <div className="border border-gray-150 bg-gray-40 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Requirements</h3>
            <ul className="list-disc list-inside space-y-1">
              {job?.requirements.map((req: string, index: number) => (
                <li key={index} className="text-gray-700">
                  {req}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-gray-150 bg-gray-40 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Benefits</h3>
            <ul className="list-disc list-inside space-y-1">
              {job?.benefits?.map((benefit: string, index: number) => (
                <li key={index} className="text-gray-700">
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetail
