import { lazy, useState } from 'react'

// Dynamically import ApexCharts to avoid SSR issues
const Chart = lazy(() => import('react-apexcharts'))

interface AverageTimeToHireChartProps {
  title?: string
  subtitle?: string
  height?: number
}

export default function AverageTimeToHireChart({
  title = 'Average Time to Hire (Days)',
  subtitle = 'Broken down by department',
  height = 270,
}: AverageTimeToHireChartProps) {
  const [selectedDept, setSelectedDept] = useState('All Departments')

  const chartData = {
    series: [
      {
        name: 'Engineering',
        data: [24, 21, 28, 22, 19, 18],
      },
      {
        name: 'Marketing',
        data: [20, 19, 21, 20, 18, 17],
      },
      {
        name: 'Sales',
        data: [22, 23, 25, 24, 21, 20],
      },
      {
        name: 'Design',
        data: [19, 18, 20, 19, 17, 16],
      },
    ],
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  }

  const options = {
    chart: {
      type: 'line' as const,
      toolbar: {
        show: false,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
      zoom: {
        enabled: true,
      },
    },
    colors: ['#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'],
    stroke: {
      curve: 'smooth' as const,
      width: 2,
    },
    xaxis: {
      categories: chartData.categories,
      title: {
        text: 'Month',
      },
    },
    yaxis: {
      title: {
        text: 'Days',
      },
      min: 0,
      max: 30,
    },
    legend: {
      position: 'bottom' as const,
      horizontalAlign: 'center' as const,
    },
    tooltip: {
      theme: 'light' as const,
      x: {
        format: 'MMM',
      },
      y: {
        formatter: (value: number) => `${value} days`,
      },
    },
    grid: {
      borderColor: '#E5E7EB',
      strokeDashArray: 4,
    },
  }

  return (
    <div className="bg-white rounded-lg border border-gray-150">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 border-b border-gray-150 p-4">
        <div className="">
          <h3 className="text-base font-bold text-gray-900">{title}</h3>
          <p className="text-gray-600 text-sm">{subtitle}</p>
        </div>
        <select
          value={selectedDept}
          onChange={e => setSelectedDept(e.target.value)}
          className="mt-4 sm:mt-0 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option>All Departments</option>
          <option>Engineering</option>
          <option>Marketing</option>
          <option>Sales</option>
          <option>Design</option>
        </select>
      </div>

      <div className="w-full px-4">
        <Chart options={options} series={chartData.series} type="line" height={height} />
      </div>
    </div>
  )
}
