import { lazy } from 'react'

const Chart = lazy(() => import('react-apexcharts'))

interface BarChartProps {
  title?: string
  subtitle?: string
  height?: number
}

export default function BarChart({
  title = 'Recruiter Performance',
  subtitle = 'Interviews conducted vs successful hires',
  height = 350,
}: BarChartProps) {
  const chartData = {
    series: [
      {
        name: 'Interviews',
        data: [45, 35, 52, 28, 42],
      },
      {
        name: 'Hires',
        data: [8, 12, 18, 10, 9],
      },
    ],
    categories: ['Alex', 'Soroh', 'John', 'Mirlo', 'David'],
  }

  const options = {
    chart: {
      type: 'bar' as const,
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
    },
    colors: ['#8884D8', '#82CA9D'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 4,
        dataLabels: {
          position: 'top' as const,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: chartData.categories,
      title: {
        text: 'Recruiter',
      },
    },
    yaxis: {
      title: {
        text: 'Count',
      },
      min: 0,
      max: 60,
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      theme: 'light' as const,
      y: {
        formatter: (value: number) => `${value}`,
      },
    },
    legend: {
      position: 'bottom' as const,
      horizontalAlign: 'center' as const,
    },
    grid: {
      borderColor: '#E5E7EB',
      strokeDashArray: 4,
    },
  }

  return (
    <>
      <div className="border-b border-gray-150 p-4">
        <h3 className="text-base font-bold text-gray-900">{title}</h3>
        <p className="text-gray-600 text-sm">{subtitle}</p>
      </div>

      <div className="w-full p-2">
        <Chart options={options} series={chartData.series} type="bar" height={height} />
      </div>
    </>
  )
}
