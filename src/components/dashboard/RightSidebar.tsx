import { useState } from 'react'
import UploadResumeModal from '../modal/UploadResumeModal'

export const RightSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <aside className="w-full lg:w-80 space-y-6 flex-shrink-0">
      {/* Resume Section */}
      <div className="bg-white rounded-lg border border-gray-150">
        <div className="py-4 px-6 border-b border-gray-150 mb-4">
          <h2 className="text-base font-medium text-gray-900">Resume</h2>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
            <img src={'/svg/red-file.svg'} alt="Icon" />
          </div>
          <div className="p-4">
            <p className="text-xsplus text-gray-600 mb-4">
              Keep your resume updated to improve your job matches
            </p>
            <button
              className="text-xsplus w-full bg-primary-600 hover:bg-red-700 text-white font-medium py-2 px-4 
                rounded-lg transition-colors"
              onClick={() => setIsOpen(true)}
            >
              Update Resume
            </button>
          </div>
        </div>
      </div>

      {/* Preferred Job Roles */}
      <div className="bg-white rounded-lg border border-gray-150">
        <div className="py-4 px-6 border-b border-gray-150">
          <h2 className="text-base font-medium text-gray-900">Preferred Job Roles</h2>
        </div>
        <div className="space-y-3 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xsplus text-gray-600">Data processor</span>
            <button>
              <img src={'/svg/gray-cross.svg'} alt="Icon" />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xsplus text-gray-600">Marine shore jobs</span>
            <button>
              <img src={'/svg/gray-cross.svg'} alt="Icon" />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xsplus text-gray-600">Survey Engineers</span>
            <button>
              <img src={'/svg/gray-cross.svg'} alt="Icon" />
            </button>
          </div>
          <button className="flex items-center justify-center gap-2 text-primary-600 hover:text-primary-600 font-medium text-xsplus">
            + Add another role
          </button>
        </div>
      </div>

      {/* Recent Communications */}
      <div className="bg-gray-70 rounded-lg border border-gray-150 overflow-hidden">
        <div className="py-4 px-6 border-b border-gray-150 bg-white">
          <h2 className="text-base font-medium text-gray-900">Recent Communications</h2>
        </div>
        <div>
          <div className="border-b border-gray-150 p-4 bg-white">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <img src={'/svg/red-message.svg'} alt="Icon" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm">Interview Confirmation</p>
                <div className="flex justify-between">
                  <p className="text-xsmall text-gray-600">From: hr@techcorp.com</p>
                  <p className="text-xsmall text-gray-500 mt-1">2023-07-15</p>
                </div>
                <p className="text-xsplus text-gray-600 line-clamp-2 truncate">
                  We're looking forward to meeting you on July 20th
                </p>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-150 p-4 bg-white">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <img src={'/svg/green-message.svg'} alt="Icon" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm">Quick Question</p>
                <div className="flex justify-between">
                  <p className="text-xsmall text-gray-600">From: recruiter@webrecruiter.com</p>
                  <p className="text-xsmall text-gray-500 mt-1">2023-07-14</p>
                </div>
                <p className="text-xsplus text-gray-600 line-clamp-2 truncate">
                  Hi John, I had a quick question about your availability
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <img src={'/svg/red-message.svg'} alt="Icon" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm">Application Received</p>
                <div className="flex justify-between">
                  <p className="text-xsmall text-gray-600">From: notifications@designfirst.com</p>
                  <p className="text-xsmall text-gray-500 mt-1">2023-07-10</p>
                </div>
                <p className="text-xsplus text-gray-600 line-clamp-2 truncate">
                  Thank you for applying to the Survey Engineers position
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="text-primary-600 hover:text-primary-600 font-medium text-sm p-4">
            View all communications
          </button>
        </div>
      </div>

      <UploadResumeModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </aside>
  )
}
