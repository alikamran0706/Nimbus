import { PrivateRoute } from '@/components/common/PrivateRoute'
import { MainLayout } from '@/components/layouts/MainLayout'
import { Navigate, Route } from 'react-router-dom'
import { ApplicationDetail } from './ApplicationDetail'
import { Dashboard } from '../Dashboard'
import { Profile } from '@/pages/profile/Profile'
import { ConfigureSetting } from './ConfigureSetting'
import { Settings } from './Settings'
import { Resume } from './Resume'
import { Communications } from '@/pages/communications/Communications'
import ActiveApplication from './ActiveApplication'

const Candidate = () => {
  return (
    <Route
      path="/"
      element={
        <PrivateRoute>
          <MainLayout />
        </PrivateRoute>
      }
    >
      <Route index element={<Navigate to="/applications" replace />} />
      <Route path="applications" element={<ApplicationDetail />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="profile" element={<Profile />} />
      <Route path="configure-setting" element={<ConfigureSetting />} />
      <Route path="settings" element={<Settings />} />
      <Route path="resume" element={<Resume />} />
      <Route path="communications" element={<Communications />} />
      <Route path="active-application" element={<ActiveApplication />} />
    </Route>
  )
}

export default Candidate
