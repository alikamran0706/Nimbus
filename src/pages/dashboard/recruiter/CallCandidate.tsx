import { Button } from '@/components/ui/Button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CandidateCall() {
  const navigate = useNavigate()
  const [callActive, setCallActive] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [callTime, setCallTime] = useState('00:45')

  const candidate = {
    name: 'Alex Johnson',
    position: 'Cargo Supervisor',
    location: 'San Francisco, CA',
  }

  const callObjectives = [
    { id: 1, text: 'Identify experience with cargo and shipping logistics' },
    { id: 2, text: 'Discuss related skills and problem-solving capabilities' },
    { id: 3, text: 'Assess motivation and fit for the CargoShip role' },
  ]

  const messages = [
    {
      type: 'ai',
      message: 'Hello Alex, this is Nimbus AI calling on behalf of Cargobot. How are you today?',
      time: '00:12',
    },
    {
      type: 'candidate',
      message: "I'm doing well, thanks. A bit surprised to get a call from an AI recruiter!",
      time: '00:25',
    },
    {
      type: 'ai',
      message:
        "I understand! I'm calling about the cargo shipping position at Cargobot. Your profile shows strong experience with import export.",
      time: '00:36',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm border border-gray-150">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-150 gap-3 text-center sm:text-left">
          {/* Back button */}
          <div className="order-1 flex justify-center sm:justify-start">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center sm:justify-start gap-2 text-gray-600 hover:text-gray-900 font-medium"
            >
              <img src="/svg/gray-back-arrow.svg" alt="back" className="w-4 h-4" />
              <span className="text-sm sm:text-base">Back to Candidates</span>
            </button>
          </div>

          {/* Center title */}
          <div className="order-1 sm:order-2 flex flex-col items-center flex-1">
            <h1 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
              AI Call with Candidate
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm">Call Time: {callTime}</p>
          </div>

          {/* Recording status */}
          <div className="order-3 flex justify-center sm:justify-end items-center text-green-600 text-xs sm:text-sm font-medium gap-2">
            <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
            <span>Recording</span>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-150">
          {/* Left Panel — Candidate Info */}
          <div className="p-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                AJ
              </div>
              <h2 className="mt-4 text-xl font-bold text-gray-900">{candidate.name}</h2>
              <p className="text-gray-600">{candidate.position}</p>
              <p className="text-gray-500 text-sm">{candidate.location}</p>
              <p className="mt-2 text-green-600 text-sm font-medium">● Connected</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Call Objectives</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {callObjectives.map(obj => (
                  <li key={obj.id} className="flex gap-2">
                    <img src="/svg/red-circle-tick.svg" alt="end call" className="w-5 h-5" />
                    {obj.text}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">AI Assistance</h3>
              <p className="text-sm text-gray-600 mb-3">
                AI is analyzing real-time responses to adjust the interview dynamically.
              </p>
              <p className="text-sm text-red-600 font-medium cursor-pointer hover:underline flex gap-2 items-center">
                <img src="/svg/red-message.svg" alt="volume" className="w-5 h-5" /> AI analyzing the conversation
              </p>
            </div>

            {/* Call Controls */}
            <div className="flex justify-center gap-4 mt-8">
              <Button
                variant="white"
                className="rounded-full w-12 h-12 bg-gray-100 hover:bg-gray-200"
                onClick={() => setIsMuted(!isMuted)}
                startIcon={
                  <img
                    src={isMuted ? '/svg/black-mic.svg' : '/svg/black-mic.svg'}
                    alt="mic"
                    className="w-5 h-5"
                  />
                }
              />
              <Button
                variant="white"
                className="rounded-full w-12 h-12 bg-gray-100 hover:bg-gray-200"
                startIcon={<img src="/svg/black-pause.svg" alt="volume" className="w-5 h-5" />}
              />
              <Button
                variant="primary"
                className="rounded-full w-12 h-12 bg-red-600 hover:bg-red-700"
                onClick={() => setCallActive(false)}
                startIcon={
                  <img src="/svg/white-phone.svg" alt="end call" className="w-5 h-5" />
                }
              />
            </div>
          </div>

          {/* Right Panel — Transcript */}
          <div className="lg:col-span-2 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Live Transcript</h3>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.type === 'ai' ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-md px-4 py-3 rounded-lg shadow-sm ${
                      msg.type === 'ai'
                        ? 'bg-red-50 text-gray-900 border border-red-100'
                        : 'bg-gray-100 text-gray-900 border border-gray-200'
                    }`}
                  >
                    <div className="text-sm">{msg.message}</div>
                    <div className="text-xs text-gray-500 mt-1 text-right">{msg.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
