import Navbar from "../../components/Navbar"

export default function AdminSettings() {
  const navItems = [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Users", path: "/admin/users" },
    { label: "Reports", path: "/admin/reports" },
    { label: "Settings", path: "/admin/settings" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar title="Settings" navItems={navItems} />

      <main className="px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">System Settings</h2>

        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          {[
            { label: "Platform Name", value: "Nimbus" },
            { label: "Support Email", value: "support@nimbus.com" },
            { label: "Max File Upload Size", value: "10MB" },
            { label: "Session Timeout", value: "30 minutes" },
          ].map((setting, i) => (
            <div key={i} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-0">
              <label className="font-medium text-gray-900">{setting.label}</label>
              <input
                type="text"
                defaultValue={setting.value}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
              />
            </div>
          ))}

          <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition-colors mt-6">
            Save Settings
          </button>
        </div>
      </main>
    </div>
  )
}
