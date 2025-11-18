import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import { loginUser, clearError } from '@store/slices/authSlice'
import { FormGenerator } from '@components/FormGenerator'
import { Button } from '@components/ui/Button'

const signInFields = [
  {
    name: 'email',
    label: 'Email address',
    type: 'email',
    required: true,
    placeholder: 'Enter your email',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    required: true,
    placeholder: 'Enter your password',
  },
  {
    name: 'rememberMe',
    label: 'Remember me',
    type: 'checkbox',
    extraLink: (
      <Link to="/auth/forgot-password" className="text-sm text-gray-700 hover:text-gray-600">
        Forgot your password?
      </Link>
    ),
  },
]

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
  rememberMe: Yup.boolean(),
})

const initialValues = {
  email: '',
  password: '',
  rememberMe: false,
}

export const SignIn = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const { isLoading, error, isAuthenticated } = useAppSelector(state => state.auth)
  const from = location.state?.from?.pathname || '/applicants'

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, from])

  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  const handleSubmit = (values: typeof initialValues) => {
    dispatch(loginUser({ email: values.email, password: values.password }))
  }

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`)
  }

  return (
    <div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%201-ipIH4sCpFZkBtk5klUe1etfgg1WV6H.png"
          alt="Nimbus"
          className="h-12 w-auto mx-auto"
        />
        <h2 className="text-center text-xl font-medium text-gray-700 m-0 p-0">
          Sign in to&nbsp;
          <span className="text-primary-600 text-4xl font-bold ml-2">Nimbus</span>
        </h2>
      </div>

      <div className="auth-card max-w-[448px]">
        {error && <div className="p-3 bg-red-100 text-red-700 rounded text-sm mb-4">{error}</div>}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-4">
            <FormGenerator fields={signInFields} />
            <Button
              type="submit"
              variant="gradient"
              fullWidth
              label={isLoading ? 'Signing in...' : 'Sign In'}
            />
          </Form>
        </Formik>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleSocialLogin('google')}
              className="social-btn"
            >
              <img src="/images/gmail.png" alt="Google" className="h-5 w-5" />
              Google
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin('linkedin')}
              className="social-btn"
            >
              <img src="/images/linkedin.png" alt="LinkedIn" className="h-5 w-5" />
              LinkedIn
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link to="/auth/signup" className="font-medium text-primary-600 hover:text-primary-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
