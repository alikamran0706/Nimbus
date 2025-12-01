import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'

const dashboardData = [
  {
    metric: 'Total Recruiters',
    value: 24,
    change: '+12% from last month',
    icon: '/svg/gray-users.svg',
  },
  { metric: 'Active Jobs', value: 156, change: '+8% from last month', icon: '/svg/admin/jobs.svg' },
  {
    metric: 'Interviews Scheduled',
    value: 48,
    change: '-6% from last month',
    icon: '/svg/admin/interview.svg',
  },
  {
    metric: 'Messages Sent',
    value: 1284,
    change: '+18% from last month',
    icon: '/svg/light-gray-message.svg',
  },
]

const performanceData = {
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  applications: [120, 150, 180, 210, 240],
  placements: [40, 55, 65, 75, 85],
}

const recentActivities = [
  {
    id: 1,
    action: 'Sarah Johnson added a new recruiter account',
    time: '2 hours ago',
    color: 'bg-red-100',
    icon: '/svg/red-user-tick.svg',
  },
  {
    id: 2,
    action: "New job category 'Machine Learning Engineer' created",
    time: '5 hours ago',
    color: 'bg-green-100',
    icon: '/svg/green-applicant.svg',
  },
  {
    id: 3,
    action: 'LinkedIn API integration updated',
    time: 'Yesterday',
    color: 'bg-purple-100',
    icon: '/svg/purple-attachment.svg',
  },
  {
    id: 4,
    action: "Recruiter account 'michael.smith01' deactivated",
    time: '2 days ago',
    color: 'bg-red-100',
    icon: '/svg/red-user-cross.svg',
  },
]

const systemStatus = [
  { service: 'LinkedIn API', status: 'active', uptime: '100%' },
  { service: 'Gmail Integration', status: 'active', uptime: '100%' },
  { service: 'WhatsApp API', status: 'inactive', uptime: '98.2%' },
  { service: 'Database', status: 'active', uptime: '92.4%' },
]

export default function AdminDashboard() {
  const chartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      foreColor: '#4B5563',
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: '45%',
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ['transparent'] },
    xaxis: {
      categories: performanceData.months,
      labels: { style: { fontSize: '13px', colors: '#6B7280' } },
    },
    yaxis: {
      labels: { style: { fontSize: '13px', colors: '#6B7280' } },
    },
    fill: { opacity: 1 },
    tooltip: {
      y: {
        formatter: (val: number) => `${val}`,
      },
    },
    colors: ['#0d76ffff', '#10B981'], // primary-600, green-500
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      labels: { colors: '#374151' },
    },
    grid: {
      borderColor: '#E5E7EB',
      strokeDashArray: 4,
    },
  }

  const chartSeries = [
    { name: 'Applications', data: performanceData.applications },
    { name: 'Placements', data: performanceData.placements },
  ]

  return (
    <div className="space-y-6 py-6 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
        <div>
          <select className="border border-gray-300 text-sm rounded-md px-2 py-1 text-gray-700 focus:ring-2 focus:ring-primary-600">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>This Month</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardData.map((item, idx) => (
          <Card
            key={idx}
            className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all pb-4"
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">{item.metric}</div>
                <img src={item.icon} alt={item.metric} className="w-5 h-5 opacity-70" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mt-2">{item.value}</div>
              <div
                className={`text-sm mt-1 ${
                  item.change.includes('-') ? 'text-primary-600' : 'text-green-600'
                }`}
              >
                {item.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts + Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recruitment Performance Chart */}
        <Card className="bg-white border border-gray-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900 font-semibold text-base">
              Recruitment Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ReactApexChart options={chartOptions} series={chartSeries} type="bar" height={300} />
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="bg-white border border-gray-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900 font-semibold text-base">
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map(activity => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 pb-4 border-b border-gray-200 last:border-0"
                >
                  <div
                    className={`w-10 h-10 ${activity.color} flex items-center justify-center rounded-full`}
                  >
                    <img src={activity.icon} alt={'icon'} className="w-5 h-5 opacity-70" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-600 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card className="bg-white border border-gray-100 shadow-sm">
        <CardContent className='p-4'>
          <div className="text-gray-900 font-semibold text-base">System Status</div>
          <div className="space-y-3">
            {systemStatus.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      item.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                  ></div>
                  <span className="text-sm text-gray-700">{item.service}</span>
                </div>
                <span className="text-sm text-gray-600">{item.uptime} uptime</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
