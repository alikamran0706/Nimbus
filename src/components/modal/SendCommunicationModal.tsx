import { useState } from 'react'
import Modal from './'

interface SendCommunicationModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SendCommunicationModal({ isOpen, onClose }: SendCommunicationModalProps) {
  const [allowVideoCall, setAllowVideoCall] = useState(false)

  const handleNotificationChange = () => {
    setAllowVideoCall(!allowVideoCall)
  }

  const communicationOptions = [
      {
        id: 2,
        title: 'Email Templates',
        image: '/svg/blue-mail.svg',
        description: 'Send professional email templates',
        icon: '📧',
        color: 'bg-blue-50',
      },
    {
      id: 1,
      title: 'WhatsApp Templates',
      image: '/svg/green-whatsapp.svg',
      description: 'Send pre-designed WhatsApp messages',
      icon: '💬',
      color: 'bg-green-50',
    },
    {
      id: 3,
      title: 'Offer Letter',
      image: '/svg/purple-tick.svg',
      description: 'Send SMS messages to candidates',
      icon: '📱',
      color: 'bg-purple-50',
    },
  ]

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Send Communication" size="md">
      <p className="text-sm text-gray-600 mb-6">
        Choose a communication method to reach out to candidates
      </p>

      <div className="space-y-3">
        {communicationOptions.map((option, index) => (
          <button
            key={option.id}
            className={`w-full p-4 rounded-lg border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition text-left`}
          >
            <div className='flex justify-between'>
                <div className="flex items-start gap-3 items-center">
                <div className={`text-2xl ${option.color} p-2 rounded-lg`}>
                        <img src={option.image} alt="icon" className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{option.title}</h3>
                </div>
                </div>

                <p className='text-sm text-gray-600'>{index + 1} templates</p>
            </div>
          </button>
        ))}

        <div className="border-t border-gray-150 pt-4 flex flex-col md:flex-row justify-between items-center md:items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3">
            <img src="/svg/gray-users.svg" alt="icon" className="w-6 h-6" />
            <p className="text-gray-900 text-sm">Bulk Send</p>
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
