interface CandidateContactProps {
  candidate: {
    email: string
    phone: string
    linkedin: string
  }
}

export default function CandidateContact({ candidate }: CandidateContactProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-base font-bold text-black mb-4">Contact</h2>

      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center`}>
          <img src="/svg/black-mail.svg" alt="icon" className="w-4 h-4" />
        </div>
        <div>
          <p className="text-sm text-black">Email</p>
          <a href={`mailto:${candidate.email}`} className="text-primary-600 hover:underline">
            {candidate.email}
          </a>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center`}>
          <img src="/svg/black-phone.svg" alt="icon" className="w-4 h-4" />
        </div>
        <div>
          <p className="text-sm text-black">Phone</p>
          <a href={`tel:${candidate.phone}`} className="text-gray-800 hover:underline">
            {candidate.phone}
          </a>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center`}>
          <img src="/svg/black-linkedin.svg" alt="icon" className="w-4 h-4" />
        </div>
        <div>
          <p className="text-sm text-black">LinkedIn</p>
          <a
            href={`https://${candidate.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:underline"
          >
            {candidate.linkedin}
          </a>
        </div>
      </div>
    </div>
  )
}
