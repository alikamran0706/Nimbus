import Modal from '.'

interface TotalApplicantsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function TotalApplicantsModal({ isOpen, onClose }: TotalApplicantsModalProps) {
const statusList = [
    { label: "New", value: 78 },
    { label: "Screening", value: 45 },
    { label: "Interview", value: 62 },
    { label: "Assessment", value: 31 },
    { label: "Offer", value: 15 },
    { label: "Rejected", value: 12 },
  ];

  const sources = [
    { name: "LinkedIn", applicants: 98 },
    { name: "Indeed", applicants: 87 },
    { name: "Referral", applicants: 45 },
    { name: "Company Website", applicants: 23 },
  ];

  const maxApplicants = Math.max(...sources.map((s) => s.applicants));

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Total Applicants" size="xl">
      <div className="w-full bg-white rounded-lg font-sans text-gray-900">
        {/* Applicants by Status */}
        <h2 className="font-semibold text-gray-900 mb-4">Applicants by Status</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {statusList.map(status => (
            <div
              key={status.label}
              className="border border-gray-150 rounded-lg p-4 flex flex-col items-center justify-center bg-gray-40"
            >
              <p className="text-xl font-bold text-gray-900">{status.value}</p>
              <p className="text-xs text-gray-600 mt-1">{status.label}</p>
            </div>
          ))}
        </div>

        {/* Top Sources */}
        <h2 className="font-semibold text-gray-900 mb-4">Top Sources</h2>

        <div className="space-y-4">
          {sources.map(src => (
            <div key={src.name} className="flex flex-col md:flex-row md:items-center md:gap-4">
              {/* Mobile labels */}
              <div className="flex justify-between text-xs text-gray-600 mb-1 md:hidden">
                <span>{src.name}</span>
                <span>({src.applicants})</span>
              </div>

              {/* Left label for md+ */}
              <div className="hidden md:block w-40 text-xs text-gray-600">{src.name}</div>

              {/* Progress bar */}
              <div className="w-full bg-gray-150 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-primary-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(src.applicants / maxApplicants) * 100}%` }}
                ></div>
              </div>

              {/* Right label for md+ */}
              <div className="hidden md:block w-12 text-right text-xs text-gray-600">
                ({src.applicants})
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}
