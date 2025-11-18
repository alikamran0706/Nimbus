import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import CandidateAbout from '@/components/candidate/candidate-about'
import CandidateExperience from '@/components/candidate/candidate-experience'
import CandidateSkills from '@/components/candidate/candidate-skills'
import CandidateContact from '@/components/candidate/candidate-contact'
import { useNavigate } from 'react-router-dom'

export default function RecruiterCandidateDetail() {
  const [activeTab, setActiveTab] = useState('about');

  const navigate = useNavigate();

  const onBack = () => {
    navigate(-1) // Go back one step in history
  }

  const candidate = {
    id: '1',
    name: 'Alex Johnson',
    position: 'Shipping Clerk',
    company: 'LogistiCorp Inc.',
    location: 'San Francisco, CA',
    connections: 350,
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-q7SXfsmzVfPrqRktqpQvHddJ9qLihE.png',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    linkedin: 'linkedin.com/in/alexjohnson',
    status: 'Connected',
  }

  const tabs = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'about':
        return <CandidateAbout />
      case 'experience':
        return <CandidateExperience />
      case 'skills':
        return <CandidateSkills />
      case 'contact':
        return <CandidateContact candidate={candidate} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 font-medium"
        >
          <img src="/svg/gray-back-arrow.svg" alt="job" className="w-5 h-5 object-contain" />
          Back to Candidates
        </button>

        {/* Header Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6">
            {/* Left Section — Profile Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
              {/* Avatar */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-white text-4xl sm:text-5xl font-bold">
                AB
              </div>

              {/* Details */}
              <div className="flex-1">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{candidate.name}</h1>
                <p className="text-gray-600 text-sm sm:text-base">{candidate.position}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {candidate.location} • {candidate.connections} connections
                </p>
                <button className="mt-3 px-4 py-2 bg-primary-100 text-primary-600 rounded-lg text-xs sm:text-sm 
                 hover:bg-red-100">
                  {candidate.status}
                </button>
              </div>
            </div>

            {/* Right Section — Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 w-full lg:w-auto">
              <Button
                label="Call with Vapi AI"
                className="bg-red-600 hover:bg-red-700 gap-2 w-full sm:w-auto justify-center"
                startIcon={<img src="/svg/white-phone.svg" alt="icon" className="w-4 h-4" />}
                onClick={() => navigate("/recruiter/candidate-call")}
              />

              <Button
                label="Message on WhatsApp"
                className="bg-green-600 hover:bg-green-700 gap-2 w-full sm:w-auto justify-center text-white"
                startIcon={<img src="/svg/white-whatsapp.svg" alt="icon" className="w-4 h-4" />}
                variant='green'
                onClick={() => navigate("/recruiter/candidate-chat")}
              />

              <Button
                label="Send Email"
                className="gap-2 border border-gray-300 hover:bg-gray-50 w-full sm:w-auto justify-center"
                startIcon={<img src="/svg/black-mail.svg" alt="icon" className="w-4 h-4" />}
                variant='white'
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex gap-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 px-1 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'text-red-600 border-b-2 border-red-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">{renderTabContent()}</div>
      </div>
    </div>
  )
}
