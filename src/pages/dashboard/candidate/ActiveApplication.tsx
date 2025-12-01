import ApplicationTimeline from '@/components/active-application/ApplicationTimeline'
import JobActions from '@/components/active-application/JobActions'
import JobDescription from '@/components/active-application/JobDescription'
import JobHeader from '@/components/active-application/JobHeader'
import ScheduleInterview from '@/components/active-application/ScheduleInterview'
import WithdrawModal from '@/components/active-application/Withdraw'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ActiveApplication = () => {
  const [activeTab, setActiveTab] = useState('Job Description')
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (activeTab === 'Withdraw') {
      setShowModal(true)
    }
  }, [activeTab])

  return (
    <div>
       <div className="py-4">
            <Link
              to="/applications"
              className="inline-flex items-center gap-2 text-primary-500 hover:text-red-500 text-sm sm:text-base"
            >
              <img src={'/svg/back-arrow.svg'} alt="icon" />
              Back to Dashboard
            </Link>
          </div>

      <JobHeader
        title="Passenger ship Hotel Staff"
        company="TechCorp Inc."
        location="New York, NY"
        status="Interview Scheduled"
        applicationDate="2023-07-05"
        lastUpdated="2023-07-15"
      />

      <div className="bg-white rounded-xl border border-gray-150 mt-4">
        <div className="border-b border-gray-150 p-4">
          <h2 className="text-lg font-semibold">Actions</h2>
        </div>

        <JobActions activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'Job Description' && <JobDescription />}
        {activeTab === 'Schedule Interview' && (
          <ScheduleInterview />
        )}
        {activeTab === 'Withdraw' && (
          <div className="px-6 my-12">
            <div className="flex gap-x-2 mb-4">
              <img src={'/svg/red-triangle-alert.svg'} alt="Icon" />
              <div>
                <h3 className="text-sm font-medium">
                  Are you sure you want to withdraw your application?
                </h3>
                <p className="text-sm text-gray-600">
                  This action cannot be undone. The employer will be notified that you are no longer
                  interested in this position.
                </p>
              </div>
            </div>
            <button
              onClick={() => {}}
              className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-red-700 text-sm"
            >
              Yes, withdraw application
            </button>
            <button
              onClick={() => {}}
              className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 ml-3 text-sm"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <ApplicationTimeline />

      <WithdrawModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => {
          setShowModal(false)
          alert('Application withdrawn successfully.')
        }}
      />
    </div>
  )
}

export default ActiveApplication
