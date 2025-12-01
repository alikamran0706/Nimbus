import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/Button'

export default function CandidateProfile() {
  const [activeTab, setActiveTab] = useState('resume-profile')

  const tabs = [
    { key: 'resume-profile', label: 'Resume & Profile' },
    { key: 'notes', label: 'Notes' },
    { key: 'communication-log', label: 'Communication Log' },
    { key: 'timeline', label: 'Timeline' },
  ]

  return (
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <img src="/svg/gray-back-arrow.svg" alt="back" className="w-4 h-4" />
          <h1 className="text-base font-semibold text-gray-900">Candidate Profile</h1>
        </div>
        <div className="flex gap-2">
          <Button label="Reject" variant="white" className="text-xsplus rounded-md" />
          <Button
            label="Shortlist"
            className="bg-green-600 hover:bg-green-700 text-white text-xsplus rounded-md"
            variant="green"
          />
        </div>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side – Candidate Info */}
        <Card className="lg:col-span-1 bg-white border border-gray-100 shadow-sm">
          <CardContent className="p-6 space-y-4">
            {/* Profile */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center">
                <img src="/svg/gray-user.svg" alt="user" className="w-6 h-6" />
              </div>
              <h2 className="text-gray-900 font-semibold mt-2">John Smith</h2>
              <p className="text-sm text-gray-600">Senior Software Engineer</p>
              <span className="inline-block mt-2 px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                Active Candidate
              </span>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xs font-semibold text-gray-600 mb-2">Contact Information</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-center gap-2">
                  <img src="/svg/gray-phone.svg" className="w-4 h-4" />
                  <span>+1 (987) 654-4321</span>
                </li>
                <li className="flex items-center gap-2">
                  <img src="/svg/gray-mail.svg" className="w-4 h-4" />
                  <span>john.smith@example.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <img src="/svg/gray-pin.svg" className="w-4 h-4" />
                  <span>New York, USA</span>
                </li>
              </ul>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-xs font-semibold text-gray-600 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'Node.js', 'AWS', 'Leadership'].map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-lg"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Applied For */}
            <div>
              <h3 className="text-xs font-semibold text-gray-600 mb-1">Applied For</h3>
              <p className="text-sm text-gray-800">Senior Frontend Developer</p>
              <p className="text-xs text-gray-600 mt-1">Applied on: Jun 15, 2023</p>
            </div>
          </CardContent>
        </Card>

        {/* Right Side – Tabs */}
        <div className="lg:col-span-2 space-y-4">
          {/* Tabs Header */}
          <div className="overflow-x-auto scrollbar-hide border-b border-gray-200">
            <div className="flex gap-4 min-w-max">
              {tabs.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === tab.key
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Resume & Profile Tab */}
          {activeTab === 'resume-profile' && (
            <Card className="bg-white border border-gray-100 shadow-sm">
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Resume Preview</h3>
                  <div className="border border-gray-200 rounded-lg h-48 flex items-center justify-center text-gray-400 text-sm">
                    <img src="/svg/gray-file.svg" className="w-5 h-5 mr-2" />
                    Preview Unavailable
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-1">Professional Summary</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Experienced software engineer skilled in JavaScript and cloud development.
                    Passionate about building scalable solutions and mentoring junior developers.
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-1">Experience</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>
                      <strong>Senior Software Engineer</strong> – ACME Corp (2020–Present)
                    </li>
                    <li>
                      <strong>Frontend Developer</strong> – TechWorks (2017–2020)
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notes Tab */}
          {activeTab === 'notes' && (
            <Card className="bg-white border border-gray-100 shadow-sm">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-semibold text-gray-900">Recruiter Notes</h3>
                  <Button
                    label="Add Note"
                    className="text-xsplus w-full sm:w-auto rounded-md"
                    startIcon={ <img src="/svg/white-plus.svg" className="w-4 h-4" />}
                  />
                </div>
                <div className="bg-yellow-50 p-3 rounded-md text-sm text-gray-700">
                  <p>
                    <strong>Interview Feedback:</strong> Strong technical interview. Could improve
                    on system design questions.
                  </p>
                  <p className="mt-2 text-xs text-gray-600 text-right">Last updated: Jul 5, 2023</p>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'communication-log' && (
            <Card className="bg-white border border-gray-100 shadow-sm">
              <CardContent className="p-6 space-y-5">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <h3 className="text-sm font-semibold text-gray-900">Communication History</h3>
                  <div className="flex gap-2">
                    <Button
                      label="Email"
                      variant="white"
                      className="rounded-md text-xsplus border border-gray-200 text-gray-700 px-3 py-1.5 flex items-center gap-2"
                      startIcon={<img src="/svg/black-mail.svg" className="w-4 h-4" />}
                    />
                    <Button
                      label="WhatsApp"
                      variant="green"
                      className="rounded-md text-xsplus bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 flex items-center gap-2"
                      startIcon={<img src="/svg/white-whatsapp.svg" className="w-4 h-4" />}
                    />
                  </div>
                </div>

                {/* Messages */}
                <div className="space-y-4">
                  {/* Email Message */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-2 items-center">
                        <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-primary-600 text-xs font-semibold">
                          <img src="/svg/red-mail.svg" className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">
                            Interview Confirmation
                          </p>
                          <p className="text-xs text-gray-600">June 11, 2023 — 10:23 AM</p>
                        </div>
                      </div>
                      <span className="text-xs text-green-600 font-medium">Delivered</span>
                    </div>
                    <p className="mt-3 text-sm text-gray-700 leading-relaxed">
                      Hi John, This is to confirm your technical interview scheduled for June 12th
                      at 2:00 PM with our engineering team. Please let me know if you need any
                      additional information. Looking forward to it!
                    </p>
                    <p className="text-xs text-gray-600 mt-3 text-right">From: Sarah Johnson</p>
                  </div>

                  {/* WhatsApp Message (sent by recruiter) */}
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-2 items-center">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs font-semibold">
                          <img src="/svg/green-message.svg" className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">WhatsApp Message</p>
                          <p className="text-xs text-gray-600">June 11, 2023 — 3:46 PM</p>
                        </div>
                      </div>
                      <span className="text-xs text-green-600 font-medium">Delivered</span>
                    </div>
                    <p className="mt-3 text-sm text-gray-700 leading-relaxed">
                      Hello John, Thanks for applying to TechCorp! I'd like to schedule a quick
                      phone call to discuss your application for the Senior Frontend Developer
                      position. Would you be available tomorrow between 10 AM and 12 PM?
                    </p>
                    <p className="text-xs text-gray-600 mt-3 text-right">From: Michael Brown</p>
                  </div>

                  {/* WhatsApp Message (reply from candidate) */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-2 items-center">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-gray-600 text-xs font-semibold">
                          <img src="/svg/green-message.svg" className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">WhatsApp Message</p>
                          <p className="text-xs text-gray-600">June 11, 2023 — 4:07 PM</p>
                        </div>
                      </div>
                      <span className="text-xs text-green-600 font-medium">Read</span>
                    </div>
                    <p className="mt-3 text-sm text-gray-700 leading-relaxed">
                      Hi Michael, Thanks for reaching out! Yes, I’m available tomorrow at 11 AM for
                      a call. Looking forward to discussing the opportunity.
                    </p>
                    <p className="text-xs text-gray-600 mt-3 text-right">From: John Smith</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Timeline Tab */}
          {activeTab === 'timeline' && (
            <Card className="bg-white border border-gray-100 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Recruitment Timeline</h3>
                <ul className="space-y-4 text-sm">
                  {[
                    { status: 'Application Received', date: 'Jun 10, 2023', done: true },
                    { status: 'Phone Screening', date: 'Jun 15, 2023', done: true },
                    { status: 'Technical Interview', date: 'Jun 20, 2023', done: true },
                    { status: 'Final Interview', date: 'Jun 25, 2023', done: true },
                    { status: 'Decision', date: 'Pending', done: false },
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          item.done ? 'bg-green-600' : 'bg-gray-300'
                        }`}
                      ></div>
                      <div>
                        <p className="font-medium text-gray-800">{item.status}</p>
                        <p className="text-xs text-gray-600">{item.date}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
