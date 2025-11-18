import { useAppSelector } from '@/hooks/redux'
import type React from 'react'

import { useState } from 'react'

export default function RecruiterProfile() {
  const { user } = useAppSelector(state => state.auth)

  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: user?.firstName || 'John Doe',
    email: user?.email || 'john@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Experienced recruiter with over 8 years of experience in tech recruitment. Specializing in engineering and product roles for startups and enterprise companies.',
    skills: [
      'Technical Recruiting',
      'Interview Cordination',
      'Candidate Sourcing',
      'Talent Assessment',
      'Recruitment Marketing',
    ],
  })

  const stats = [
    { label: 'Total Candidates', value: '123', average: '+12% from last month', color: 'text-green-500' },
    { label: 'Active Jobs', value: '47', average: '+5% from last month', color: 'text-green-500' },
    { label: 'Interviews', value: '18', average: '-2% from last month', color: 'text-primary-500' },
    { label: 'Hires', value: '104', average: '-2 days from last month', color: 'text-green-500' },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    setIsEditing(false)
    console.log('Profile saved:', profile)
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-8">
      {/* Header */}
      <div className="flex flex-wrap gap-3 items-start sm:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-1 text-sm">
            Manage your personal information and preferences
          </p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-sm px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors flex items-center gap-x-2"
        >
          {isEditing ? (
            'Cancel'
          ) : (
            <>
              <img src="/svg/white-pencil.svg" alt="Edit" className="w-4 h-4" />
              <span>Edit Profile</span>
            </>
          )}
        </button>
      </div>

      {/* Profile Information Section */}
      <div className="bg-white rounded-lg mb-8 pb-8 border border-gay-150">
        <div className="bg-white border-b border-gray-100 p-4 rounded-t-lg">
          <h3 className="inline-flex items-center gap-2 text-gray-900 text-base font-medium">
            Personal Information
          </h3>
          <p className="text-gray-600 text-sm">Personal details and contact information.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-8 p-8 ">
          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-white text-5xl font-bold mb-4">
              {profile.name.charAt(0).toUpperCase()}
            </div>
            {isEditing && (
              <button className="text-red-600 hover:text-red-700 font-medium text-sm">
                Change Photo
              </button>
            )}
          </div>

          {/* Profile Details */}
          <div className="flex-1 space-y-4">
            <div>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  value={profile.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              ) : (
                <div>
                  <h3 className="text-gray-900 font-medium text-base capitalize">{profile.name}</h3>
                  <p className="text-gray-600 text-sm">Senior Recruiter at RecruiterAI</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={profile.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                ) : (
                  <div className="flex gap-x-2">
                    <img src={'/svg/mail.svg'} alt="icon" />
                    <p className="text-gray-600 text-sm">{profile.email}</p>
                  </div>
                )}
              </div>

              <div>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter Phone Number"
                    value={profile.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                ) : (
                  <div className="flex gap-x-2">
                    <img src={'/svg/gray-phone.svg'} alt="icon" />
                    <p className="text-gray-600 text-sm">{profile.phone}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={profile.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                ) : (
                  <div className="flex gap-x-2">
                    <img src={'/svg/light-gray-location.svg'} alt="icon" />
                    <p className="text-gray-600 text-sm">San Francisco, CA</p>
                  </div>
                )}
              </div>

              <div>
                {isEditing ? (
                  <input
                    type="text"
                    name="phone"
                    placeholder="Enter Phone Number"
                    value={profile.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                ) : (
                  <div className="flex gap-x-2">
                    <img src={'/svg/light-gray-applications.svg'} alt="icon" />
                    <p className="text-gray-600 text-sm">RecruiterAI</p>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    name="phone"
                    placeholder="Enter Phone Number"
                    value={profile.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                ) : (
                  <div className="flex gap-x-2">
                    <img src={'/svg/gray-linkedin.svg'} alt="icon" />
                    <p className="text-blue-600 text-sm">linkedin.com/in/johndoe</p>
                  </div>
                )}
              </div>

              <div>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={profile.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                ) : (
                  <div className="flex gap-x-2">
                    <img src={'/svg/gray-globe.svg'} alt="icon" />
                    <p className="text-blue-600 text-sm">johndoe.com</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-t border-gray-150 py-4 mb-6 mx-8">
          <h2 className="text-base font-bold text-gray-900">Bio</h2>
          {isEditing ? (
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          ) : (
            <p className="text-gray-600 text-sm">{profile.bio}</p>
          )}
        </div>

        {isEditing && (
          <button
            onClick={handleSave}
            className="mx-8 w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
          >
            Save Changes
          </button>
        )}

        {!isEditing && (
          <div className="mx-8">
            <h2 className="text-base font-bold text-gray-900 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <span
                  key={index}
                  className="text-smpx-4 p-2 bg-red-50 text-primary-500 font-medium text-sm rounded-lg 
                        hover:bg-primary-100 transition-colors cursor-pointer"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="bg-white rounded-lg mb-8 pb-8 border border-gay-150">
        <div className="bg-white border-b border-gray-100 p-4 rounded-t-lg">
          <h3 className="inline-flex items-center gap-2 text-gray-900 text-base font-medium">
            Activity
          </h3>
          <p className="text-gray-600 text-sm">Recent recruitment activity and statistics.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-8 pt-4 sm:pt-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-50 rounded-lg shadow-sm p-6 text-center">
              <h3 className="text-gray-00 text-sm font-medium">{stat.label}</h3>
              <p className="text-3xl font-medium text-gray-900">{stat.value}</p>
              <p className={`${stat.color} text-sm`}>{stat.average}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
