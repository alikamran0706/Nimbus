import React from 'react'

interface JobActionsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const JobActions: React.FC<JobActionsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    {
      name: 'Job Description',
      image: activeTab === 'Job Description' ? '/svg/red-job.svg' : '/svg/gray-job.svg',
    },
    {
      name: 'Schedule Interview',
      image:
        activeTab === 'Schedule Interview' ? '/svg/red-calendar.svg' : '/svg/gray-calendar.svg',
    },
    {
      name: 'Withdraw',
      image: activeTab === 'Withdraw' ? '/svg/red-cross.svg' : '/svg/gray-cross-text.svg',
    },
  ]

  return (
    <div className="border-b p-4 overflow-x-auto scrollbar-hide">
      <div className="flex space-x-6 min-w-max">
        {tabs.map(tab => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex items-center gap-2 text-sm font-medium whitespace-nowrap ${
              activeTab === tab.name ? 'text-primary-600' : 'text-gray-600 hover:text-gray-700'
            }`}
          >
            <img src={tab.image} alt="Icon" className="w-4 h-4" />
            {tab.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default JobActions
