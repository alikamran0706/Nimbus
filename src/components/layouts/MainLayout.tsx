import { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Header } from '@components/common/Header'
import { Sidebar } from '@components/common/Sidebar'
import { Helmet } from 'react-helmet'

export const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const isCommunicationRoute = location.pathname.startsWith('/communications');

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <>
      <Helmet>
        <body style={{ overflow: 'hidden' } as any} />
      </Helmet>
      <div className={`min-h-screen ${isCommunicationRoute ? 'bg-white' : 'bg-gray-50'} overflow-hidden`}>
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <div className="flex">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className={`flex-1 ml-0 md:ml-64 ${isCommunicationRoute ? 'h-full' : 'h-[calc(100vh-4rem)] overflow-y-auto'}`}>
            <div className={isCommunicationRoute ? "" : "px-4 sm:px-6 lg:px-8 py-4"}>
              <div className="mx-auto max-w-7xl">
                <Outlet />
              </div>
            </div>
            {/* Footer */}
            {
              !isCommunicationRoute &&
              <footer className={`bg-white border-t-2 border-gray-100 ${isCommunicationRoute ? '' : 'mt-4'} py-6 px-4 sm:px-8`}>
                <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600 gap-4 sm:gap-0">
                  <p className="text-center sm:text-left">
                    © 2025 Nimbus. All rights reserved. Version 1.0.0
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <Link to="/help" className="hover:text-gray-900">
                      Help Center
                    </Link>
                    <Link to="/contact" className="hover:text-gray-900">
                      Contact Us
                    </Link>
                    <Link to="/terms" className="hover:text-gray-900">
                      Terms & Conditions
                    </Link>
                  </div>
                </div>
              </footer>
            }
          </main>
        </div>
      </div>
    </>
  )
}
