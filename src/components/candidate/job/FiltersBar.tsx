function FiltersBar({ filters, setFilters, selectedJob }: any) {
  return (
    <div className={`px-4 py-4 bg-white rounded-md border border-gray-150 ${selectedJob ? 'hidden lg:block': ''}`}>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
        <span className="flex items-center gap-2 text-sm text-gray-900">
          <img src="/svg/gray-filter.svg" className="w-4 h-4" alt="Filter" />
          Filter jobs
        </span>
        <button
          onClick={() => setFilters({})}
          className="text-sm text-primary-500 hover:text-red-700 w-fit"
        >
          Clear all filters
        </button>
      </div>

      {/* Filters - Stack on mobile, grid on desktop */}
      <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-4">
        
        {/* Search Input */}
        <div>
          <label className="block text-xs text-gray-600 mb-1">Job Title</label>
          <input
            placeholder="Search job titles..."
            className="border px-3 py-2 rounded-lg text-sm w-full"
            onChange={e => setFilters((prev: any) => ({ ...prev, title: e.target.value }))}
          />
        </div>

        {/* Salary Range */}
        <div>
          <label className="block text-xs text-gray-600 mb-1">Salary Range</label>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              placeholder="Min"
              className="border px-3 py-2 rounded-lg text-sm w-full"
              onChange={e => setFilters((prev: any) => ({ ...prev, minSalary: e.target.value }))}
            />
            <span className="text-gray-500 text-sm whitespace-nowrap">to</span>
            <input
              type="number"
              placeholder="Max"
              className="border px-3 py-2 rounded-lg text-sm w-full"
              onChange={e => setFilters((prev: any) => ({ ...prev, maxSalary: e.target.value }))}
            />
          </div>
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-xs text-gray-600 mb-1">Job Type</label>
          <select
            className="border px-3 py-2 rounded-lg text-sm w-full"
            onChange={e => setFilters((prev: any) => ({ ...prev, jobType: e.target.value }))}
          >
            <option value="">All Job Types</option>
            <option value="remote">Remote</option>
            <option value="onsite">Onsite</option>
            <option value="hybrid">Hybrid</option>
            <option value="contract">Contract</option>
            <option value="part-time">Part-time</option>
            <option value="full-time">Full-time</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default FiltersBar;