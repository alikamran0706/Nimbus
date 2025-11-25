import Modal from '.'

 const departments = [
    { name: "Engineering", days: 16 },
    { name: "Product", days: 12 },
    { name: "Design", days: 10 },
    { name: "Marketing", days: 14 },
    { name: "Sales", days: 8 },
  ];

  const maxDays = Math.max(...departments.map((d) => d.days));

  const monthlyTrend = [
    { month: "Jan", days: 18 },
    { month: "Feb", days: 17 },
    { month: "Mar", days: 16 },
    { month: "Apr", days: 15 },
    { month: "May", days: 14 },
  ];

interface AvgTimeToHireModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AvgTimeToHireModal({ isOpen, onClose }: AvgTimeToHireModalProps) {


  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Avg Time-to-hire Details" size="xl">
      <div className="w-full bg-white rounded-lg font-sans text-gray-900">
        {/* Title */}
        <h2 className="font-semibold text-gray-900 mb-4">Time-to-hire by Department</h2>

        {/* Horizontal Bars */}
        <div className="space-y-3">
          {departments.map((dept) => (
          <div key={dept.name} className="flex flex-col md:flex-row md:items-center md:gap-4">
            {/* Top row for mobile (labels only) */}
            <div className="flex justify-between text-xs text-gray-600 mb-1 md:hidden">
              <span>{dept.name}</span>
              <span>{dept.days} days</span>
            </div>

            {/* Left label for md+ */}
            <div className="hidden md:block w-32 text-xs text-gray-600">{dept.name}</div>

            {/* Progress bar */}
            <div className="w-full bg-gray-150 h-3 rounded-full overflow-hidden">
              <div
                className="bg-primary-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(dept.days / maxDays) * 100}%` }}
              ></div>
            </div>

            {/* Right label for md+ */}
            <div className="hidden md:block w-16 text-right text-xs text-gray-600">
              {dept.days} days
            </div>
          </div>
        ))}
        </div>

        {/* Monthly Trend */}
        <div className="mt-8">
          <h2 className="font-semibold text-gray-900 mb-4">Monthly Trend</h2>
          <div className="flex gap-8 items-end mt-12">
            {monthlyTrend.map((item: any) => (
              <div key={item.month} className="text-center">
                <p className="text-sm text-gray-900 font-medium">{item.month}</p>
                <p className="text-gray-600 text-xs mt-1">{item.days}d</p>
              </div>
            ))}
          </div>
        </div>

      </div>
        
    </Modal>
  )
}
