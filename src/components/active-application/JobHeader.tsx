import React from 'react'

interface JobHeaderProps {
  title: string
  company: string
  location: string
  status: string
  applicationDate: string
  lastUpdated: string
}

const JobHeader: React.FC<JobHeaderProps> = ({
  title,
  company,
  location,
  status,
  applicationDate,
  lastUpdated,
}) => {
  return (
    <div className='bg-white rounded-xl border border-gray-150'>
      <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <div className="flex gap-x-2 text-sm">
            <img src="/svg/gray-corporation.svg" alt="Icon" />
            <div className="flex gap-x-2">
              <p>{company}</p>
              <p>•</p>
              <div className="flex gap-x-1">
                <img src="/svg/gray-location.svg" alt="Icon" />
                <p>{location}</p>
              </div>
            </div>
          </div>
        </div>
        <span className="mt-4 md:mt-0 bg-red-100 text-primary-600 px-4 py-1 rounded-full text-sm font-medium">
          {status}
        </span>
      </div>

      <div className="text-sm text-gray-700 border-t border-gray-150 p-4">
        <div className="flex justify-between">
          <p className="w-1/2 font-medium">Application Date</p>
          <p className="w-1/2 font-medium">Last Updated</p>
        </div>
        <div className="flex justify-between">
          <p className="w-1/2">{applicationDate}</p>
          <p className="w-1/2">{lastUpdated}</p>
        </div>
      </div>
    </div>
  )
}

export default JobHeader
