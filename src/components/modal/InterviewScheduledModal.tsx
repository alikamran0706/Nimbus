import Modal from "."

interface InterviewScheduledModalModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function InterviewScheduledModal({ isOpen, onClose }: InterviewScheduledModalModalProps) {
  const interviews = [
    { position: "Chief Engineer", category: "Maritime Crew Passenger Ship", location: "International Waters" },
    { position: "Dock Officer", category: "Maritime Crew Passenger Ship", location: "Mediterranean" },
    { position: "Executive Chef", category: "Hotel Staff Marine", location: "Caribbean" },
    { position: "Housekeeping Manager", category: "Hotel Staff Marine", location: "Aruba Cruises" },
    { position: "Port Operations Manager", category: "Shore Jobs", location: "Rotterdam" },
    { position: "Logistics Coordinator", category: "Shore Jobs", location: "Singapore" },
    { position: "Drilling Supervisor", category: "Offshore Construction", location: "North Sea" },
  ]

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Interviews Scheduled Details" size="xl">
      <p className="text-sm text-gray-900 mb-4">Maritime & Offshore Upcoming Interviews</p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-150 bg-gray-40">
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Position</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Category</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Location</th>
            </tr>
          </thead>
          <tbody>
            {interviews.map((interview, idx) => (
              <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-900">{interview.position}</td>
                <td className="py-3 px-4 text-gray-600">{interview.category}</td>
                <td className="py-3 px-4 text-gray-600">{interview.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  )
}
