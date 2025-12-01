import { useState } from 'react'
import Modal from './'

interface ScheduleInterviewModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ScheduleInterviewModal({ isOpen, onClose }: ScheduleInterviewModalProps) {
  //   const [selectedInterviewers, setSelectedInterviewers] = useState<string[]>([])
  const [allowVideoCall, setAllowVideoCall] = useState(false);

  const interviewers = [
    { id: 1, name: 'Sarah Johnson', role: 'Hiring Manager' },
    { id: 2, name: 'Mike Chen', role: 'Technical Lead' },
    { id: 3, name: 'Emily Davis', role: 'HR Manager' },
  ]

  //   const toggleInterviewer = (id: string) => {
  //     setSelectedInterviewers(prev =>
  //       prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
  //     )
  //   }

  const handleNotificationChange = () => {
    setAllowVideoCall(!allowVideoCall)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Schedule Interview" size="xl">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Select Interviewers
          </label>
          <p className="text-sm text-gray-600 mb-4">Choose team members to conduct the interview</p>

          <div className="space-y-2">
            {interviewers.map(interviewer => (
              <label
                key={interviewer.id}
                className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                {/* Left side: checkbox + text */}
                <div className="flex items-center gap-3">
                  {/* <input
                    type="checkbox"
                    checked={selectedInterviewers.includes(String(interviewer.id))}
                    onChange={() => toggleInterviewer(String(interviewer.id))}
                    className="w-4 h-4 text-primary-600 rounded"
                  /> */}
                  <div>
                    <p className="font-medium text-gray-900">{interviewer.name}</p>
                    <p className="text-sm text-gray-600">{interviewer.role}</p>
                  </div>
                </div>

                {/* Right side: icon */}
                <div className="flex items-center text-2xl bg-blue-50 p-2 rounded-lg">
                  <img src="/svg/blue-calendar.svg" alt="icon" className="w-6 h-6 mr-2" />
                  <p className="text-sm text-blue-700">Schedule</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Interview Date & Time
          </label>
          <input
            type="datetime-local"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-600"
          />
        </div> */}

        {/* <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-900 font-semibold hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-primary-600 hover:bg-red-700 text-white font-semibold rounded-lg transition"
          >
            Confirm Interview
          </button>
        </div> */}

        <div className="border-t border-gray-150 pt-4 flex flex-col md:flex-row justify-between items-center md:items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3">
            <img src="/svg/purple-video.svg" alt="Video call icon" className="w-6 h-6" />
            <p className="text-gray-900 text-sm">Schedule as video call</p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={allowVideoCall}
              onChange={handleNotificationChange}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-primary-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-300">
              <div className="absolute top-[2px] left-[2px] w-5 h-5 bg-white border-gray-300 border rounded-full transition-all peer-checked:translate-x-5"></div>
            </div>
          </label>
        </div>
      </div>
    </Modal>
  )
}
