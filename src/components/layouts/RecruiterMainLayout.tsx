import { Helmet } from 'react-helmet'
import RecruitmentHeader from '../common/RecruitmentHeader'
import { Outlet, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Dashboard', path: '/recruiter/dashboard' },
  { label: 'Job Postings', path: '/recruiter/jobs' },
  { label: 'Candidates', path: '/recruiter/candidates' },
  { label: 'Messages', path: '/recruiter/messages' },
  { label: 'Reports', path: '/recruiter/reports' },
]
const RecruiterMainLayout = () => {
     const location = useLocation();
  const isCommunicationRoute = location.pathname.startsWith('/recruiter/messages');
  
  return (
    <>
      <Helmet>
        <body style={{ overflow: 'hidden' } as any} />
      </Helmet>
      <div className={`max-h-full bg-gray-50 overscroll-y-none`}>
        <RecruitmentHeader title={'Recruiter'} navItems={navItems} />
         <main className={isCommunicationRoute ? "" : "mt-8"}>
            <div className="mx-auto">
                <Outlet />
              </div>
         </main>
      </div>

    </>
  )
}

export default RecruiterMainLayout
