export default function AdminFooter() {
  return (
    <footer className="bg-white border-t border-gray-200 text-sm text-gray-500 px-6 py-3 flex justify-between items-center">
      <span>© 2025 Nimbus Inc. All rights reserved.</span>
      <div className="flex items-center gap-4">
        <span>Status: <span className="text-green-600 font-medium">Operational</span></span>
        <span>Version 2.4.1</span>
      </div>
    </footer>
  )
}
