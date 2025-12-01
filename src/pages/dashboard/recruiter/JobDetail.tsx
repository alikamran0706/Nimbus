import Loading from '@/components/Loading'
import { decrypt, encrypt } from '@/lib/utils/crypto'
import { jobService } from '@/services/jobService'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const JobDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const decryptedId = decrypt(id as string);
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState<any>(null);

  console.log(job)

  const fetchJobById = async () => {
    setLoading(true)
    try {
      const { data } = await jobService.getById(decryptedId)
      setJob(data)
      return data
    } catch (error: any) {
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobById()
  }, [])

  if (loading) return <Loading />

  return (
    <div className="px-8 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(-1)}>
          <button className="text-gray-600 hover:text-gray-900">
            <img src={'/svg/gray-back-arrow.svg'} alt="icon" />
          </button>
          <span className="text-base text-gray-700 font-medium">Back</span>
        </div>
        <button
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg text-sm 
            font-medium hover:bg-primary-700 transition gap-1"
          onClick={() => {
            const encryptedJob = encrypt(JSON.stringify(job))
            navigate(`/recruiter/create-job?job=${encodeURIComponent(encryptedJob)}`)
          }}
        >
          <img src={'/svg/white-pencil.svg'} alt="icon" className="mr-1" />
          <p>Edit</p>
        </button>
      </div>

      <div
        className="bg-white rounded-lg mb-8 border 
        border-gray-150"
      >
        <div className="p-6 space-y-6">
          <div className="border border-gray-150 bg-gray-40 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-600 mb-1">Job Title</h3>
            <p className="text-lg font-semibold text-gray-900">{job?.title}</p>
          </div>

          {job?.companyName && (
            <div className="border border-gray-150 bg-gray-40 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Company</h3>
              <p className="text-lg font-semibold text-gray-900">{job?.companyName}</p>
            </div>
          )}

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
              <p className="text-lg font-semibold text-gray-900">{job.salaryRange?.max} / {job.salaryRange?.min}</p>
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
            <h3 className="text-sm font-medium text-gray-600 mb-2">Skills</h3>
            <ul className="list-disc list-inside space-y-1">
              {job?.skills.map((skill: string, index: number) => (
                <li key={index} className="text-gray-700">
                  {skill}
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
