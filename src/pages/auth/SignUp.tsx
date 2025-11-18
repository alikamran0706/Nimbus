import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import { registerUser, clearError } from '@store/slices/authSlice'
import { useEffect, useState } from 'react'

import { FormGenerator } from '@components/FormGenerator'
import { Button } from '@components/ui/Button'
import { Link } from 'react-router-dom'
import { showAlert } from '@/store/slices/alertSlice'

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid').required('Required'),
  password: Yup.string().min(8, 'At least 8 characters').required('Required'),
  country: Yup.string().required('Required'),
  nationality: Yup.string().required('Required'),
  dateOfBirth: Yup.string().required('Required'),
  agreeToTerms: Yup.boolean().oneOf([true], 'Must accept terms'),
})

const initialValues = {
  referenceNo: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  country: '',
  nationality: '',
  dateOfBirth: '',
  agreeToTerms: false,
  role: 'recruiter'
}

export const SignUp = () => {
  const [accountType, setAccountType] = useState<'candidate' | 'recruiter'>('candidate')

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error, user } = useAppSelector(state => state.auth)

  const fields = [
    {
      name: 'referenceNo',
      label: 'Reference no.',
      type: 'text',
      placeholder: '(will be alloted automatically if needed)',
      disabled: true,
    },
    {
      name: 'firstName',
      label: 'First name',
      type: 'text',
      required: true,
      col: 1,
      placeholder: 'First Name',
    },
    {
      name: 'lastName',
      label: 'Last name',
      type: 'text',
      required: true,
      col: 1,
      placeholder: 'Last Name',
    },
    {
      name: 'email',
      label: 'Email address',
      type: 'email',
      required: true,
      placeholder: 'Enter your Email',
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      required: true,
      placeholder: 'First Name',
    },
    { name: 'country', label: 'Country', type: 'text', required: true, placeholder: 'First Name' },
    {
      name: 'nationality',
      label: 'Nationality',
      type: 'text',
      required: true,
      placeholder: 'First Name',
    },
    {
      name: 'dateOfBirth',
      label: 'Date of Birth',
      type: 'date',
      required: true,
      placeholder: 'First Name',
    },
    {
      name: 'agreeToTerms',
      label: (
        <div className="flex flex-wrap gap-2 justify-between">
          <div className="text-xsplus text-gray-700">
            I agree to the{' '}
            <Link to="/terms" className="text-primary-600">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-primary-600">
              Privacy Policy
            </Link>
          </div>

          <div>
            <Button label="Sign up" variant="gradient" type="submit" loading={isLoading} />
          </div>
        </div>
      ),
      type: 'checkbox',
      required: true,
    },
  ]

  useEffect(() => {
    if (user && !user.isVerified) {
      navigate('/auth/verify-email', { state: { email: user.email } })
    }
  }, [user, navigate])

  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  const handleSubmit = (values: typeof initialValues) => {
    dispatch(registerUser({ ...values, role: accountType }))
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
          Create your account&nbsp;
          <span className="text-primary-600 text-4xl font-bold ml-6">Nimbus</span>
        </h2>
      </div>
      <div className="auth-card max-w-[448px]">
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            type="button"
            onClick={() => setAccountType('candidate')}
            className={`flex-1 py-3 px-6 text-sm font-medium rounded-lg border transition-colors ${
              accountType === 'candidate'
                ? 'bg-primary-100 text-primary-600 border-primary-600'
                : 'bg-white text-gray-500 border-gray-300'
            }`}
          >
            Candidate
          </button>
          <button
            type="button"
            onClick={() => setAccountType('recruiter')}
            className={`flex-1 py-3 px-6 text-sm font-medium rounded-lg border transition-colors ${
              accountType === 'recruiter'
                ? 'bg-primary-100 text-primary-600 border-primary-600'
                : 'bg-white text-gray-500 border-gray-300'
            }`}
          >
            Recruiter
          </button>
        </div>

        {error && <div className="p-3 bg-red-100 text-red-700 rounded">{error}</div>}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-4">
            <FormGenerator fields={fields} />
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
              // onClick={() => handleSocialLogin('google')}
              className="social-btn"
            >
              <img src="/images/gmail.png" alt="Google" className="h-5 w-5" />
              Google
            </button>
            <button
              type="button"
              // onClick={() => handleSocialLogin('linkedin')}
              className="social-btn"
            >
              <img src="/images/linkedin.png" alt="LinkedIn" className="h-5 w-5" />
              LinkedIn
            </button>
          </div>
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?&nbsp;
            <Link to="/auth/signin" className="text-primary-600 hover:text-primary-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
