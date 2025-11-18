const ProfileTab = ({ profile, jobPreferences, handleSave }: any) => {
  return (
    <div className="space-y-4 mt-4">
      {/* Profile Settings */}
      <div className="px-4">
        <div className="">
          <h2 className="text-base font-medium text-gray-900">Profile Settings</h2>
          <p className="text-sm text-gray-600 mt-1">Update your personal and contact information</p>
        </div>
        <div className="space-y-4 mt-6 w-full">
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-x-10">
            <div className="border-b border-gray-100 w-full md:w-1/2 mb-4 md:mb-0">
              <p className="text-sm text-gray-700 font-[500]">First name</p>
              <p className="text-sm font-medium text-gray-900">{profile.firstName}</p>
            </div>
            <div className="border-b border-gray-100 w-full md:w-1/2">
              <p className="text-sm text-gray-700 font-[500]">Last name</p>
              <p className="text-sm font-medium text-gray-900">{profile.firstName}</p>
            </div>
          </div>
          <div className="border-b border-gray-100">
            <p className="text-sm text-gray-700 font-[500]">Email address</p>
            <p className="text-sm font-medium text-gray-900">{profile.email}</p>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-x-10">
            <div className="border-b border-gray-100 w-full md:w-1/2 mb-4 md:mb-0">
              <p className="text-sm text-gray-700 font-[500]">Phone Number</p>
              <p className="text-sm font-medium text-gray-900">{profile.phoneNumber}</p>
            </div>
            <div className="border-b border-gray-100 w-full md:w-1/2">
              <p className="text-sm text-gray-700 font-[500]">Location</p>
              <p className="text-sm font-medium text-gray-900">{profile.location}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Job Preferences */}
      <div className="px-4 pt-2">
        <h2 className="text-base font-medium text-gray-900">Job Preferences</h2>
        <p className="text-sm text-gray-600 mt-1">
          Update your job search preferences to get better job matches
        </p>
      </div>

      <div className="space-y-4 px-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-700">Preferred Job Title</p>
            <p className="text-sm font-medium text-gray-900">{jobPreferences.preferredJobTitle}</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-700">Job Type</p>
            <p className="text-sm font-medium text-gray-900">{jobPreferences.jobType}</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-700">Preferred Salary Range</p>
            <p className="text-sm font-medium text-gray-900">{jobPreferences.salaryRange}</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-700">Preferred Location</p>
            <p className="text-sm font-medium text-gray-900">{jobPreferences.preferredLocation}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end bg-gray-100 p-4">
        <button
          onClick={handleSave}
          className="text-sm bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-md 
                transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default ProfileTab
