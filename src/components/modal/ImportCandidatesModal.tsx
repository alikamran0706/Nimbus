import Modal from './'

interface ImportCandidatesModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ImportCandidatesModal({ isOpen, onClose }: ImportCandidatesModalProps) {
  const importOptions = [
    {
      id: 1,
      title: 'Import from LinkedIn',
      description: 'Connect your LinkedIn account to import candidates',
      icon: '💼',
      image: '/svg/blue-linkedin.svg',
      color: 'bg-blue-50',
    },
    {
      id: 2,
      title: 'Import from Gmail',
      description: 'Import candidates from your Gmail contacts',
      icon: '📧',
      image: '/svg/red-mail.svg',
      color: 'bg-red-50',
    },
    {
      id: 3,
      title: 'Upload Resumes',
      description: 'Upload candidate resumes in bulk',
      icon: '📄',
      image: '/svg/gray-file-upload.svg',
      color: 'bg-green-50',
    },
  ]

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Source Candidates" size="md">
      <p className="text-sm text-gray-600 mb-6">
        Select a method to import candidates into your talent pool
      </p>

      <div className="space-y-3">
        {importOptions.map(option => (
          <button
            key={option.id}
            className={`w-full p-4 rounded-lg border border-gray-200 hover:border-red-600 hover:bg-red-50 transition text-left`}
          >
            <div className="flex items-start gap-3">
              <img src={option.image} alt="icon" />
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">{option.title}</h3>
              </div>
            </div>
          </button>
        ))}
      </div>
    </Modal>
  )
}
