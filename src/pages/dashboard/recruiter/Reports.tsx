import BarChart from '@/components/charts/BarChart'
import AverageTimeToHireChart from '@/components/charts/WaveChart'
import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'

export default function RecruiterReports() {
  const hiringMetrics = [
    {
      metric: 'Total Applications',
      total: 245,
      completed: 180,
      pending: 45,
      rejected: 20,
      conversion: '73.5%',
    },
    {
      metric: 'Interviews Scheduled',
      total: 89,
      completed: 67,
      pending: 22,
      rejected: 0,
      conversion: '75.3%',
    },
    {
      metric: 'Offers Extended',
      total: 34,
      completed: 28,
      pending: 6,
      rejected: 0,
      conversion: '82.4%',
    },
    {
      metric: 'Candidates Hired',
      total: 24,
      completed: 24,
      pending: 0,
      rejected: 0,
      conversion: '100%',
    },
    {
      metric: 'Average Time to Hire',
      total: 28,
      completed: 28,
      pending: 0,
      rejected: 0,
      conversion: '28 days',
    },
  ]

  const hiringFunnelData = [
    { stage: 'Week 1', applications: 45, interviews: 28, offers: 12, hired: 8 },
    { stage: 'Week 2', applications: 52, interviews: 35, offers: 18, hired: 12 },
    { stage: 'Week 3', applications: 48, interviews: 32, offers: 15, hired: 10 },
    { stage: 'Week 4', applications: 42, interviews: 28, offers: 14, hired: 9 },
  ]

  const candidatesByRoleData = [
    { name: 'Frontend Dev', value: 45, color: '#3B82F6' },
    { name: 'Backend Dev', value: 38, color: '#10B981' },
    { name: 'Product Manager', value: 28, color: '#F59E0B' },
    { name: 'Designer', value: 22, color: '#8B5CF6' },
    { name: 'QA Engineer', value: 15, color: '#EF4444' },
  ]

  const hiringFunnelByRoleData = [
    { role: 'Frontend', applied: 45, interviewed: 28, offered: 12 },
    { role: 'Backend', applied: 52, interviewed: 35, offered: 18 },
    { role: 'Product', applied: 38, interviewed: 25, offered: 10 },
    { role: 'Design', applied: 32, interviewed: 20, offered: 8 },
  ]

  const timeToHireData = [
    { dept: 'Engineering', days: 32 },
    { dept: 'Product', days: 28 },
    { dept: 'Design', days: 25 },
    { dept: 'Sales', days: 35 },
    { dept: 'Marketing', days: 22 },
  ]

  /* Chart Configurations */

  const funnelOptions: ApexOptions = {
    chart: { type: 'line', toolbar: { show: false } },
    xaxis: { categories: hiringFunnelData.map(d => d.stage) },
    stroke: { width: 2 },
    markers: { size: 4 },
    legend: { position: 'top' },
    tooltip: { enabled: true },
    colors: ['#0088FE', '#00C49F', '#FFBB28', '#8B5CF6'],
  }

  const rolePieOptions: ApexOptions = {
    chart: { type: 'pie' },
    labels: candidatesByRoleData.map(d => d.name),
    colors: candidatesByRoleData.map(d => d.color),
    legend: { position: 'bottom' },
    tooltip: { enabled: true },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
      },
      formatter: function (val: number) {
        return `${val.toFixed(1)}%`
      },
      dropShadow: {
        enabled: false,
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -20, // ✅ Move labels outside slices
        },
      },
    },
  }

  const rolePieSeries = candidatesByRoleData.map(d => d.value)

  const funnelRoleOptions: ApexOptions = {
    chart: { type: 'bar', stacked: false, toolbar: { show: false } },
    xaxis: { categories: hiringFunnelByRoleData.map(d => d.role) },
    plotOptions: { bar: { horizontal: false, columnWidth: '55%' } },
    legend: { position: 'top' },
    tooltip: { enabled: true },
    colors: ['#0088FE', '#00C49F', '#FFBB28'],
  }

  const timeHireOptions: ApexOptions = {
    chart: { type: 'bar', toolbar: { show: false } },
    xaxis: { categories: timeToHireData.map(d => d.dept) },
    plotOptions: { bar: { horizontal: false, columnWidth: '60%' } },
    tooltip: {
      enabled: true,
      shared: true, // Keep this enabled
      intersect: false, // Disable intersect
    },
    colors: ['#8B5CF6'],
    dataLabels: {
      enabled: false,
    },
  }
  const timeHireSeries = [{ name: 'Days', data: timeToHireData.map(d => d.days) }]

  return (
    <div className="px-8 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Recruitment Analytics</h2>
          <p className="text-gray-600">Today at 10:23 PM</p>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            Last 7 days
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8">
        <AverageTimeToHireChart />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-150">
          <div className="border-b border-gray-150 p-4">
            <h3 className="text-base font-bold text-gray-900">Recruiter Performance</h3>
            <p className="text-gray-600 text-sm">Distribution of hired candidates by source</p>
          </div>

          <ReactApexChart options={rolePieOptions} series={rolePieSeries} type="pie" height={300} />
        </div>

        <div className="bg-white rounded-lg border border-gray-150">
          <div className="border-b border-gray-150 p-4">
            <h3 className="text-base font-bold text-gray-900">Candidate Dropout Stages</h3>
            <p className="text-gray-600 text-sm">Number of candidates at each stage</p>
          </div>
          <ReactApexChart
            options={timeHireOptions}
            series={timeHireSeries}
            type="bar"
            height={300}
          />
        </div>

        <div className="bg-white rounded-lg border border-gray-150">
          <BarChart title="Message Response Rate" subtitle="Email vs WhatsApp effectiveness" />
        </div>

        <div className="bg-white rounded-lg border border-gray-150">
          <BarChart />
        </div>
      </div>

      {/* Metrics Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-base font-bold text-gray-900">Detailed Recruitment Metrics</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Open Positions
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Applications
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Interviews
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Offers</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Time to Hire
                </th>
              </tr>
            </thead>
            <tbody>
              {hiringMetrics.map((metric, idx) => (
                <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{metric.metric}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{metric.total}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{metric.completed}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{metric.pending}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{metric.rejected}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-red-600">
                    {metric.conversion}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
