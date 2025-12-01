function JobsList({ jobs, onSelectJob, loading }: any) {
  if (loading) return <p className="text-center">Loading jobs...</p>;
  if (!jobs.length) return <p className="text-center text-gray-500">No jobs found</p>;

  return (
    <div className="space-y-3">
      {jobs.map((job: any) => (
        <div
          key={job._id}
          className="p-4 border rounded-lg bg-white cursor-pointer hover:shadow-md transition"
          onClick={() => onSelectJob(job)}
        >
          <h3 className="font-bold text-gray-900">{job.title}</h3>
          <p className="text-sm text-gray-600">{job.companyName}, {job.location}</p>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{job.description}</p>
        </div>
      ))}
    </div>
  );
}


export default JobsList
