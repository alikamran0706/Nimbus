import React from 'react'

interface TimelineStep {
  date: string
  text: string
  color: string
  id: any
  image: string
}

const ApplicationTimeline: React.FC = () => {
  const steps: TimelineStep[] = [
    {
      text: 'Interview scheduled for July 20th at 2:00 PM',
      date: '2023-07-15',
      color: 'bg-red-100',
      image: '/svg/red-recent.svg',
      id: 1
    },
    { text: 'Application reviewed', date: '2023-07-10', color: 'bg-blue-100', id: 2,  image: '/svg/blue-recent.svg', },
    { text: 'Application submitted', date: '2023-07-05', color: 'bg-green-100', id: 3,  image: '/svg/green-recent.svg', },
  ]

  return (
    <div className="bg-white rounded-xl shadow mt-6">
      <h3 className="text-lg font-semibold mb-4 px-4 py-4 border-b border-gray-150">Application Timeline</h3>
      <div className="pl-2 pr-4 pb-6">
        <div className="relative pl-8">
          {/* Vertical line */}
          <div className="absolute left-3 top-2 bottom-4 w-0.5 bg-gray-150"></div>

          <div className="space-y-6">
            {steps.map(update => (
              <div key={update.id} className="flex items-start gap-4">
                {/* Icon - positioned on the timeline */}
                <div className={`w-8 h-8 ${update.color} rounded-full flex items-center justify-center 
                    flex-shrink-0 relative z-10 -ml-6`}
                >
                  <img src={update.image} alt="Icon" />
                </div>

                {/* Content - all in one line */}
                <div className="flex-1 min-w-0 pt-1">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm text-gray-700 text-xsplus">
                      <span className="text-gray-700">{update.text}</span>
                    </p>

                    {/* Date */}
                    <p className="text-xsplus text-gray-700 whitespace-nowrap flex-shrink-0">
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
  )
}

export default ApplicationTimeline
