import Navbar from "../../components/Navbar"

export default function AdminUsers() {
  const navItems = [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Users", path: "/admin/users" },
    { label: "Reports", path: "/admin/reports" },
    { label: "Settings", path: "/admin/settings" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar title="User Management" navItems={navItems} />

      <main className="px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">All Users</h2>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Role</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">User {i}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">user{i}@example.com</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                      {i % 2 === 0 ? "Recruiter" : "Candidate"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">Active</span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-primary-600 hover:text-primary-700 font-medium">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
