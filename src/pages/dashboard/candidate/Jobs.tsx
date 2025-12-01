import FiltersBar from '@/components/candidate/job/FiltersBar'
import JobDetails from '@/components/candidate/job/JobDetails'
import JobsList from '@/components/candidate/job/JobsList'
import { useAppSelector } from '@/hooks/redux'
import { jobService } from '@/services/jobService'
import { useEffect, useState } from 'react'

export default function JobsPage() {
  const [jobs, setJobs] = useState([])
  const [selectedJob, setSelectedJob] = useState(null)
  const [filters, setFilters] = useState({})
  const [loading, setLoading] = useState(false)
  const { user } = useAppSelector(state => state.auth)

  const fetchJobs = async () => {
    setLoading(true)
    try {
      const queryString = { ...filters, includeApplications: 'true' }
      const { data } = await jobService.get(queryString)
      setJobs(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
    setSelectedJob(null)
  }, [filters])

  return (
    <div className="w-full mx-auto px-4 py-6">
      <FiltersBar filters={filters} setFilters={setFilters} selectedJob={selectedJob} />

      <div className="flex flex-col lg:flex-row gap-4 mt-4">
        {/* Jobs list */}
        <div className={`w-full lg:w-1/2 ${selectedJob ? 'hidden lg:block' : 'block'}`}>
          <JobsList jobs={jobs} onSelectJob={setSelectedJob} loading={loading} />
        </div>

        {/* Job details panel */}
        {selectedJob ? (
          <div className="w-full lg:w-1/2 bg-white border rounded-lg shadow-md p-4 relative">
            <button
              className="lg:hidden text-sm text-primary-600 mb-4"
              onClick={() => setSelectedJob(null)}
            >
              ← Back to all jobs
            </button>

            <JobDetails job={selectedJob} user={user} setJobs={setJobs} />
          </div>
        ) : (
          <div className="w-full lg:w-1/2 bg-white border rounded-lg shadow-md p-4 relative">
            <div className="flex flex-col items-center justify-center h-full">
              <span className="text-4xl">📭</span>
              <h3 className="text-gray-800 font-medium">No Job Selected</h3>
              <p className="text-gray-700 text-sm mt-1">
                Select a job from the list to view details
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
