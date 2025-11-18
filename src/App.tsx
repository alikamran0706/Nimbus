import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getCurrentUser } from '@store/slices/authSlice'
import { AuthLayout } from '@components/layouts/AuthLayout'
import { MainLayout } from '@components/layouts/MainLayout'
import { PrivateRoute } from '@components/common/PrivateRoute'
import { SignIn } from '@pages/auth/SignIn'
import { SignUp } from '@pages/auth/SignUp'
import { VerifyEmail } from '@pages/auth/VerifyEmail'
import { Dashboard } from '@pages/dashboard/Dashboard'
import { Profile } from '@pages/profile/Profile'
import { ForgotPassword } from './pages/auth/ForgotPassword'
import { clearAlert } from './store/slices/alertSlice'
import { Resume } from './pages/dashboard/candidate/Resume'
import { Communications } from './pages/communications/Communications'
import { ApplicationDetail } from './pages/dashboard/candidate/ApplicationDetail'
import { ConfigureSetting } from './pages/dashboard/candidate/ConfigureSetting'
import { Settings } from './pages/dashboard/candidate/Settings'
import ActiveApplication from './pages/dashboard/candidate/ActiveApplication'
import { RecruiterPrivateRoute } from './components/common/RecruiterPrivateRoute'
import RecruiterMainLayout from './components/layouts/RecruiterMainLayout'
import RecruiterJobPostings from './pages/dashboard/recruiter/JobPosting'
import RecruiterCandidates from './pages/dashboard/recruiter/Candidates'
import RecruiterMessages from './pages/dashboard/recruiter/RecruiterMessages'
import RecruiterDashboard from './pages/dashboard/recruiter/Dashboard'
import RecruiterReports from './pages/dashboard/recruiter/Reports'
import RecruiterProfile from './pages/dashboard/recruiter/Profile'
import AIJobPostingAssistant from './pages/dashboard/recruiter/AIJobPostingAssistant'
import RecruiterSettings from './pages/dashboard/recruiter/Settings'
import RecruiterCandidateDetail from './pages/dashboard/recruiter/CandidateDetail'
import CreateJobPosting from './pages/dashboard/recruiter/CreateJobPosting'
import CandidateChat from './pages/dashboard/recruiter/CandidateChat'
import CandidateCall from './pages/dashboard/recruiter/CallCandidate'
import { AdminPrivateRoute } from './components/common/AdminPrivateRoute'
import AdminDashboard from './pages/admin/Dashboard'
import {AdminMainLayout} from './components/common/AdminMainLayout'
import AdminUsers from './pages/admin/Users'
import AdminUserManagement from './pages/admin/UserManagement'
import AdminIntegrations from './pages/admin/Integrations'
import AdminJobsManagement from './pages/admin/JobsManagement'
import AdminAuditLog from './pages/admin/AuditLog'
import AdminInterviewScheduling from './pages/admin/InterviewScheduling'
import AdminAutomationRules from './pages/admin/AutomationRules'
import AdminCandidatesList from './pages/admin/CandidatesList'
import AdminDataMigration from './pages/admin/DataMigration'
import AdminAutomaticSchedulingPage from './pages/admin/AutomaticSchedulingPage'
import CandidateProfile from './pages/admin/CandidateProfile'
import AdminSupportResources from './pages/admin/SupportResources'

function App() {
  const dispatch = useAppDispatch()
  const { token, isLoading } = useAppSelector(state => state.auth)
  const alert = useAppSelector(state => state.alert)

  useEffect(() => {
    if (alert.message) {
      switch (alert.type) {
        case 'success':
          toast.success(alert.message)
          break
        case 'error':
          toast.error(alert.message)
          break
        case 'warning':
          toast.warning(alert.message)
          break
        default:
          toast.info(alert.message)
          break
      }
      dispatch(clearAlert())
    }
  }, [alert, dispatch])

  useEffect(() => {
    if (token) {
      dispatch(getCurrentUser())
    }
  }, [dispatch, token])

  if (isLoading && token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <>
      <Routes>
        {/* Auth Routes */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="verify-email" element={<VerifyEmail />} />
        </Route>

        {/* Protected Routes */}

         <Route
          path="admin"
          element={
            <AdminPrivateRoute>
              <AdminMainLayout />
            </AdminPrivateRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="user-management" element={<AdminUserManagement />} />
          <Route path="integrations" element={<AdminIntegrations />} />
          <Route path="jobs" element={<AdminJobsManagement />} />
          <Route path="audit-logs" element={<AdminAuditLog />} />
          <Route path="support" element={<AdminSupportResources />} />
          <Route path="candidates" element={<AdminCandidatesList />} />
          <Route path="interview" element={<AdminInterviewScheduling />} />
          <Route path="automation" element={<AdminAutomationRules />} />
          <Route path="migration" element={<AdminDataMigration />} />
          <Route path="automate-schedule" element={<AdminAutomaticSchedulingPage />} />
          <Route path="candidate" element={<CandidateProfile />} />

           <Route index element={<AdminDashboard />} />
        </Route>

        {/* <Route path="recruiter" element={<Dashboard />} /> */}

        <Route
          path="recruiter"
          element={
            <RecruiterPrivateRoute>
              <RecruiterMainLayout />
            </RecruiterPrivateRoute>
          }
        >
          <Route path="dashboard" element={<RecruiterDashboard />} />
          <Route path="jobs" element={<RecruiterJobPostings />} />
          <Route path="create-ai-job" element={<AIJobPostingAssistant />} />
          <Route path="create-job" element={<CreateJobPosting />} />
          
          <Route path="candidates" element={<RecruiterCandidates />} />
          <Route path="messages" element={<RecruiterMessages />} />
          <Route path="reports" element={<RecruiterReports />} />
          <Route path="settings" element={<RecruiterSettings />} />
          <Route path="profile" element={<RecruiterProfile />} />
          <Route path="candidate" element={<RecruiterCandidateDetail />} />
          <Route path="candidate-chat" element={<CandidateChat />} />
          <Route path="candidate-call" element={<CandidateCall />} />
          
          <Route index element={<RecruiterDashboard />} />
        </Route>

        {
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
        }

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/applications" replace />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default App
