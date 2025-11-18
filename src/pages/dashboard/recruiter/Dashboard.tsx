import AvgTimeToHireModal from '@/components/modal/AvgTimeToHireContent'
import ImportCandidatesModal from '@/components/modal/ImportCandidatesModal'
import InterviewScheduledModal from '@/components/modal/InterviewScheduledModal'
import OpenRolesModal from '@/components/modal/OpenRolesModal'
import ScheduleInterviewModal from '@/components/modal/ScheduleInterviewModal'
import SendCommunicationModal from '@/components/modal/SendCommunicationModal'
import TotalApplicantsModal from '@/components/modal/TotalApplicantsModal'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function RecruiterDashboard() {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
  const [isSendModalOpen, setIsSendModalOpen] = useState(false)

  const [isTotalApplicantModalOpen, setIsTotalApplicantModalOpen] = useState(false)
  const [isAverageTimeToHireModalOpen, setIsAverageTimeToHireModalOpen] = useState(false)
  const [isOpenRulesModalOpen, setIsOpenRulesModalOpen] = useState(false)
  const [isInterviewScheduleModalOpen, setIsInterviewScheduleModalOpen] = useState(false)

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'import':
        setIsImportModalOpen(true)
        break
      case 'schedule':
        setIsScheduleModalOpen(true)
        break
      case 'send':
        setIsSendModalOpen(true)
        break
      default:
        break
    }
  }

  const handleStateAction = (action: string) => {
    console.log(action)
    switch (action) {
      case 'Open Roles':
        setIsOpenRulesModalOpen(true)
        break
      case 'Total Applicants':
        setIsTotalApplicantModalOpen(true)
        break
      case 'Interviews Scheduled':
        setIsInterviewScheduleModalOpen(true)
        break
      case 'Avg Time-to-hire':
        setIsAverageTimeToHireModalOpen(true)
        break
      default:
        break
    }
  }

  const stats = [
    {
      label: 'Open Roles',
      value: '12',
      icon: '📋',
      color: 'bg-blue-50',
      textColor: 'text-blue-600',
      image: '/svg/blue-applications.svg',
    },
    {
      label: 'Total Applicants',
      value: '184',
      icon: '👥',
      color: 'bg-green-50',
      textColor: 'text-green-600',
      image: '/svg/green-users.svg',
    },
    {
      label: 'Interviews Scheduled',
      value: '23',
      icon: '📅',
      color: 'bg-purple-50',
      textColor: 'text-purple-600',
      image: '/svg/purple-calendar.svg',
    },
    {
      label: 'Avg Time-to-hire',
      value: '8',
      icon: '⭐',
      color: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      image: '/svg/yellow-recent.svg',
    },
  ]

  const activeJobs = [
    {
      id: 1,
      title: 'Chief Engineer',
      company: 'Marine Crew',
      location: 'Offshore',
      posted: '2 days ago',
      applications: 12,
      image: '/svg/red-job.svg',
    },
    {
      id: 2,
      title: 'Restaurant Manager',
      company: 'Passenger Ship Hotel Staff',
      location: 'Cruise Liner',
      posted: '1 week ago',
      applications: 8,
      image: '/svg/red-job.svg',
    },
    {
      id: 3,
      title: 'Marine Surveyor',
      company: 'Seismic/Survey Project Crew',
      location: 'Global',
      posted: '3 days ago',
      applications: 5,
      image: '/svg/red-job.svg',
    },
  ]

  const recentCandidates = [
    {
      id: 1,
      name: 'John Smith',
      position: 'Senior Developer',
      status: 'Interview',
      color: 'text-blue-600',
      source: 'via LinkedIn',
      image: '/svg/blue-calendar.svg',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      position: 'Product Manager',
      status: 'Shortlisted',
      color: 'text-purple-600',
      source: 'via Email',
      image: '/svg/purple-tick.svg',
    },
    {
      id: 3,
      name: 'Mike Davis',
      position: 'UX Designer',
      status: 'Applied',
      color: 'text-gray-600',
      source: 'via Website',
      image: '/svg/gray-globe.svg',
    },
    {
      id: 4,
      name: 'Emily Brown',
      position: 'Senior Developer',
      status: 'Offered',
      color: 'text-green-600',
      source: 'via LinkedIn',
      image: '/svg/green-tick.svg',
    },
    {
      id: 4,
      name: 'Emily Brown',
      position: 'Senior Developer',
      status: 'Rejected',
      color: 'text-primary-600',
      source: 'via Email',
      image: '/svg/red-cross.svg',
    },
  ]

  const quickActions = [
    {
      title: 'Source Candidates',
      description: 'Import candidates from LinkedIn, Gmail or upload resumes.',
      button: 'Import Candidates',
      action: 'import',
    },
    {
      title: 'Schedule Interviews',
      description: 'Set up interviews with shortlisted candidates.',
      button: 'Schedule Interviews',
      action: 'schedule',
    },
    {
      title: 'Send Communications',
      description: 'Send emails or WhatsApp messages to candidates.',
      button: 'Send Messages',
      action: 'send',
    },
  ]

  return (
    <div className="px-8 pb-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Recruiter Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back! Here's what's happening with your recruitment pipeline today.
          </p>
        </div>
        <Link
          to="/recruiter/create-job" className="flex gap-1 items-center px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition">
          <img src={'/svg/white-applicants.svg'} alt="icon" className="mr-1" />
          <p>Post new job</p>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map(stat => (
          <div
            key={stat.label}
            className={`bg-white rounded-lg border border-gray-200 overflow-hidden`}
          >
            <div className="flex items-start gap-x-2 p-6">
              <div
                className={`w-10 h-10 ${stat.color} flex items-center justify-center rounded-lg`}
              >
                <img src={stat.image} alt="icon" />
              </div>
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                <p className="text-sm font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
            <button
                onClick={() => handleStateAction(stat.label)}
              className="flex gap-x-2 bg-gray-50 w-full text-primary-600 text-sm font-semibold p-4 inline-block 
                hover:text-red-700"
            >
              View details <img src={'/svg/forward-arrow.svg'} alt="Icon" />
            </button>
          </div>
        ))}
      </div>

      {/* Active Job Postings */}
      <div className="mb-8">
        <div className="px-6 py-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-900">Active Job Postings</h2>
          <Link
            to="/recruiter/jobs"
            className="text-primary-600 text-sm font-semibold hover:text-red-700"
          >
            View all jobs
          </Link>
        </div>
        <div className="">
          {activeJobs.map((job, index) => (
            <div
              key={job.id}
              className="px-6 py-4 transition bg-white rounded-lg border border-gray-150 mb-2"
            >
              <div className="flex  flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <div className="flex gap-x-2">
                    <div
                      className={`w-10 h-10 bg-primary-50 flex items-center justify-center rounded-lg`}
                    >
                      <img src={job.image} alt="icon" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{job.title}</h3>

                      <div>
                        <p className="text-sm text-gray-600 mt-1">
                          {job.company} • {job.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 sm:mt-0 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <p className="mx-1 text-sm text-gray-600">
                      <span className="text-gray-900 text-base font-medium mr-1">{index + 1}</span>{' '}
                      Applicants
                    </p>
                    <div className="bg-green-500 h-2 w-2 rounded-full"></div>
                    <p className="text-green-500 text-sm">active</p>
                    <img src={'/svg/arrow-down.svg'} alt="icon" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Candidates */}
      <div className="">
        <div className="px-6 py-4 flex flex-wrap items-start sm:items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Recent Candidates</h2>
          <Link
            to="/recruiter/candidates"
            className="text-primary-600 text-sm font-semibold hover:text-red-700 truncate"
          >
            View all candidates
          </Link>
        </div>
        <div className="">
          {recentCandidates.map(candidate => (
            <div
              key={candidate.id}
              className="px-6 py-4 transition bg-white rounded-lg border border-gray-150 mb-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <div className="flex gap-2 items-center">
                    <div
                      className={`w-8 h-8 bg-gray-100 flex items-center justify-center rounded-full text-sm`}
                    >
                      {candidate.name?.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">Applied for {candidate.position}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-3 sm:mt-0">
                  <div className="flex items-center gap-1">
                    <img src={candidate.image} alt="icon" />
                    <button className={`${candidate.color} text-sm font-medium`}>
                      {candidate.status}
                    </button>
                    <p className="mx-1 text-sm text-gray-600">{candidate.source}</p>
                    <img src={'/svg/gray-forward-arrow.svg'} alt="icon" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <h2 className="text-base font-bold text-gray-900 my-2">Quick Actions</h2>
      <div className="bg-white border border-gray-150 rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 m-6">
          {quickActions.map(action => (
            <div key={action.title} className="bg-gray-50 rounded-lg flex flex-col">
              <div className="p-4 flex-grow">
                <h3 className="font-semibold text-gray-900">{action.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{action.description}</p>
              </div>
              <div className="border-t border-gray-150 p-4 mt-auto">
                <button
                  onClick={() => handleQuickAction(action.action)}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition"
                >
                  {action.button}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ImportCandidatesModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
      />
      <ScheduleInterviewModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
      />
      <SendCommunicationModal isOpen={isSendModalOpen} onClose={() => setIsSendModalOpen(false)} />

      <InterviewScheduledModal
        isOpen={isInterviewScheduleModalOpen}
        onClose={() => setIsInterviewScheduleModalOpen(false)}
      />
      <OpenRolesModal
        isOpen={isOpenRulesModalOpen}
        onClose={() => setIsOpenRulesModalOpen(false)}
      />
      <TotalApplicantsModal
        isOpen={isTotalApplicantModalOpen}
        onClose={() => setIsTotalApplicantModalOpen(false)}
      />
      <AvgTimeToHireModal
        isOpen={isAverageTimeToHireModalOpen}
        onClose={() => setIsAverageTimeToHireModalOpen(false)}
      />
    </div>
  )
}
