import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/Button'

export default function InterviewCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [showYearPicker, setShowYearPicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState<number | null>(null)

  const monthName = currentDate.toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  })

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    setShowYearPicker(false)
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    setShowYearPicker(false)
  }

  const handleMonthClick = () => {
    setShowYearPicker(!showYearPicker)
  }

  const handleYearSelect = (year: number) => {
    setCurrentDate(new Date(year, currentDate.getMonth(), 1))
    setShowYearPicker(false)
  }

  // Generate calendar days
  const days = []
  for (let i = 0; i < firstDayOfMonth; i++) days.push(null)
  for (let i = 1; i <= daysInMonth; i++) days.push(i)

  // Generate year list (10 years range)
  const currentYear = currentDate.getFullYear()
  const yearList = Array.from({ length: 12 }, (_, i) => currentYear - 6 + i)

  return (
    <Card className="bg-white border border-gray-100 shadow-sm">
      <CardContent className="p-5">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-gray-900">Calendar</h3>
          <div className='flex gap-x-2'>
            <img src="/svg/chevron-left.svg" onClick={handlePrevMonth} className="w-4 h-4 cursor-pointer" />
            <img src="/svg/chevron-right.svg" onClick={handleNextMonth} className="w-4 h-4 cursor-pointer" />
          </div>
        </div>

        {/* Month / Year selector */}
        <div className="flex items-center justify-center mb-4">
          <button
            onClick={handleMonthClick}
            className="font-semibold text-gray-900 text-sm hover:text-red-600 transition"
          >
            {monthName}
          </button>
        </div>
        {/* Year Picker */}
        {showYearPicker ? (
          <div className="grid grid-cols-3 gap-2 mb-4">
            {yearList.map(year => (
              <div
                key={year}
                onClick={() => handleYearSelect(year)}
                className={`text-center text-sm py-2 rounded-lg cursor-pointer ${
                  year === currentYear
                    ? 'bg-red-600 text-white font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {year}
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Calendar Days Header */}
            <div className="grid grid-cols-7 text-center text-xs font-semibold text-gray-600 mb-1">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                <div key={d}>{d}</div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {days.map((day, idx) => (
                <div
                  key={idx}
                  onClick={() => day && setSelectedDate(day)}
                  className={`py-2 text-sm rounded-full cursor-pointer transition ${
                    day === null
                      ? ''
                      : day === selectedDate
                      ? 'bg-red-600 text-white font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {day || ''}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Upcoming Schedule Section */}
        <div className="mt-5">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Upcoming Schedule</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li className="flex items-center gap-2">
              <img src="/svg/red-calendar.svg" className="w-3 h-3" />8 interviews this week
            </li>
            <li className="flex items-center gap-2">
              <img src="/svg/yellow-time.svg" className="w-3 h-3" />2 pending confirmations
            </li>
          </ul>
        </div>

        {/* Interview Types */}
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Interview Types</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>🔵 Technical Interview</li>
            <li>🟣 Cultural Fit</li>
            <li>🟡 Portfolio Review</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
