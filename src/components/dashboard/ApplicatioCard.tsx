import { Link } from "react-router-dom"

interface ApplicationCardProps {
  id: string
  title: string
  company: string
  location: string
  status: 'scheduled' | 'under-review' | 'rejected' | 'offer-received'
  updatedDate: string
  svg: string
}

const statusConfig = {
  scheduled: {
    label: 'Interview Scheduled',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    icon: '📅',
  },
  'under-review': {
    label: 'Application Under Review',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-700',
    icon: '⏳',
  },
  rejected: {
    label: 'Rejected',
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
    icon: '❌',
  },
  'offer-received': {
    label: 'Offer Received',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    icon: '✅',
  },
}

export const ApplicationCard = ({
  id,
  title,
  company,
  location,
  status,
  updatedDate,
  svg,
}: ApplicationCardProps) => {
  const config = statusConfig[status]

  return (
    <Link to={'/active-application'}>
      <div className="bg-white border-b border-gray-150 p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            {/* <div className="text-2xl">{icon}</div> */}
            <img src={svg} alt="Icon" />
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 text-xsplus">{title}</h3>
              <p className="text-xsplus text-gray-600">
                {company} • {location}
              </p>
              <p className="text-xsplus text-gray-500 mt-1">Updated on {updatedDate}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-3">
            <img src="/svg/right-arrow.svg" alt="Icon" />
            <span
              className={`px-3 py-1 rounded-full text-xsmall font-medium ${config.bgColor} ${config.textColor}`}
            >
              {config.label}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
