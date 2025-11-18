import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'
import InterviewCalendar from '@/components/CalenderComponent'
import { useNavigate } from 'react-router-dom'

const interviews = [
  {
    id: 1,
    name: 'John Smith',
    role: 'Offshore Construction',
    time: '10:00 AM - 11:00 AM',
    type: 'Technical Interview',
    mode: 'Video Call',
    status: 'Confirmed',
  },
  {
    id: 2,
    name: 'Emily Davis',
    role: 'Hotel General Manager',
    time: '1:00 PM - 2:00 PM',
    type: 'Portfolio Review',
    mode: 'Video Call',
    status: 'Confirmed',
  },
  {
    id: 3,
    name: 'David Brown',
    role: 'Ship Management',
    time: '3:30 PM - 4:30 PM',
    type: 'Cultural Fit',
    mode: 'Video Call',
    status: 'Awaiting Confirmation',
  },
]

const getDaysInMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay()

export default function AdminInterviewScheduling() {
  const [currentDate, setCurrentDate] = useState(new Date(2023, 5, 1))
  const navigate = useNavigate()

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const days = []
  for (let i = 0; i < firstDay; i++) days.push(null)
  for (let i = 1; i <= daysInMonth; i++) days.push(i)

  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-700'
      case 'Awaiting Confirmation':
        return 'bg-yellow-100 text-yellow-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-base font-semibold text-gray-900">Interview Scheduling</h1>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button
            label="Automate Scheduling"
            className="w-full sm:w-auto px-4 py-2 rounded-lg text-sm font-medium text-xsplus"
            startIcon={<img src="/svg/white-plus.svg" className="w-4 h-4 cursor-pointer" />}
            onClick={() => navigate('/admin/automate-schedule')}
          />
          <Button
            label="Schedule Interview"
            className="w-full sm:w-auto px-4 py-2 rounded-lg text-sm font-medium text-xsplus"
            startIcon={<img src="/svg/white-plus.svg" className="w-4 h-4 cursor-pointer" />}
          />
        </div>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side - Calendar */}
        <InterviewCalendar />

        {/* Right Side - Scheduled Interviews */}
        <Card className="lg:col-span-2 bg-white border border-gray-100 shadow-sm">
          <div className="space-y-4 pt-4">
            <div className="flex justify-between items-center px-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Sunday, August 3</h3>
                <p className="text-xs text-gray-600">3 interviews scheduled</p>
              </div>

              <div className="flex gap-x-2">
                <div className="border border-gray-150 bg-gray-50 p-1 rounded-lg">
                  <img src="/svg/chevron-left.svg" className="w-4 h-4 cursor-pointer" />
                </div>
                <div className="border border-gray-150 bg-gray-50 p-1 rounded-lg">
                  <img src="/svg/chevron-right.svg" className="w-4 h-4 cursor-pointer" />
                </div>
              </div>
            </div>
            {interviews.map(item => (
              <div
                key={item.id}
                className="border border-gray-100 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between hover:shadow-sm transition"
              >
                <div>
                  <h4 className="font-semibold text-gray-900">{item.name}</h4>
                  <p className="text-xs text-gray-600">{item.role}</p>

                  <div className="flex items-center gap-1 mt-2 text-xs text-gray-600">
                    <img src="/svg/light-gray-time.svg" className="w-4 h-4 cursor-pointer" />
                    <span>{item.time}</span>
                    {/* <span>{item.mode}</span> */}
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-2 text-xs">
                      <span
                        className={`flex items-center gap-2 px-2 py-1 rounded-full ${
                          item.type === 'Technical Interview'
                            ? 'text-primary-700'
                            : item.type === 'Cultural Fit'
                            ? 'text-purple-700'
                            : 'text-yellow-700'
                        }`}
                      >
                        {item.type === 'Technical Interview' ? (
                          <img src="/svg/gray-video-cam.svg" className="w-4 h-4 cursor-pointer" />
                        ) : item.type === 'Cultural Fit' ? (
                          <img src="/svg/purple-users.svg" className="w-4 h-4 cursor-pointer" />
                        ) : (
                          <img src="/svg/yellow-eye.svg" className="w-4 h-4 cursor-pointer" />
                        )}
                        {item.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <img src="/svg/gray-video-cam.svg" className="w-4 h-4 cursor-pointer" />
                      <span className="text-gray-900 text-xsplus">{item.mode}</span>
                    </div>
                  </div>

                  <div className="mt-2">
                    <p className="text-xs text-gray-600 mb-1">Interviewers:</p>
                    <div className="flex -space-x-1">
                      {['R', 'J'].map((initial, idx) => (
                        <div
                          key={idx}
                          className="w-6 h-6 rounded-full bg-gray-100 border border-white flex items-center justify-center text-xs font-medium text-gray-700 shadow-sm"
                        >
                          {initial}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <button className="text-primary-600 border border-primary-600  text-xs font-medium px-3 py-1.5 rounded-lg">
                      View Details
                    </button>
                    <Button
                      label="Reschedule"
                      className="border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-medium px-3 py-1.5 rounded-lg"
                      variant="white"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:items-end mt-3 sm:mt-0 w-auto self-start sm:self-auto">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
