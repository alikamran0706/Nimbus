import { useAppSelector } from '@hooks/redux'
import { ApplicationCard } from '@components/dashboard/ApplicatioCard'
import { RightSidebar } from '@components/dashboard/RightSidebar'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

 export const recentUpdates = [
    {
      id: '1',
      type: 'offer',
      action: 'Offer letter sent',
      title: 'Ship Management',
      company: 'Nimbus',
      date: '2023-07-18',
      icon: '🔔',
    },
    {
      id: '2',
      type: 'interview',
      action: 'Interview scheduled for July 20th at 2:00 PM',
      title: 'Data Processors',
      company: 'TechCorp Inc.',
      date: '2023-07-15',
      icon: '🔔',
    },
    {
      id: '3',
      type: 'review',
      action: 'Final interview completed',
      title: 'Renewable energy',
      company: 'DesignFirst',
      date: '2023-07-15',
      icon: '🔔',
    },
    {
      id: '4',
      type: 'review',
      action: 'Application under review',
      title: 'React Developer',
      company: 'InnovateTech',
      date: '2023-07-12',
      icon: '🔔',
    },
    {
      id: '5',
      type: 'review',
      action: 'Application reviewed',
      title: 'Passenger ship Hotel Staff',
      company: 'TechCorp Inc.',
      date: '2023-07-10',
      icon: '🔔',
    },
  ]
  
export const ApplicationDetail = () => {
  const { user } = useAppSelector(state => state.auth);

  const applications = [
    {
      id: '1',
      title: 'Passenger ship Hotel Staff',
      company: 'TechCorp Inc.',
      location: 'New York, NY',
      status: 'scheduled' as const,
      updatedDate: '2023-07-15',
      svg: '/svg/blue-calendar.svg',
    },
    {
      id: '2',
      title: 'Offshore Construction',
      company: 'Nimbus',
      location: 'Remote',
      status: 'under-review' as const,
      updatedDate: '2023-07-12',
      svg: '/svg/yellow-time.svg',
    },
    {
      id: '3',
      title: 'Renewable energy',
      company: 'InnovateTech',
      location: 'San Francisco, CA',
      status: 'rejected' as const,
      updatedDate: '2023-07-05',
      svg: '/svg/red-renewable.svg',
    },
    {
      id: '4',
      title: 'Data Processors',
      company: 'Marine',
      location: 'Boston, MA',
      status: 'offer-received' as const,
      updatedDate: '2023-07-18',
      svg: '/svg/green-checked.svg',
    },
  ]

  return (
    <div className="flex flex-col w-full">
      {/* Main Content */}
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 text-sm">
          Welcome back, {user?.firstName} {user?.lastName}
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        <div className=" flex-1 min-w-0">
          {/* Active Applications Section */}
          <div className="bg-gray-70 rounded-lg border border-gray-150 mb-8 overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-white border-b border-gray-150">
              <div>
                <h2 className="text-base font-medium text-gray-900">Active Applications</h2>
                <p className="text-xsplus text-gray-600 mt-1">
                  Track the status of your job applications
                </p>
              </div>
            </div>

            {/* <div className="space-y-4"> */}
            {applications.map(app => (
              <ApplicationCard key={app.id} {...app} />
            ))}
            {/* </div> */}

            <div className="flex justify-end">
              <button className="p-4 text-primary-600 hover:text-primary-600 font-medium text-xsplus">
                View all applications
              </button>
            </div>
          </div>

          {/* Recent Updates Section */}
          <div className="bg-white rounded-lg border border-gray-150 overflow-hidden">
            <div className="py-4 px-6 border-b border-gray-150 mb-6">
              <h2 className="text-base font-medium text-gray-900 mb-2">Recent Updates</h2>
              <p className="text-xsplus text-gray-600">Latest activity on your applications</p>
            </div>

            <div className="pl-2 pr-4 pb-6">
              <div className="relative pl-8">
                {/* Vertical line */}
                <div className="absolute left-3 top-2 bottom-4 w-0.5 bg-gray-150"></div>

                <div className="space-y-6">
                  {recentUpdates.map(update => (
                    <div key={update.id} className="flex items-start gap-4">
                      {/* Icon - positioned on the timeline */}
                      <div className="w-8 h-8 bg-primary-200 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 -ml-6">
                        <img src={'/svg/red-recent.svg'} alt="Icon" />
                      </div>

                      {/* Content - all in one line */}
                      <div className="flex-1 min-w-0 pt-1">
                        <div className="flex items-center justify-between gap-4">
                          <p className="text-sm text-gray-700 text-xsplus">
                            <span className="text-gray-500">{update.action}</span>
                            <span className="font-medium text-gray-900 mx-1">{update.title}</span>
                            <span className="text-gray-500">at {update.company}</span>
                          </p>

                          {/* Date */}
                          <p className="text-xsplus text-gray-500 whitespace-nowrap flex-shrink-0">
                            {update.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right Sidebar */}
        <RightSidebar />
      </div>
    </div>
  )
}
