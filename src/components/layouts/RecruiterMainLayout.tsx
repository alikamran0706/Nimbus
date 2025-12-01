import { Helmet } from 'react-helmet'
import RecruitmentHeader from '../common/RecruitmentHeader'
import { Outlet, useLocation } from 'react-router-dom'
import { useDynamicTopSpacing } from '@/hooks/useDynamicTopSpacing'

const navItems = [
  { label: 'Dashboard', path: '/recruiter/dashboard' },
  { label: 'Jobs', path: '/recruiter/jobs' },
  { label: 'Candidates', path: '/recruiter/candidates' },
  { label: 'Messages', path: '/recruiter/messages' },
  { label: 'Reports', path: '/recruiter/reports' },
]
const RecruiterMainLayout = () => {
  const location = useLocation()
  const isCommunicationRoute = location.pathname.startsWith('/recruiter/messages')

  const topSpacing = useDynamicTopSpacing('recruitment-header')

  return (
    <>
      <Helmet>
        <body style={{ overflow: 'hidden' } as any} />
      </Helmet>
      <div className={`max-h-full bg-gray-50 overscroll-y-none`}>
        <RecruitmentHeader id="recruitment-header" title={'Recruiter'} navItems={navItems} />
        <main className={isCommunicationRoute ? '' : (topSpacing ? `${topSpacing}px` : '')}>
          <div className="mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  )
}

export default RecruiterMainLayout
