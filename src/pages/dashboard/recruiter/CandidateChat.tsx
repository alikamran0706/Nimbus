import { Button } from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/Checkbox'
import { useNavigate } from 'react-router-dom'

export default function CandidateSummary() {
  const navigate = useNavigate()

  const candidate = {
    name: 'Alex Johnson',
    position: 'Senior Backend Developer',
    location: 'Austin, TX',
    time: 'Today, 9:45 AM',
    status: 'Interview Complete',
  }

  const evaluations = [
    { label: 'Communication', color: 'bg-green-600', percent: '95%' },
    { label: 'Experience', color: 'bg-green-500', percent: '85%' },
    { label: 'Aptitude', color: 'bg-yellow-500', percent: '65%' },
    { label: 'Behavior', color: 'bg-green-500', percent: '80%' },
    { label: 'Expertise', color: 'bg-red-600', percent: '45%' },
  ]

  const takeaways = [
    'Strong technical background, 5+ years with TypeScript and Node.js',
    'Experience with cloud platforms like AWS and Azure',
    'Good communication and team collaboration',
    'Needs improvement in time estimation and delivery consistency',
  ]

  const transcript = [
    {
      sender: 'ai',
      text: 'Hello Alex, this is Nimbus AI calling on behalf of TechWave. How are you today?',
    },
    {
      sender: 'candidate',
      text: 'I’m doing well, thanks. A bit surprised to get a call from an AI recruiter.',
    },
    {
      sender: 'ai',
      text: 'I understand! I’m reaching out about the Senior Backend Developer position at CloudTech. Your profile shows strong experience with backend TypeScript.',
    },
    {
      sender: 'candidate',
      text: 'Yes, I’ve been working with React for over 6 years now and TypeScript for about 3 years.',
    },
    {
      sender: 'ai',
      text: 'That’s excellent. I also noticed you’ve managed backend architecture with AWS. Can you tell me about a complex design decision you made recently?',
    },
    {
      sender: 'candidate',
      text: 'Sure! In my current role, I led efforts to refactor integrations and create new pipeline flows with Python microservices.',
    },
    {
      sender: 'ai',
      text: 'That sounds impressive, Alex! How do you handle error management in this application?',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-4 bg-white border border-gray-150 gap-3 text-center sm:text-left">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
          >
            <img src="/svg/gray-back-arrow.svg" alt="back" className="w-4 h-4" />
            <span>Back to Candidates</span>
          </button>

          <h1 className="text-lg sm:text-xl font-bold text-gray-900">Call Summary</h1>

          <p className="text-sm text-gray-600">{candidate.time}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm border border-gray-150">
        {/* Candidate Profile Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-150">
          {/* Left: Avatar + Info */}
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-10 h-10 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center font-semibold text-sm">
              A
            </div>

            {/* Name and Role */}
            <div className="flex flex-col">
              <h2 className="font-semibold text-gray-900 text-sm sm:text-base">Alex Johnson</h2>
              <p className="text-xs text-gray-600">Senior React Developer</p>
            </div>
          </div>

          {/* Right: Time and Duration */}
          <div className="text-right">
            <p className="text-xs text-gray-600">Today, 9:42 AM</p>
            <p className="text-xs text-gray-600">Duration: 12:54</p>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-150">
          {/* LEFT PANEL */}
          <div className="p-6 space-y-6">
            {/* Candidate Card */}
            {/* <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                AJ
              </div>
              <h2 className="mt-4 text-xl font-bold text-gray-900">{candidate.name}</h2>
              <p className="text-gray-600 text-sm">{candidate.position}</p>
              <p className="text-gray-600 text-xs">{candidate.location}</p>
              <p className="mt-2 text-green-600 text-sm font-medium">{candidate.status}</p>
            </div> */}

            {/* AI Evaluation */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">AI Evaluation</h3>

              <div className="space-y-3">
                {evaluations.map((item, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-center md:gap-4">
                    {/* Top Row for Mobile (labels only) */}
                    <div className="flex justify-between text-xs text-gray-700 mb-1 md:hidden">
                      <span>{item.label}</span>
                      <span>{item.percent}</span>
                    </div>

                    {/* Left label for md+ */}
                    <div className="hidden md:block w-32 text-xs text-gray-700">{item.label}</div>

                    {/* Progress bar */}
                    <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                      <div
                        className={`${item.color} h-2.5 rounded-full transition-all duration-500`}
                        style={{ width: item.percent }}
                      ></div>
                    </div>

                    {/* Right label for md+ */}
                    <div className="hidden md:block w-10 text-right text-xs text-gray-700">
                      {item.percent}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Takeaways */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Key Takeaways</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {takeaways.map((text, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <img src="/svg/green-tick.svg" alt="tick" className="w-4 h-4 mt-0.5" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            {/* Next Steps */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Next Steps</h3>

              <div className="space-y-3 mb-4">
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <Checkbox checked={false} onCheckedChange={() => {}} />
                  Schedule technical interview
                </label>

                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <Checkbox checked={false} onCheckedChange={() => {}} />
                  Send follow-up email with job details
                </label>

                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <Checkbox checked={false} onCheckedChange={() => {}} />
                  Update candidate status in system
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  label="Move to Interview"
                  className="bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 sm:w-auto w-full text-xsplus rounded-md"
                  startIcon={<img src="/svg/white-tick.svg" alt="check" className="w-4 h-4" />}
                  variant="green"
                />

                <Button
                  label="Send Message"
                  variant="white"
                  className="border border-gray-300 text-gray-800 flex items-center justify-center gap-2 sm:w-auto w-full"
                  startIcon={<img src="/svg/black-message.svg" alt="message" className="w-4 h-4" />}
                />
              </div>
            </div>

            {/* Share Summary */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Share Call Summary</h3>

              <div className="space-y-2">
                {/* WhatsApp Button */}
                <button className="flex items-center justify-center gap-2 w-full border border-green-600 
                text-green-600 rounded-md py-2.5 font-medium text-xsplus hover:bg-green-50 transition-colors">
                  <img src="/svg/green-message.svg" alt="whatsapp" className="w-4 h-4" />
                  Send via WhatsApp
                </button>

                {/* Email Button */}
                <button className="flex items-center justify-center gap-2 w-full border 
                    border-red-600 text-red-600 rounded-md py-2.5 font-medium text-sm hover:bg-red-50 
                    transition-colors text-xsplus ">
                  <img src="/svg/red-mail.svg" alt="email" className="w-4 h-4" />
                  Send via Email
                </button>

                {/* Other Options Button */}
                <button className="flex items-center justify-center gap-2 w-full border border-gray-300 
                    text-gray-700 rounded-md py-2.5 font-medium text-sm hover:bg-gray-50
                     transition-colors text-xsplus ">
                  <img src="/svg/black-file-upload.svg" alt="share" className="w-4 h-4" />
                  Other Sharing Options
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="lg:col-span-2">
            {/* Transcript */}
            <div className='p-4 border-b border-gray-150 mb-4 flex justify-between items-center'>
                <h3 className="text-lg font-bold text-gray-900">Call Transcript</h3>
            </div>
            <div className="space-y-4 mb-8 max-h-[500px] overflow-y-auto pr-2 px-6">
              {transcript.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === 'ai' ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-xl px-4 py-3 rounded-lg shadow-sm text-sm ${
                      msg.sender === 'ai'
                        ? 'bg-red-50 text-gray-900 border border-red-100'
                        : 'bg-gray-100 text-gray-900 border border-gray-200'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className='px-6'>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Call Summary</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Alex demonstrated solid technical skills and enthusiasm for backend systems. He has
                extensive experience managing APIs, microservices, and scalable architectures. The
                AI observed clear communication and confidence in discussing system performance
                metrics. Areas for improvement include optimizing code reviews and better estimation
                of development timelines. Overall, Alex is a strong candidate for backend
                development positions requiring ownership and API expertise.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
